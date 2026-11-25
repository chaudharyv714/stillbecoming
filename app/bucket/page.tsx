import Image from "next/image"
import type { Metadata } from "next"
import { PageIntro } from "@/components/site/page-intro"
import { StatusMark } from "@/components/site/status-mark"
import { BucketLedger } from "@/components/site/bucket-ledger"
import { experiencedItems } from "@/lib/content"

export const metadata: Metadata = {
  title: "The Bucket List",
  description: "A ledger of intentions and a shelf of completed experiences.",
}

export default function BucketPage() {
  return (
    <main id="content" className="page-wrap bucket-page">
      <PageIntro kicker="Future, and what became real" title="The Bucket List" description="Things I want to see, do and become. Completed experiences never disappear; they move to the archive below, with their stories." />
      <div className="status-legend" aria-label="Status legend"><StatusMark status="To Do" /><StatusMark status="In Progress" /><StatusMark status="Experienced" /></div>
      <nav className="bucket-anchor-nav" aria-label="Bucket list sections">{["Places", "Journeys", "Experiences", "Skills", "Adventures", "Long-term", "Experienced"].map((item) => <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}</nav>
      <section className="featured-dream" aria-labelledby="dream-title">
        <div className="featured-dream-image"><Image src="/images/mountain-ride.png" alt="A motorcycle route winding through a distant mountain pass" fill priority sizes="(max-width: 700px) 100vw, 1200px" /></div>
        <div className="featured-dream-card"><p className="eyebrow">The big one</p><h2 id="dream-title">The long ride across somewhere far.</h2><p>The journey I keep coming back to. Not because it is the biggest, but because it asks me to become someone slightly more prepared.</p><StatusMark status="In Progress" /><a className="text-link" href="#journeys">Preparation notes <span aria-hidden="true">↗</span></a></div>
      </section>
      <section className="bucket-sections-wrap" aria-labelledby="ledger-title"><div className="bucket-ledger-heading"><p className="eyebrow">An unfinished ledger</p><h2 id="ledger-title">One thing at a time.</h2></div><BucketLedger /></section>
      <section className="experienced-section" id="experienced" aria-labelledby="experienced-title">
        <div className="experienced-heading"><div><p className="eyebrow">The archive</p><h2 id="experienced-title">Experienced.</h2></div><p>Things that have happened get to stay here, with their stories attached.</p></div>
        <div className="experienced-list">{experiencedItems.map((item) => <article className="experienced-row" key={item.title}><div className="experienced-image"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 108px, 230px" /></div><div className="experienced-copy"><p className="eyebrow">{item.date}</p><h3>{item.title}</h3><p>{item.description}</p><a className="text-link" href={item.link}>{item.linkLabel} <span aria-hidden="true">↗</span></a></div><StatusMark status="Experienced" compact /></article>)}</div>
      </section>
    </main>
  )
}
