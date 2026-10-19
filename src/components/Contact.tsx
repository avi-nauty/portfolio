import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

const contactLinks = [
  { label: "Email", href: "mailto:nautiyalaviral@gmail.com", Icon: FiMail, external: false },
  { label: "GitHub", href: "https://github.com/avi-nauty", Icon: FiGithub, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/aviral-nautiyal", Icon: FiLinkedin, external: true },
]

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-6">
      <div className="border-t border-line py-16">
        <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Contact</h2>
        <p className="mt-6 text-lg leading-relaxed">
          The fastest way to reach me is by email. I'm based in the Waterloo and Kitchener area and open to roles across KW and the GTA.
        </p>
        <ul className="mt-6 flex gap-5">
          {contactLinks.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="inline-flex text-accent transition-colors hover:text-accent-strong"
              >
                <Icon size={24} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contact