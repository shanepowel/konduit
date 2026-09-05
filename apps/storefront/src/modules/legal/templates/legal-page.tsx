type LegalSection = {
  title: string
  body: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  sections: LegalSection[]
}

const LegalPage = ({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: LegalPageProps) => {
  return (
    <article className="content-container py-12 small:py-16">
      <span className="tag tag-outline mb-4">{eyebrow}</span>
      <h1 className="mb-3 max-w-[20ch] text-[clamp(32px,4vw,46px)]">{title}</h1>
      <p className="mb-2 text-[13px] opacity-60">Last updated {lastUpdated}</p>
      <p className="mb-10 max-w-[64ch] text-[16px] leading-relaxed opacity-85">
        {intro}
      </p>
      <div className="max-w-[68ch] space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-[22px]">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-3 text-[15px] leading-relaxed opacity-85"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  )
}

export default LegalPage
