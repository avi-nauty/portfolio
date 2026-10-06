function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-6">
        <div className="border-t border-line py-16">
      <h2 className="text-sm font-medium uppercase tracking-widest text-accent">Contact</h2>
      <p className="mt-6 text-lg leading-relaxed">
        The fastest way to reach me is by email. I'm based in the Waterloo and Kitchener area and open to roles across KW and the GTA.
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <a
            href="mailto:nautiyalaviral@gmail.com"
            className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
          >
            nautiyalaviral@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://github.com/avi-nauty"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/aviral-nautiyal"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      </div>
    </section>
  )
}

export default Contact