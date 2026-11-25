export function PageIntro({
  kicker,
  title,
  description,
  children,
}: {
  kicker?: string
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <header className="page-intro">
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h1>{title}</h1>
      <p className="page-intro-copy">{description}</p>
      {children}
    </header>
  )
}
