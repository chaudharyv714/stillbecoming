import type { BucketStatus } from "@/lib/content"

export function StatusMark({ status, compact = false }: { status: BucketStatus; compact?: boolean }) {
  const glyph = status === "Experienced" ? "●" : status === "In Progress" ? "◐" : "○"
  return (
    <span className={`status-mark${compact ? " status-mark-compact" : ""}`}>
      <span className="status-glyph" aria-hidden="true">{glyph}</span>
      <span>{status}</span>
    </span>
  )
}
