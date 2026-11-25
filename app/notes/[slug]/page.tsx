import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ReadingProgress } from "@/components/site/reading-progress"
import { notes } from "@/lib/content"

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = notes.find((entry) => entry.slug === slug)
  return { title: note?.title ?? "Note", description: note?.dek ?? note?.excerpt }
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
}

export default async function NoteArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = notes.findIndex((entry) => entry.slug === slug)
  const note = notes[index]
  if (!note) notFound()
  const previous = notes[index + 1]
  const next = notes[index - 1]

  return (
    <main id="content" className="article-page">
      <ReadingProgress />
      <div className="article-wrap">
        <Link className="back-to-notes" href="/notes"><span aria-hidden="true">←</span> Notes to Self</Link>
        <header className="article-header">
          <p className="eyebrow">{note.category} <span>/</span> {formatDate(note.date)} <span>/</span> {note.readTime} min read</p>
          <h1>{note.title}</h1>
          <p className="article-dek">{note.dek}</p>
        </header>
        {note.image && <figure className="article-lead-image"><Image src={note.image} alt={note.caption ?? "A quiet moment from the archive"} fill priority sizes="(max-width: 700px) 100vw, 1200px" />{note.caption && <figcaption>{note.caption}</figcaption>}</figure>}
        <article className="article-reading-column">
          {note.body.map((paragraph, index) => paragraph === "The first slow morning" ? <h2 key={`subhead-${index}`}>{paragraph}</h2> : <p className={index === 0 ? "article-first-paragraph" : ""} key={`paragraph-${index}`}>{paragraph}</p>)}
          {note.slug === "on-learning-to-be-slow" && <blockquote>Slowness is not the absence of effort; it is effort aimed carefully.</blockquote>}
          <div className="article-end-mark" aria-hidden="true"><span /><span /><span /></div>
          <p className="article-filed">Filed under {note.category} <span>/</span> Written {formatDate(note.date)}{note.edited && <> <span>/</span> Edited {note.edited}</>}</p>
          <div className="article-related"><p className="eyebrow">Related, if you like</p><Link href="/things#aviation">Things I Love: Aviation &amp; aircraft <span aria-hidden="true">↗</span></Link><Link href="/bucket#journeys">Bucket List: Journeys to undertake <span aria-hidden="true">↗</span></Link></div>
        </article>
        <nav className="article-pagination" aria-label="Other notes">
          {previous ? <Link href={`/notes/${previous.slug}`}><span className="eyebrow">Older note</span><strong>{previous.title}</strong><span aria-hidden="true">←</span></Link> : <span />}
          {next ? <Link href={`/notes/${next.slug}`}><span className="eyebrow">Newer note</span><strong>{next.title}</strong><span aria-hidden="true">→</span></Link> : <span />}
        </nav>
      </div>
    </main>
  )
}
