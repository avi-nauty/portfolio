import { FiGithub, FiPlayCircle } from "react-icons/fi"
import { projects } from "../projects"

const linkIcons = {
  github: FiGithub,
  demo: FiPlayCircle,
}

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
              {project.highlights && (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded bg-accent-soft px-2 py-1 font-mono text-xs text-accent-strong">
                    {tag}
                  </li>
                ))}
              </ul>
              {project.links && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.links.map((link) => {
                    const Icon = link.icon ? linkIcons[link.icon] : null
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-strong focus-visible:border-accent focus-visible:bg-accent-soft"
                      >
                        {Icon && <Icon aria-hidden="true" />}
                        {link.label}
                      </a>
                    )
                  })}
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