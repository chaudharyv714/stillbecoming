import Link from "next/link"
import { navItems, siteUpdated } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">
        <div className="footer-topline">
          <Link className="footer-wordmark" href="/">Still Becoming<span>.</span></Link>
          <p>A life in progress.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="footer-bottomline">
          <p>Set in Newsreader and DM Sans. Quiet by design.</p>
          <p>Last updated {siteUpdated}</p>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
          <p>© 2026 Still Becoming</p>
        </div>
      </div>
    </footer>
  )
}
