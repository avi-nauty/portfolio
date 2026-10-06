import { projects } from "../projects"

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-2xl border-t border-line px-6 py-16 scroll-mt-13">
      <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Projects</h2>
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <article key={project.title} className="rounded-lg border border-line p-6">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded bg-accent-soft px-2 py-1 font-mono text-xs text-accent-strong">
                  {tag}
                </li>
              ))}
            </ul>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-accent underline-offset-4 hover:text-accent-strong hover:underline"
              >
                View project
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects