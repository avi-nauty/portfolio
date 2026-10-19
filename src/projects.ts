export type ProjectLink = {
  label: string
  href: string
  icon?: "github" | "demo"
}

export type Project = {
  title: string
  description: string
  highlights?: string[]
  tags: string[]
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: "Brain tumor MRI classifier",
    description:
      "An end-to-end brain MRI classification pipeline from my graduate research, deployed as a public web demo.",
    highlights: [
      "Fuses features from three pretrained CNN backbones: ResNet50, VGG16 and EfficientNetB0.",
      "Metaheuristic feature selection narrows the fused features before an optimized SGD classifier makes the call.",
      "Decision threshold set to 0.30 to favor recall, since missing a tumor costs more than a false alarm.",
      "Packaged with Docker and served as a Gradio app on Google Cloud Run, with an instance cap, upload size limit and request queue to keep usage and cost bounded.",
      "GitHub Actions deploys every change to main, authenticating to Google Cloud through Workload Identity Federation, so no keys are stored.",
      "Try the live demo by uploading an MRI image (PNG or JPG, up to 10 MB). It's a research demo, not for diagnosis, and the first load can take about 30 seconds while the container starts.",
    ],
    tags: ["Deep Learning", "CNN", "Medical Imaging", "TensorFlow", "Docker", "Cloud Run", "GitHub Actions"],
    links: [
      {
        label: "Live demo",
        href: "https://brain-tumor-demo-293791125431.northamerica-northeast2.run.app",
        icon: "demo",
      },
      {
        label: "Code on GitHub",
        href: "https://github.com/avi-nauty/Brain-Tumor-Classification-using-Machine-Learning",
        icon: "github",
      },
    ],
  },
]