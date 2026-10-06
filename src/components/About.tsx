function About() {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6">
        <div className="border-t border-line py-16">
      <h2 className="text-sm font-medium uppercase tracking-widest text-accent">About</h2>
      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          I'm a computer science graduate with an MSc from Lakehead University, where I finished with a 3.9 GPA. My graduate research focused on deep learning for medical imaging, using convolutional neural networks to classify scans, along with metaheuristic optimization methods for improving how those models are built and tuned. I've spent about seven years studying AI and machine learning, and what I care about most are the parts that make a model trustworthy: clean data pipelines, careful evaluation, and checking that a result holds up before calling it a result.
        </p>
        <p>
          I'm looking for junior roles in machine learning, data engineering, or software engineering. I like work where a model has to run reliably outside a notebook, with data flowing in cleanly and inference behaving the same in production as in testing. My projects, added here as I finish them, cover machine learning, deep learning, and agentic AI.
        </p>
        <p>
           I'm based in the Waterloo and Kitchener area and open to roles across the KW and GTA region. The fastest way to reach me is by email, and you can find my code on GitHub and my background on LinkedIn.
        </p>
      </div>
      </div>
    </section>
  )
}

export default About