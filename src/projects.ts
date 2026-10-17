export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  description: string
  tags: string[]
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    title: "Brain tumor MRI classifier",
    description:
      "Classifies brain MRI scans using three pretrained CNN backbones, fused features, metaheuristic feature selection and an optimized SGD classifier. Served as a containerized Gradio app on Google Cloud Run, with automated deploys from GitHub Actions. Research demo, not for diagnosis.",
    tags: ["Deep Learning", "CNN", "Medical Imaging", "TensorFlow", "Docker", "Cloud Run", "GitHub Actions"],
    links: [
      {
        label: "Live demo (first load may take ~30s)",
        href: "https://brain-tumor-demo-293791125431.northamerica-northeast2.run.app",
      },
      {
        label: "Code on GitHub",
        href: "https://github.com/avi-nauty/Brain-Tumor-Classification-using-Machine-Learning",
      },
    ],
  },
]