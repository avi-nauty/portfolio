import { projects } from "../projects"

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-2xl px-6">
      <div className="border-t border-line py-16">
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
            {project.links && (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Projects