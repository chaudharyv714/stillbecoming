import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { PageIntro } from "@/components/site/page-intro"
import { storyChapters } from "@/lib/content"
import { PhotoGallery } from "@/components/site/photo-gallery"

export const metadata: Metadata = {
  title: "Story So Far",
  description: "A condensed autobiography, in four chapters. The past, as it is remembered.",
}

export default function StoryPage() {
  return (
    <main id="content" className="page-wrap story-page">
      <PageIntro kicker="The past" title="Story So Far" description="A condensed autobiography. Not a résumé, and not a list of dates." />
      <p className="story-lede">How did I get here? Four chapters, told briefly: where I began, what I learned to make, the uniform I put on, and the roads that keep pulling me away from everything else.</p>
      <figure className="story-panorama"><Image src="/images/story-panorama.png" alt="A quiet coastal neighborhood at dawn" fill priority sizes="(max-width: 700px) 100vw, 1200px" /><figcaption>Somewhere familiar, seen from a little further away.</figcaption></figure>
      <nav className="chapter-rail" aria-label="Story chapters">
        {storyChapters.map((chapter) => <a href={`#${chapter.id}`} key={chapter.id}><span>{chapter.number}</span>{chapter.title}</a>)}
      </nav>
      <div className="story-chapters">
        {storyChapters.map((chapter) => <section className={`story-chapter ${chapter.layout}`} id={chapter.id} key={chapter.id}>
          <PhotoGallery photos={[{ src: chapter.image, alt: chapter.alt, caption: chapter.caption }]} className="chapter-image" itemClassName="chapter-photo" frameClassName="chapter-photo-frame" showCaptions={false} badge={chapter.number} />
          <div className="chapter-copy">
            <p className="eyebrow">Chapter {chapter.number}</p>
            <h2>{chapter.title}</h2>
            <p className="chapter-intro">{chapter.intro}</p>
            <p>{chapter.body}</p>
            <figure className="chapter-caption"><span className="caption-rule" /><figcaption>{chapter.caption}</figcaption></figure>
          </div>
        </section>)}
      </div>
      <div className="story-close"><p>To be continued...</p><Link className="text-link" href="/">See where it stands now <span aria-hidden="true">↗</span></Link></div>
    </main>
  )
}
