export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
}

export const projects: Project[] = [
  {
    title: "Projects coming soon",
    description: "Machine learning, deep learning and agentic AI work will be added here as I finish each one.",
    tags: ["ML", "Deep Learning", "Agentic AI"],
  },
]