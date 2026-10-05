import { projects } from "../projects"

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map((project) => (
        <article key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>{project.tags.join(" · ")}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer">View project</a>
          )}
        </article>
      ))}
    </section>
  )
}

export default Projects