import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { WorkflowDiagram } from "@/components/case-study/WorkflowDiagram";
import { IntegrationDiagram } from "@/components/case-study/IntegrationDiagram";
import { PlaceholderBox, PlaceholderText } from "@/components/case-study/PlaceholderText";
import { Icon3D } from "@/components/Icon3D";
import { TopNav } from "@/components/TopNav";
import { ScreenshotGallery } from "@/components/case-study/ScreenshotGallery";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return { title: study ? `${study.title} · Sumaira Tabassum` : "Case study" };
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <h2 className="flex items-baseline gap-3 text-2xl font-bold text-ink sm:text-3xl">
        <span className="text-sm font-semibold text-accent">{number}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BackLink() {
  return (
    <Link
      href="/#projects"
      className="inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-accent"
    >
      <span aria-hidden>←</span> All projects
    </Link>
  );
}

// Loom share links (loom.com/share/...) need the /embed/ form to play inside the page.
function loomEmbed(url: string) {
  return url.replace("/share/", "/embed/");
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <>
    <TopNav />
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:px-10">
      <BackLink />

      {/* Header */}
      <header className="mt-10 flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Automation case study
            </p>
            {study.status && (
              <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {study.status}
              </span>
            )}
          </div>
          <h1 className="mt-3 bg-linear-to-b from-ink to-muted bg-clip-text pb-1 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed">{study.summary}</p>
        </div>
        <Icon3D name="gear" size={150} className="self-start sm:self-center" />
      </header>

      <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {study.meta.map((item) => (
          <div key={item.label} className="rounded-2xl border border-line bg-card p-4 backdrop-blur-md">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</dt>
            <dd className="mt-1 font-medium text-ink">
              <PlaceholderText text={item.value} />
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
        {study.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            {tag}
          </li>
        ))}
      </ul>

      <Section number="01" title="The problem">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6 backdrop-blur-md">
            <h3 className="font-semibold text-ink">What the business needed</h3>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-muted">
              {study.problem.needed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-card p-6 backdrop-blur-md">
            <h3 className="font-semibold text-ink">What was broken when I started</h3>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-accent">
              {study.problem.broken.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section number="02" title="What I built">
        <p className="mb-6 max-w-2xl leading-relaxed">
          The whole system runs in GoHighLevel, split into {study.sections.length} sections that
          each handle one part of the customer journey.
        </p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {study.sections.map((section, i) => (
            <li key={section.title} className="rounded-2xl border border-line bg-card p-5 backdrop-blur-md">
              <p className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-semibold text-ink">
                <PlaceholderText text={section.title} />
              </h3>
              <p className="mt-1 text-sm leading-relaxed">
                <PlaceholderText text={section.text} />
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="03" title="How it works">
        <p className="mb-6 max-w-2xl leading-relaxed">
          This is the real intake workflow, simplified from about 100 steps into 4 parts. Click
          the plus to follow a lead from the first message to the hand-off.
        </p>
        <WorkflowDiagram flow={study.flow} />

        <h3 className="mt-10 text-lg font-semibold text-ink">Working around GoHighLevel&apos;s limits</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {study.limits.map((item) => (
            <li
              key={item.limit}
              className="grid gap-2 rounded-2xl border border-line bg-card p-5 backdrop-blur-md sm:grid-cols-2 sm:gap-6"
            >
              <p className="text-sm leading-relaxed">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Limit</span>
                {item.limit}
              </p>
              <p className="text-sm leading-relaxed text-ink">
                <span className="block text-xs font-semibold uppercase tracking-wider text-accent">My fix</span>
                <PlaceholderText text={item.fix} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section number="04" title="ServiceM8 integration">
        <p className="mb-6 max-w-2xl leading-relaxed">
          <PlaceholderText text={study.integration.intro} />
        </p>
        <IntegrationDiagram integration={study.integration} />
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed marker:text-muted">
          {study.integration.notes.map((note) => (
            <li key={note}>
              <PlaceholderText text={note} />
            </li>
          ))}
        </ul>
      </Section>

      <Section number="05" title="Video walkthrough">
        {study.video ? (
          <div className="aspect-video overflow-hidden rounded-2xl border border-line">
            <iframe
              src={loomEmbed(study.video)}
              title={`${study.title} walkthrough`}
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <PlaceholderBox className="aspect-video" label="[Loom walkthrough video goes here]" />
        )}
      </Section>

      <Section number="06" title="Screenshots">
        <p className="mb-8 max-w-2xl leading-relaxed">
          Some of the main workflows in the system, straight from GoHighLevel.
        </p>
        <ScreenshotGallery shots={study.screenshots} />
        <p className="mt-4 text-xs text-muted">
          Names, numbers and account details are hidden to protect the client and their customers.
        </p>
      </Section>

      <Section number="07" title="Results">
        <ul className="flex flex-col gap-3">
          {study.results.map((result) => (
            <li key={result} className="flex gap-3 rounded-2xl border border-line bg-card p-5 backdrop-blur-md">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed text-ink">
                <PlaceholderText text={result} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-20 border-t border-line pt-8">
        <BackLink />
      </div>
    </main>
    </>
  );
}
