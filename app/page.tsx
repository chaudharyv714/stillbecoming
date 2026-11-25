import Image from "next/image"
import Link from "next/link"
import { notes, siteUpdated } from "@/lib/content"
import { StatusMark } from "@/components/site/status-mark"
import { PhotoGallery } from "@/components/site/photo-gallery"

const moments = [
  { src: "/images/coastal-moment.png", alt: "The sea at Marine Drive in the first light of morning", caption: "Marine Drive, 6:10 am." },
  { src: "/images/workbench.png", alt: "A well-used workbench and a notebook", caption: "Workbench, Sunday." },
  { src: "/images/aviation.png", alt: "An aircraft in a sunlit hangar", caption: "A quiet hour in the hangar." },
  { src: "/images/mountain-ride.png", alt: "A winding road disappearing into the mountains", caption: "Somewhere on the long way round." },
]

export default function HomePage() {
  const recentNote = notes[0]

  return (
    <main id="content">
      <section className="home-hero" aria-labelledby="home-title">
        <Image className="home-hero-image" src="/images/home-hero.png" alt="A motorcycle on a quiet road through the Western Ghats at sunrise" fill priority sizes="100vw" />
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <p className="hero-kicker">Kerala <span aria-hidden="true">/</span> Autumn 2026</p>
          <h1 id="home-title">Somewhere between the hangar and the open road.</h1>
          <a className="hero-scroll" href="#right-now"><span className="scroll-line" aria-hidden="true" /> Scroll to begin</a>
        </div>
        <span className="hero-index" aria-hidden="true">01 — 05</span>
      </section>

      <div className="page-wrap home-wrap">
        <section className="home-now section-space" id="right-now">
          <div className="module-label"><span>01</span> Right now</div>
          <div className="home-now-content">
            <div className="now-intro">
              <h2>What this season<br className="desktop-break" /> looks like.</h2>
              <p className="date-stamp">Updated {siteUpdated}</p>
              <p className="body-large">Right now I&apos;m based in Kerala, serving in the Navy, building this website at weekends and planning the next long ride. This is the short version of today.</p>
            </div>
            <dl className="now-list">
              <div><dt>Building</dt><dd>This website, one chapter at a time</dd></div>
              <div><dt>Learning</dt><dd>To make room for slower mornings</dd></div>
              <div><dt>Riding</dt><dd>Short weekend loops while longer routes take shape</dd></div>
              <div><dt>Reading</dt><dd><em>The Art of Noticing</em>, Rob Walker</dd></div>
            </dl>
          </div>
        </section>

        <section className="looking-ahead section-space" aria-labelledby="looking-title">
          <div className="module-label"><span>02</span> Looking ahead</div>
          <div className="ahead-heading">
            <div><h2 id="looking-title">Where this is heading.</h2><p>A life with more roads, more sky, and more time to write it all down.</p></div>
            <Link className="text-link" href="/bucket">See the full Bucket List <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="ahead-list">
            <Link className="ahead-item" href="/bucket#journeys"><span className="ahead-number">01</span><span className="ahead-copy"><strong>Ride the long way</strong><small>A multi-week solo route I am preparing for.</small></span><StatusMark status="In Progress" compact /></Link>
            <Link className="ahead-item" href="/bucket#skills"><span className="ahead-number">02</span><span className="ahead-copy"><strong>Fly more, understand more</strong><small>Going deeper into aviation, in work and in curiosity.</small></span><StatusMark status="In Progress" compact /></Link>
            <Link className="ahead-item" href="/bucket#long-term"><span className="ahead-number">03</span><span className="ahead-copy"><strong>Write the story properly</strong><small>Turn these notes into something longer.</small></span><StatusMark status="To Do" compact /></Link>
          </div>
        </section>

        <section className="moments-section section-space" aria-labelledby="moments-title">
          <div className="module-label"><span>03</span> Current moments</div>
          <div className="section-heading-row"><h2 id="moments-title">A few things lately.</h2><p>Small scenes from the everyday.</p></div>
          <PhotoGallery photos={moments} className="moments-grid" itemClassName="moment" frameClassName="moment-image" />
        </section>

        <section className="home-doors section-space" aria-label="Recent note and current fixation">
          <article className="recent-note-door">
            <div className="module-label"><span>04</span> Recent note</div>
            <p className="meta-line">{new Date(`${recentNote.date}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} <span>/</span> {recentNote.category} <span>/</span> {recentNote.readTime} min read</p>
            <h2><Link href={`/notes/${recentNote.slug}`}>{recentNote.title}</Link></h2>
            <p className="door-copy">I used to think patience was something other people were born with. It turns out to be closer to a habit of attention, and habits can be built.</p>
            <Link className="text-link" href={`/notes/${recentNote.slug}`}>Read the note <span aria-hidden="true">↗</span></Link>
          </article>
          <Link className="fixation-door" href="/things#old-aircraft-manuals">
            <div className="module-label"><span>05</span> Current fixation</div>
            <div className="fixation-content"><div className="fixation-image"><Image src="/images/aviation.png" alt="A close view of a vintage aircraft in a hangar" fill sizes="160px" /></div><div><h2>Old aircraft manuals.</h2><p>Their calm, precise, slightly stubborn prose.</p><span className="text-link">In Things I Love <span aria-hidden="true">↗</span></span></div></div>
          </Link>
        </section>
      </div>
    </main>
  )
}
