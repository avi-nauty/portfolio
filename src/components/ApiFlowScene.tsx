import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

type Stage = {
  id: string
  title: string
  pos: [number, number, number]
  size: [number, number, number]
  ghostH?: number
  color: string
  detail: string
}

const STAGES: Stage[] = [
  { id: 'req', title: 'Request', pos: [-9, 0, 0], size: [0.3, 1.8, 1.8], color: '#78716c',
    detail: 'GET /v1/unemployment with a region (Canada or Ontario), an age group (15+ or 15-24) and a number of periods (1 to 120).' },
  { id: 'val', title: 'Validation', pos: [-6.8, 0, 0], size: [0.3, 2.2, 1.2], color: '#b45309',
    detail: 'Bad input is rejected here with a 422, before any work is done.' },
  { id: 'map', title: 'Series lookup', pos: [-4.6, 0, 0], size: [0.8, 1.4, 0.8], color: '#0d9488',
    detail: 'The region and age group are mapped to one of four series from Table 14-10-0287 (monthly, seasonally adjusted). A combination with no mapping returns a 404.' },
  { id: 'cache', title: 'Cache', pos: [-2.2, 0, 0], size: [1, 1.8, 1], color: '#115e59',
    detail: 'In-memory, cache-aside. An entry is trusted for 24 hours. Once a scheduled StatCan release has passed and the stored data is still a month behind, it is rechecked every 5 minutes. A fresh entry is a hit and skips StatCan entirely.' },
  { id: 'client', title: 'StatCan client', pos: [0.6, 2.6, 0], size: [1, 1.4, 1], color: '#0d9488',
    detail: 'On a miss, fetches 120 points for the series. Up to 4 attempts with exponential back-off and jitter, only for failures that waiting could fix (network errors, 5xx, 429, 409). Anything else fails immediately.' },
  { id: 'wds', title: 'StatCan service', pos: [3.0, 2.6, 0], size: [1, 1.4, 1], color: '#78716c',
    detail: "Statistics Canada's Web Data Service. It can refuse calls, for example when a table is locked during its overnight update. A locked table becomes a 503 with a Retry-After header, and any other StatCan failure becomes a 502." },
  { id: 'store', title: 'Store 120 points', pos: [5.2, 2.6, 0], size: [0.8, 2, 0.8], color: '#0d9488',
    detail: 'Errors are exceptions, never empty lists, so only a successful reply ever reaches the cache. The 120 points are stored, so one StatCan call serves every later request for that series.' },
  { id: 'slice', title: 'Slice', pos: [6.8, 0, 0], size: [0.8, 0.9, 0.8], ghostH: 2.4, color: '#0d9488',
    detail: 'The service always holds 120 points and slices out what the caller asked for (for example the last 12). This keeps it to at most four cache entries.' },
  { id: 'res', title: 'JSON response', pos: [9, 0, 0], size: [0.3, 1.8, 1.8], color: '#78716c',
    detail: 'Metadata (series name, unit, frequency, vector ID, retrieval time, whether it came from the cache, and the Statistics Canada licence line) plus the data points.' },
]

// third item is an optional label drawn on the link
const LINKS: [string, string, string?][] = [
  ['req', 'val'], ['val', 'map'], ['map', 'cache'],
  ['cache', 'slice', 'hit'],
  ['cache', 'client', 'miss'], ['client', 'wds'], ['wds', 'store'], ['store', 'slice'],
  ['slice', 'res'],
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
      {LINKS.map(([from, to, label], i) => (
        <group key={from + to}>
          <Line points={[byId[from], byId[to]]} color="#a8a29e" lineWidth={1} />
          <Pulse a={byId[from]} b={byId[to]} offset={(i * 0.37) % 1} />
          {label && (
            <Html position={byId[from].clone().lerp(byId[to], 0.5).add(new THREE.Vector3(0, 0.35, 0))} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
              <div className="whitespace-nowrap font-mono text-[10px] text-stone-500">{label}</div>
            </Html>
          )}
        </group>
      ))}
      {STAGES.map((s) => (
        <Block key={s.id} s={s} active={selected === s.id} onSelect={() => setSelected(s.id)} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.8} maxPolarAngle={2.2} />
    </>
  )
}

export default function ApiFlowScene() {
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