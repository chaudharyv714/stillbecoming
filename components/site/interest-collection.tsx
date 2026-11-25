"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { interests } from "@/lib/content"

type Interest = (typeof interests)[number]

export function InterestCollection() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(interests.map((interest) => interest.category)))], [])
  const [category, setCategory] = useState("All")
  const [openInterest, setOpenInterest] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const visible = category === "All" ? interests : interests.filter((interest) => interest.category === category)
  const expanded = interests.find((interest) => interest.slug === openInterest)

  const closeEntry = useCallback(() => {
    setOpenInterest(null)
    if (window.location.hash) window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
  }, [])

  const openEntry = (interest: Interest) => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOpenInterest(interest.slug)
    window.history.replaceState(null, "", `#${interest.slug}`)
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (interests.some((interest) => interest.slug === hash)) setOpenInterest(hash)
  }, [])

  useEffect(() => {
    if (!openInterest) return
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeEntry()
        return
      }
      if (event.key !== "Tab") return
      const focusable = document.querySelectorAll<HTMLElement>(".interest-detail a[href], .interest-detail button:not([disabled])")
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = priorOverflow
      previousFocusRef.current?.focus()
    }
  }, [closeEntry, openInterest])

  return (
    <>
      <div className="filter-chips interest-filters" aria-label="Filter interests">
        {categories.map((item) => <button type="button" key={item} className={`filter-chip${category === item ? " is-active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <section className="featured-interest" aria-label="Featured interest">
        <div className="featured-interest-image"><Image src="/images/mountain-ride.png" alt="A motorcyclist on a winding road through the mountains" fill sizes="(max-width: 700px) 100vw, 58vw" /></div>
        <div className="featured-interest-copy"><p className="eyebrow">Featured now</p><h2>Motorcycles &amp; machines</h2><p className="feature-dek">Why a machine with two wheels and very little protection teaches so much about attention, risk, and enjoying the journey more than the destination.</p><dl className="feature-facts"><div><dt>Since</dt><dd>2021</dd></div><div><dt>Currently</dt><dd>Weekend routes through the Western Ghats</dd></div></dl><button className="text-link button-link" type="button" onClick={() => openEntry(interests[0])}>Open the full entry <span aria-hidden="true">↗</span></button></div>
      </section>
      <section className="interest-mosaic" aria-label="All interests">
        {visible.map((interest, index) => <article className={`interest-tile tile-${interest.size}`} key={interest.slug}>
          <button type="button" className="interest-tile-button" onClick={() => openEntry(interest)} aria-label={`Open ${interest.title}`}>
            <span className="interest-tile-image"><Image src={interest.image} alt={interest.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 38vw" /></span>
            <span className="interest-tile-copy"><span className="eyebrow">{interest.category}</span><span className="interest-title">{interest.title}</span><span className="interest-short">{interest.short}</span><span className="tile-open">Open entry <span aria-hidden="true">↗</span></span></span>
          </button>
        </article>)}
        {visible.length === 0 && <p className="empty-copy">Nothing here just yet. Try another category.</p>}
      </section>
      <section className="curiosities-section">
        <div className="curiosities-heading"><p className="eyebrow">The small things</p><h2>Small curiosities.</h2></div>
        <ul>{["Mechanical watches", "Old aircraft manuals", "Radio, and the sky behind it", "Night rides", "Maps that are not for navigation", "Good tea", "Quiet railway stations", "Lighthouses"].map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      {expanded && <div className="interest-overlay" role="dialog" aria-modal="true" aria-labelledby="interest-dialog-title">
        <button className="interest-overlay-scrim" type="button" onClick={closeEntry} aria-label="Close interest details" />
        <article className="interest-detail">
          <button type="button" className="detail-close" ref={closeButtonRef} onClick={closeEntry}><span aria-hidden="true">←</span> Back to the collection</button>
          <div className="detail-image"><Image src={expanded.image} alt={expanded.alt} fill sizes="(max-width: 700px) 100vw, 800px" /></div>
          <div className="detail-body"><p className="eyebrow">{expanded.category}</p><h2 id="interest-dialog-title">{expanded.title}</h2><p className="detail-dek">{expanded.short}</p><p>{expanded.body}</p><dl className="feature-facts"><div><dt>Since</dt><dd>{expanded.since}</dd></div><div><dt>Currently</dt><dd>{expanded.current}</dd></div></dl><div className="related-links"><span className="eyebrow">Related</span>{expanded.related.slice(0, 2).map((item) => <span className="related-pill" key={item}>{item}</span>)}</div></div>
        </article>
      </div>}
    </>
  )
}
