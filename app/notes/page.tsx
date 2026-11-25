import type { Metadata } from "next"
import { PageIntro } from "@/components/site/page-intro"
import { NotesArchive } from "@/components/site/notes-archive"
import { notes } from "@/lib/content"

export const metadata: Metadata = {
  title: "Notes to Self",
  description: "Things I want to remember, argue with, or simply put down in words.",
}

export default function NotesPage() {
  const latest = notes[0]
  const years = new Set(notes.map((note) => note.date.slice(0, 4)))
  return (
    <main id="content" className="page-wrap notes-page">
      <PageIntro kicker="A dated archive" title="Notes to Self" description="Things I want to remember, argue with, or simply put down in words.">
        <dl className="notes-stats"><div><dt>Writing since</dt><dd>2024</dd></div><div><dt>Notes</dt><dd>{notes.length.toString().padStart(2, "0")}</dd></div><div><dt>Latest</dt><dd>{new Date(`${latest.date}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</dd></div><div><dt>Years</dt><dd>{years.size}</dd></div></dl>
      </PageIntro>
      <NotesArchive />
    </main>
  )
}
