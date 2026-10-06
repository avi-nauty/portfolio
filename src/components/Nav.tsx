function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <ul className="mx-auto flex max-w-3xl gap-6 px-6 py-4 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-muted hover:text-accent">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav