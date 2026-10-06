function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Aviral Nautiyal</h1>
      <p className="mt-4 text-lg text-muted md:text-xl">
        ML engineer in Waterloo with a background in medical imaging and deep learning.
      </p>
      <nav className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="mailto:nautiyalaviral@gmail.com"
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-white hover:bg-accent-strong"
        >
          Email
        </a>
        <a
          href="https://github.com/avi-nauty"
          target="_blank"
          rel="noreferrer"
          className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/aviral-nautiyal"
          target="_blank"
          rel="noreferrer"
          className="text-accent underline-offset-4 hover:text-accent-strong hover:underline"
        >
          LinkedIn
        </a>
      </nav>
    </section>
  )
}

export default Hero