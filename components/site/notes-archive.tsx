"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { notes, type NoteCategory } from "@/lib/content"

const categories = ["All", ...Array.from(new Set(notes.map((note) => note.category)))]
const years = Array.from(new Set(notes.map((note) => note.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a))
const pinnedNote = notes.find((note) => note.pinned) ?? notes[0]
const archiveNotes = notes.filter((note) => note.slug !== pinnedNote.slug)

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
}

export function NotesArchive() {
  const [category, setCategory] = useState("All")
  const [year, setYear] = useState("All")
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const selectedCategory = params.get("cat")
    const selectedYear = params.get("year")
    if (selectedCategory) {
      const match = categories.find((item) => item.toLowerCase() === selectedCategory.toLowerCase())
      if (match) setCategory(match)
    }
    if (selectedYear && years.includes(selectedYear)) setYear(selectedYear)
  }, [])

  const filtered = useMemo(() => archiveNotes.filter((note) => (category === "All" || note.category === category) && (year === "All" || note.date.startsWith(year))), [category, year])
  const shown = filtered.slice(0, visibleCount)
  const grouped = years.map((itemYear) => ({ year: itemYear, items: shown.filter((note) => note.date.startsWith(itemYear)) })).filter((group) => group.items.length > 0)

  const updateFilters = (nextCategory: string, nextYear: string) => {
    setCategory(nextCategory)
    setYear(nextYear)
    setVisibleCount(4)
    const params = new URLSearchParams()
    if (nextCategory !== "All") params.set("cat", nextCategory.toLowerCase())
    if (nextYear !== "All") params.set("year", nextYear)
    const query = params.toString()
    window.history.replaceState(null, "", query ? `/notes?${query}` : "/notes")
  }

  return (
    <>
      <section className="pinned-note" aria-labelledby="pinned-heading">
        <div className="pinned-label"><p className="eyebrow">Kept close</p><span className="pinned-rule" /></div>
        <div className="pinned-content"><div className="pinned-image">{pinnedNote.image && <Image src={pinnedNote.image} alt="A well-used notebook resting on a workbench" fill sizes="(max-width: 700px) 100vw, 34vw" />}</div><div className="pinned-copy"><p className="eyebrow">Pinned note <span>/</span> {pinnedNote.category} <span>/</span> {pinnedNote.readTime} min read</p><h2 id="pinned-heading"><Link href={`/notes/${pinnedNote.slug}`}>{pinnedNote.title}</Link></h2><p>{pinnedNote.excerpt}</p><Link className="text-link" href={`/notes/${pinnedNote.slug}`}>Read the note <span aria-hidden="true">↗</span></Link></div></div>
      </section>
      <section className="archive-section" aria-labelledby="archive-heading">
        <div className="archive-title-row"><div><p className="eyebrow">The archive</p><h2 id="archive-heading">A few things I wanted to keep.</h2></div><p className="archive-count">{archiveNotes.length} notes <span>/</span> since 2024</p></div>
        <div className="notes-filters" aria-label="Filter notes">
          <div className="filter-chips" role="group" aria-label="Filter by category">{categories.map((item) => <button className={`filter-chip${category === item ? " is-active" : ""}`} type="button" key={item} aria-pressed={category === item} onClick={() => updateFilters(item, year)}>{item}</button>)}</div>
          <label className="year-select-label">Year <select aria-label="Filter by year" value={year} onChange={(event) => updateFilters(category, event.target.value)}><option value="All">All years</option>{years.map((itemYear) => <option value={itemYear} key={itemYear}>{itemYear}</option>)}</select></label>
        </div>
        {grouped.length ? grouped.map((group) => <div className="note-year-group" key={group.year}><h3 className="note-year-heading">{group.year}</h3><div className="note-list">{group.items.map((note) => <article className="note-row" key={note.slug}><time className="note-date" dateTime={note.date}><span>{formatDate(note.date).split(" ")[0]}</span><span>{formatDate(note.date).split(" ")[1]}</span></time><div className="note-row-copy"><p className="eyebrow">{note.category} <span>/</span> {note.readTime} min</p><h3><Link href={`/notes/${note.slug}`}>{note.title}</Link></h3><p>{note.excerpt}</p></div>{note.image && <Link className="note-thumb" href={`/notes/${note.slug}`} tabIndex={-1} aria-hidden="true"><Image src={note.image} alt="" fill sizes="120px" /></Link>}</article>)}</div></div>) : <div className="archive-empty"><p>No notes in this part of the archive yet.</p><button className="text-link button-link" type="button" onClick={() => updateFilters("All", "All")}>Clear filters <span aria-hidden="true">↗</span></button></div>}
        {visibleCount < filtered.length && <button className="load-older" type="button" onClick={() => setVisibleCount((count) => count + 4)}>Load older notes <span aria-hidden="true">↓</span></button>}
      </section>
    </>
  )
}
