"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type GalleryPhoto = { src: string; alt: string; caption: string }

type PhotoGalleryProps = {
  photos: GalleryPhoto[]
  className: string
  itemClassName: string
  frameClassName: string
  showCaptions?: boolean
  badge?: string
}

export function PhotoGallery({ photos, className, itemClassName, frameClassName, showCaptions = true, badge }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const isOpen = activeIndex !== null
  const activePhoto = activeIndex === null ? null : photos[activeIndex]

  const close = () => setActiveIndex(null)
  const move = (direction: number) => setActiveIndex((index) => index === null ? null : (index + direction + photos.length) % photos.length)

  useEffect(() => {
    if (!isOpen) return
    const priorOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "ArrowRight" && photos.length > 1) move(1)
      if (event.key === "ArrowLeft" && photos.length > 1) move(-1)
      if (event.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLElement>(".photo-lightbox button:not([disabled])")
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
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = priorOverflow
      previousFocusRef.current?.focus()
    }
  }, [isOpen, photos.length])

  return (
    <div className={className}>
      {photos.map((photo, index) => <figure className={`${itemClassName} ${itemClassName}-${index + 1}`} key={`${photo.src}-${index}`}>
        <button className="photo-trigger" type="button" aria-label={`View photograph: ${photo.alt}`} onClick={() => {
          previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
          setActiveIndex(index)
        }}>
          <span className={frameClassName}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 84vw, (max-width: 1100px) 48vw, 38vw" /></span>
          {badge && <span className="chapter-image-number" aria-hidden="true">{badge}</span>}
        </button>
        {showCaptions && <figcaption>{photo.caption}</figcaption>}
      </figure>)}
      {isOpen && activePhoto && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer" onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}>
        <div className="photo-lightbox-content">
          <button className="photo-lightbox-close" type="button" ref={closeButtonRef} onClick={close} aria-label="Close photograph viewer">Close <span aria-hidden="true">×</span></button>
          <div className="photo-lightbox-image"><Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="100vw" priority /></div>
          <div className="photo-lightbox-caption"><p>{activePhoto.caption}</p><span>{String((activeIndex ?? 0) + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(photos.length).padStart(2, "0")}</span></div>
          {photos.length > 1 && <div className="photo-lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous photograph">← <span>Previous</span></button><button type="button" onClick={() => move(1)} aria-label="Next photograph"><span>Next</span> →</button></div>}
        </div>
      </div>}
    </div>
  )
}
