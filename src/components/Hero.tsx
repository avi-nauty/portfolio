import { FiMail, FiFileText, FiGithub, FiLinkedin } from "react-icons/fi";

const buttonClass =
  "inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-strong focus-visible:border-accent focus-visible:bg-accent-soft focus-visible:text-accent-strong";

function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-24 pb-16">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Aviral Nautiyal</h1>
      <p className="mt-4 text-lg text-muted md:text-xl">
        ML engineer in Waterloo with a background in medical imaging and deep learning.
      </p>
      <nav className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="mailto:nautiyalaviral@gmail.com"
          className={buttonClass}
          
        >
        <FiMail aria-hidden="true" />
          Email
        </a>
        <a
          href="https://github.com/avi-nauty"
          target="_blank"
          rel="noreferrer"
          className={buttonClass}
        >
          <FiGithub aria-hidden="true" />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/aviral-nautiyal"
          target="_blank"
          rel="noreferrer"
          className={buttonClass}
        >
          <FiLinkedin aria-hidden="true" />
          LinkedIn
        </a>
        <a
          href="Aviral_Nautiyal_Resume_draft6.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          <FiFileText aria-hidden="true" />
          Resume
  </a>
      </nav>
    </section>
  )
}

export default Hero