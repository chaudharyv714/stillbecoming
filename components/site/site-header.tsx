"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { navItems } from "@/lib/content"

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 36)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className={`site-header${condensed ? " is-condensed" : ""}`}>
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Still Becoming home">
          Still Becoming<span className="wordmark-period">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link key={item.href} className={`nav-link${current ? " is-current" : ""}`} href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
          <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <p className="eyebrow">A personal archive</p>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => {
              const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link key={item.href} tabIndex={menuOpen ? 0 : -1} className={`mobile-nav-link${current ? " is-current" : ""}`} href={item.href} aria-current={current ? "page" : undefined}>
                  <span className="mobile-nav-number">0{index + 1}</span>{item.label}
                </Link>
              )
            })}
          </nav>
          <p className="mobile-menu-note">A life in progress.</p>
        </div>
      </div>
    </header>
  )
}
