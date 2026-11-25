"use client"

import { useEffect, useState } from "react"
import { bucketSections } from "@/lib/content"
import { StatusMark } from "@/components/site/status-mark"

export function BucketLedger() {
  const [openSections, setOpenSections] = useState<string[]>(["places"])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setOpenSections(window.innerWidth >= 700 ? ["places", "journeys"] : ["places"])
    setReady(true)
  }, [])

  const toggleSection = (id: string) => setOpenSections((open) => open.includes(id) ? open.filter((item) => item !== id) : [...open, id])

  return (
    <div className="bucket-ledger" aria-label="Bucket list sections">
      {bucketSections.map((section) => {
        const isOpen = openSections.includes(section.id)
        return <section className={`bucket-section${isOpen ? " is-open" : ""}`} id={section.id} key={section.id}>
          <button className="bucket-section-trigger" type="button" aria-expanded={isOpen} aria-controls={`bucket-items-${section.id}`} onClick={() => toggleSection(section.id)}>
            <span className="bucket-section-number">{section.number}</span><span className="bucket-section-name"><strong>{section.title}</strong><small>{section.intro}</small></span><span className="bucket-section-count">{section.items.length} things <span aria-hidden="true">{isOpen ? "−" : "+"}</span></span>
          </button>
          <div className="bucket-section-content" id={`bucket-items-${section.id}`} hidden={!isOpen || !ready}>
            <ul className="bucket-items">{section.items.map((item) => <li className="bucket-item" key={item.title}><StatusMark status={item.status} /><span className="bucket-item-title">{item.title}</span><span className="bucket-item-meta">{item.meta}</span></li>)}</ul>
          </div>
        </section>
      })}
    </div>
  )
}
