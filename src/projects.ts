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
  visual?: "pipeline" | "api"
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
    visual: "pipeline",
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
    {
    title: "Canada Labour API",
    description:
      "A FastAPI service in front of Statistics Canada's labour force data, built to be dependable against a source I don't control.",
    highlights: [
      "Ask in plain terms (region, age group, number of periods) and get clean JSON back, instead of hunting for vector IDs and decoding nested records.",
      "Errors are exceptions, never empty lists, so the cache can't store a failure. Retries (up to 4, with back-off and jitter) happen only for failures that waiting could fix.",
      "The cache knows StatCan's monthly release schedule and rechecks every 5 minutes when new data is due but not yet published.",
      "45 offline tests run against recorded StatCan replies and a fake clock, with no network.",
      "Docker image deployed to Google Cloud Run by GitHub Actions through Workload Identity Federation, so no keys are stored.",
      "Try the live demo through the interactive docs page. The service scales to zero, so the first request after a quiet period is slower.",
    ],
    tags: ["Python", "FastAPI", "Pydantic", "httpx", "Docker", "Cloud Run", "GitHub Actions"],
    visual: "api",
    links: [
      {
        label: "Live demo",
        href: "https://canada-labour-api-2341874144.northamerica-northeast2.run.app/docs",
        icon: "demo",
      },
      {
        label: "Code on GitHub",
        href: "https://github.com/avi-nauty/canada_labour_api",
        icon: "github",
      },
    ],
  },
]