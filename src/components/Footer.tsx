import { FiGithub } from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="px-6 pb-12">
      <div className="mx-auto max-w-2xl border-t border-black/10 pt-6 text-sm opacity-70">
        <p>© {new Date().getFullYear()} Aviral Nautiyal. All rights reserved.</p>
        <p className="mt-2">
          Built with React, TypeScript, Vite and Tailwind. Deployed with GitHub Actions to Firebase Hosting.{" "}
          <a
            href="https://github.com/avi-nauty/portfolio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent underline-offset-4 hover:text-accent-strong hover:underline"
          >
            <FiGithub aria-hidden="true" />
            View source
          </a>
        </p>
      </div>
    </footer>
  )
}