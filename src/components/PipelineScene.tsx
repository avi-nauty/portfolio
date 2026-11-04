import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

type Stage = {
  id: string
  title: string
  pos: [number, number, number]
  size: [number, number, number]
  ghostH?: number // faint outline showing the size before reduction
  color: string
  detail: string
}

// Feature counts come from the paper: 2048 + 512 + 1280 = 3840, BHO keeps 1909 (BRISC 2025).
const h = (n: number) => (n / 3840) * 4 + 0.3

const STAGES: Stage[] = [
  { id: 'input', title: 'MRI input', pos: [-9, 0, 0], size: [0.3, 1.8, 1.8], color: '#78716c',
    detail: 'Image decoded to RGB, converted to float32 in [0,1], letterbox-resized to 224×224×3 (aspect ratio kept, zero padding).' },
  { id: 'pre', title: 'Backbone preprocessing', pos: [-6.5, 0, 0], size: [0.3, 1.8, 1.8], color: '#78716c',
    detail: "Each backbone applies its own preprocess_input. The image stays in the [0,1] range exactly as in training, so predictions match." },
  { id: 'resnet', title: 'ResNet50', pos: [-3.5, 2.6, 0], size: [1.2, h(2048), 1.2], color: '#0d9488',
    detail: 'Frozen ImageNet weights, classification head removed, global average pooling. Outputs 2048 features.' },
  { id: 'vgg', title: 'VGG16', pos: [-3.5, 0, 0], size: [1.2, h(512), 1.2], color: '#0d9488',
    detail: 'Frozen ImageNet weights, classification head removed, global average pooling. Outputs 512 features.' },
  { id: 'eff', title: 'EfficientNet-B0', pos: [-3.5, -2.6, 0], size: [1.2, h(1280), 1.2], color: '#0d9488',
    detail: 'Frozen ImageNet weights, classification head removed, global average pooling. Outputs 1280 features.' },
  { id: 'fuse', title: 'Feature fusion', pos: [-0.5, 0, 0], size: [0.8, h(3840), 0.8], color: '#115e59',
    detail: 'The three vectors are concatenated into one 3840-dimensional feature vector per image.' },
  { id: 'scale', title: 'StandardScaler', pos: [1.8, 0, 0], size: [0.4, h(3840), 0.8], color: '#78716c',
    detail: 'Per-feature standardization using means and spreads fitted on training data only.' },
  { id: 'bho', title: 'BHO feature mask', pos: [4.2, 0, 0], size: [0.8, h(1909), 0.8], ghostH: h(3840), color: '#0d9488',
    detail: 'Black Hole Optimization chose which features to keep by minimizing redundancy while maximizing correlation with the label. 1909 of 3840 are kept (50.28% reduction on BRISC 2025). At inference the saved mask just selects columns.' },
  { id: 'clf', title: 'Opt-SGD logistic regression', pos: [6.8, 0, 0], size: [1, 1.6, 1], color: '#115e59',
    detail: "Takes the 1909 selected features and computes p = sigmoid(w·x + b), the probability of a tumor. The weights were learned with opt-SGD, which corrects each stochastic update against a full-gradient reference to reduce variance. Learning rate 0.001, L2 10⁻³, 150 epochs."},
  { id: 'gate', title: 'Threshold 0.30', pos: [9, 0, 0], size: [0.3, 2.2, 1.2], color: '#b45309',
    detail: 'If p ≥ 0.30 the image is flagged as tumor. The cutoff is below the usual 0.50 to favour recall, since a missed tumor costs more than a false alarm.' },
]

const LINKS: [string, string][] = [
  ['input', 'pre'], ['pre', 'resnet'], ['pre', 'vgg'], ['pre', 'eff'],
  ['resnet', 'fuse'], ['vgg', 'fuse'], ['eff', 'fuse'],
  ['fuse', 'scale'], ['scale', 'bho'], ['bho', 'clf'], ['clf', 'gate'],
]

function Block({ s, active, onSelect }: { s: Stage; active: boolean; onSelect: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <group position={s.pos}>
      {s.ghostH && (
        <mesh>
          <boxGeometry args={[s.size[0], s.ghostH, s.size[2]]} />
          <meshBasicMaterial color="#a8a29e" wireframe />
        </mesh>
      )}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect() }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
      >
        <boxGeometry args={s.size} />
        <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={active ? 0.6 : hover ? 0.3 : 0} />
      </mesh>
      <Html position={[0, -(Math.max(s.size[1], s.ghostH ?? 0) / 2) - 0.5, 0]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap text-xs font-medium text-stone-700">{s.title}</div>
      </Html>
    </group>
  )
}

function Pulse({ a, b, offset }: { a: THREE.Vector3; b: THREE.Vector3; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.25 + offset) % 1
    ref.current.position.lerpVectors(a, b, t)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshBasicMaterial color="#0d9488" />
    </mesh>
  )
}

function Scene({ selected, setSelected }: { selected: string | null; setSelected: (id: string | null) => void }) {
  const byId = useMemo(() => Object.fromEntries(STAGES.map((s) => [s.id, new THREE.Vector3(...s.pos)])), [])
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} />
      {LINKS.map(([from, to], i) => (
        <group key={from + to}>
          <Line points={[byId[from], byId[to]]} color="#a8a29e" lineWidth={1} />
          <Pulse a={byId[from]} b={byId[to]} offset={(i * 0.37) % 1} />
        </group>
      ))}
      {STAGES.map((s) => (
        <Block key={s.id} s={s} active={selected === s.id} onSelect={() => setSelected(s.id)} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.8} maxPolarAngle={2.2} />
    </>
  )
}

export default function PipelineScene() {
  const [selected, setSelected] = useState<string | null>(null)
  const stage = STAGES.find((s) => s.id === selected)
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-stone-200">
      <Canvas camera={{ position: [0, 3, 16], fov: 50 }} onPointerMissed={() => setSelected(null)}>
        <Scene selected={selected} setSelected={setSelected} />
      </Canvas>
      <div className="pointer-events-none absolute left-3 top-3 text-xs text-stone-500">
        Drag to rotate · click a stage
      </div>
      {stage && (
        <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/90 p-3 text-sm shadow">
          <div className="font-semibold text-stone-900">{stage.title}</div>
          <p className="mt-1 text-stone-700">{stage.detail}</p>
        </div>
      )}
    </div>
  )
}