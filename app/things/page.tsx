import type { Metadata } from "next"
import { PageIntro } from "@/components/site/page-intro"
import { InterestCollection } from "@/components/site/interest-collection"

export const metadata: Metadata = {
  title: "Things I Love",
  description: "A loose, growing collection of the things that hold my attention.",
}

export default function ThingsPage() {
  return (
    <main id="content" className="page-wrap things-page">
      <PageIntro kicker="Enduring fascinations" title="Things I Love" description="A loose, growing collection of what holds my attention: machines, skies, places, and the small obsessions in between. Not a catalogue, just a curated wander." />
      <InterestCollection />
    </main>
  )
}
