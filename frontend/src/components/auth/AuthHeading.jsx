function AuthHeading({ eyebrow, title, description }) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-xs leading-4 font-semibold tracking-[0.08em] text-accent uppercase">
        {eyebrow}
      </p>
      <h1 className="font-display text-[32px] leading-10 font-semibold tracking-[-0.01em] text-heading">
        {title}
      </h1>
      <p className="text-base leading-6 text-ink-soft">{description}</p>
    </header>
  )
}

export default AuthHeading
