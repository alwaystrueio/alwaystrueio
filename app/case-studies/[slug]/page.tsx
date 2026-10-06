import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, EMAIL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CASE_STUDIES,
  caseStudyPath,
  getCaseStudy,
  type AuditCaseStudy,
  type CaseStudy,
  type Finding,
  type OpenSourceCaseStudy,
  type Severity,
} from "@/lib/case-studies";
import type { FindingStatus, MilestoneState } from "@/lib/case-studies/types";
import { X_HANDLE } from "@/lib/site";

type Params = { slug: string };

// Full class names so Tailwind's scanner picks them up. Colours are the ones
// used in the PDF reports (tailwind.config.ts). The `!` variants override the
// muted colour that `.label` sets.
const SEVERITY_TEXT: Record<Severity, string> = {
  Critical: "text-severity-critical",
  Major: "text-severity-major",
  Minor: "text-severity-minor",
  Enhancement: "text-severity-enhancement",
  Info: "text-severity-info",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  Critical: "!text-severity-critical",
  Major: "!text-severity-major",
  Minor: "!text-severity-minor",
  Enhancement: "!text-severity-enhancement",
  Info: "!text-severity-info",
};

const STATUS_LABEL: Record<FindingStatus, string> = {
  Resolved: "!text-status-resolved",
  Acknowledged: "!text-status-acknowledged",
  Identified: "!text-status-identified",
};

const MILESTONE_LABEL: Record<MilestoneState, string> = {
  Delivered: "!text-status-resolved",
  "In progress": "!text-status-acknowledged",
  Planned: "",
};

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title =
    study.kind === "Security audit"
      ? `${study.title} security audit — alwaystrue`
      : `${study.title} — alwaystrue`;
  const url = caseStudyPath(study);
  return {
    title,
    description: study.headline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: study.headline,
      url,
      siteName: "alwaystrue",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      title,
      description: study.headline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="min-h-screen bg-ink">
      <SiteHeader />

      <main>
        <Hero study={study} />

        {study.kind === "Security audit" ? (
          <AuditSections study={study} />
        ) : (
          <OpenSourceSections study={study} />
        )}

        <section className="rule">
          <div className="mx-auto max-w-[1180px] px-6 py-24 lg:px-10 lg:py-32">
            <h2 className="max-w-[24ch] font-display text-display-sm text-bone md:text-display-md">
              Request a proposal.
            </h2>
            <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
              {study.kind === "Security audit"
                ? `Send an outline of your system and your intended mainnet date. We will respond with a proposed scope of review, a fee estimate, and an expected timeline. The full ${study.title} report, with the complete protocol specification and every finding, is available below.`
                : `Send an outline of what you need built or maintained. We will respond with a proposed scope, a fee estimate, and an expected timeline. ${study.title} is developed in the open, and its repository is available below.`}
            </p>
            <Actions study={study} className="mt-12" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/** The two calls to action, in priority order: a proposal first, then the artefact. */
function Actions({
  study,
  className = "",
}: {
  study: CaseStudy;
  className?: string;
}) {
  const secondary =
    study.kind === "Security audit"
      ? study.report
        ? {
            href: study.report.href,
            label: "Download the report",
            meta: study.report.meta,
            download: true,
          }
        : null
      : {
          href: study.repo.href,
          label: study.repo.label,
          meta: "Apache 2.0",
          download: false,
        };
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-4 ${className}`}>
      <a
        href={`mailto:${EMAIL}`}
        className="label inline-block border border-brand bg-brand px-6 py-4 !text-ink transition-opacity hover:opacity-85"
      >
        Request a proposal
      </a>
      {secondary ? (
        <a
          href={secondary.href}
          download={secondary.download || undefined}
          className="label inline-flex items-baseline gap-3 border border-line-bright px-6 py-4 !text-bone transition-colors hover:border-brand hover:!text-brand"
        >
          {secondary.label}
          <span className="label">{secondary.meta}</span>
        </a>
      ) : null}
    </div>
  );
}

function AuditSections({ study }: { study: AuditCaseStudy }) {
  return (
    <>
      {/* The findings lead: they are the work the client paid for. */}
      <Section eyebrow="Findings" title="What the review found">
        <p className="max-w-measure text-lg leading-relaxed text-muted">
          {study.findings.intro}
        </p>
        <FindingsTally study={study} />
        <p className="label mt-14 mb-2">Selected findings</p>
        <ul className="border-b border-line">
          {study.findings.highlights.map((finding) => (
            <FindingRow key={finding.id} finding={finding} />
          ))}
        </ul>
      </Section>

      <Section eyebrow="The system" title={`What ${study.title} does`}>
        <Paragraphs items={study.system.paragraphs} />
        {study.system.glossary ? (
          <div className="mt-10">
            <TermGrid
              label={study.system.glossary.label}
              items={study.system.glossary.items}
            />
          </div>
        ) : null}
      </Section>

      <Section eyebrow="Scope and method" title="What was reviewed, and how">
        <Paragraphs items={study.scope.paragraphs} />
        <p className="label mt-10 mb-4">Audited files</p>
        <ul className="border-b border-line">
          {study.scope.files.map((file) => (
            <li
              key={file}
              className="rule break-all py-2.5 font-mono text-sm text-bone"
            >
              {file}
            </li>
          ))}
        </ul>
        <p className="label mt-10 mb-4">
          Review loop, repeated for each finding
        </p>
        <NumberedList items={study.scope.process} />
      </Section>

      <Section
        eyebrow="Trust assumptions"
        title="Who must be trusted, and with what"
      >
        <p className="max-w-measure text-lg leading-relaxed text-muted">
          {study.assessment.intro}
        </p>
        <ul className="mt-10 grid gap-12">
          {study.assessment.items.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-2xl leading-tight text-bone">
                {item.title}
              </h3>
              <p className="mt-4 max-w-measure text-base leading-relaxed text-muted">
                {item.body}
              </p>
              <blockquote className="mt-6 max-w-measure border-l border-teal pl-6">
                <p className="label mb-3 !text-teal">Verdict</p>
                <p className="text-base leading-relaxed text-bone">
                  {item.verdict}
                </p>
              </blockquote>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Outcome" title="Where the protocol was left">
        <Paragraphs items={study.outcome.paragraphs} />
        <div className="mt-6">
          <NumberedList items={study.outcome.recommendations} />
        </div>
      </Section>
    </>
  );
}

function OpenSourceSections({ study }: { study: OpenSourceCaseStudy }) {
  return (
    <>
      {/* The deliverables lead: they are what the client is paying for. */}
      <Section eyebrow="Deliverables" title="What alwaystrue is delivering">
        <p className="max-w-measure text-lg leading-relaxed text-muted">
          {study.deliverables.intro}
        </p>
        <ul className="mt-10 border-b border-line">
          {study.deliverables.items.map((item, i) => (
            <li key={item.name} className="rule py-7">
              <div className="grid gap-3 md:grid-cols-[2.5rem_minmax(0,1fr)] md:gap-4">
                <span className="pt-1 font-mono text-sm text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-bone">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-measure text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="The problem" title="Why it exists">
        <Paragraphs items={study.problem.paragraphs} />
      </Section>

      <Section eyebrow="The project" title={`What ${study.title} ships`}>
        <TermGrid label={study.anatomy.label} items={study.anatomy.items} />
      </Section>

      <Section eyebrow="Approach" title="How it is built">
        <p className="max-w-measure text-lg leading-relaxed text-muted">
          {study.approach.intro}
        </p>
        <ul className="mt-10 grid gap-10">
          {study.approach.items.map((item) => (
            <li key={item.name}>
              <h3 className="font-display text-2xl leading-tight text-bone">
                {item.name}
              </h3>
              <p className="mt-3 max-w-measure text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Status" title="Where the project stands">
        <p className="max-w-measure text-lg leading-relaxed text-muted">
          {study.status.intro}
        </p>
        <ol className="mt-10 border-b border-line">
          {study.status.milestones.map((milestone) => (
            <li key={milestone.name} className="rule py-7">
              <div className="grid gap-4 md:grid-cols-[8.5rem_minmax(0,1fr)]">
                <div className="flex flex-wrap gap-x-4 md:flex-col md:gap-y-2">
                  <span className={`label ${MILESTONE_LABEL[milestone.state]}`}>
                    {milestone.state}
                  </span>
                  <span className="font-mono text-sm text-bone">
                    {milestone.when}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-bone">
                    {milestone.name}
                  </h3>
                  <p className="mt-3 max-w-measure text-base leading-relaxed text-muted">
                    {milestone.summary}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

/** Labelled grid of named parts: roles, game objects, the anatomy of a contract. */
function TermGrid({
  label,
  items,
}: {
  label: string;
  items: { name: string; description: string }[];
}) {
  return (
    <>
      <p className="label mb-4">{label}</p>
      <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
        {items.map((term) => (
          <div key={term.name} className="bg-ink-raised p-6">
            <dt className="font-display text-xl text-bone">{term.name}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">
              {term.description}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Hero({ study }: { study: CaseStudy }) {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-20 pt-12 lg:px-10 lg:pb-28 lg:pt-20">
      <p className="label mb-10 flex flex-wrap items-center gap-x-3 lg:mb-14">
        <Link
          href="/#case-studies"
          className="transition-colors hover:text-bone"
        >
          Case studies
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-teal">{study.kind}</span>
      </p>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <h1 className="font-display text-display-sm text-bone md:text-display-md">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[34ch] font-display text-2xl leading-snug text-muted md:text-3xl">
            {study.headline}
          </p>
        </div>
        <dl className="border-b border-line lg:w-72 lg:pt-3">
          {study.facts.map((fact) => (
            <div
              key={fact.label}
              className="rule flex items-baseline justify-between gap-6 py-2.5"
            >
              <dt className="label">{fact.label}</dt>
              <dd className="font-mono text-sm text-bone">
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="border-b border-line-bright pb-px transition-colors hover:border-brand hover:text-brand"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-14 max-w-measure lg:mt-16">
        <p className="text-lg leading-relaxed text-muted">{study.summary}</p>
        <Actions study={study} className="mt-10" />
        {study.links.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {study.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label border-b border-line-bright pb-1 !text-bone transition-colors hover:border-brand hover:!text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rule">
      <div className="mx-auto max-w-[1180px] px-6 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label mb-4 !text-teal">{eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight text-bone lg:text-4xl">
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="grid max-w-measure gap-5">
      {items.map((text) => (
        <p
          key={text.slice(0, 40)}
          className="text-lg leading-relaxed text-muted"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-4">
      {items.map((text, i) => (
        <li key={text} className="grid grid-cols-[2.5rem_1fr] gap-4">
          <span className="pt-0.5 font-mono text-sm text-teal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-base leading-relaxed text-muted">{text}</span>
        </li>
      ))}
    </ol>
  );
}

function FindingsTally({ study }: { study: AuditCaseStudy }) {
  const { tally, resolved, acknowledged } = study.findings;
  const total = tally.reduce((sum, row) => sum + row.count, 0);
  const max = Math.max(...tally.map((row) => row.count), 1);
  return (
    <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)]">
      <table className="w-full bg-ink-raised py-3 text-left">
        <caption className="sr-only">Findings by severity</caption>
        <tbody>
          {tally.map((row) => (
            <tr
              key={row.severity}
              className={
                row.count === 0 ? "text-muted" : SEVERITY_TEXT[row.severity]
              }
            >
              <th
                scope="row"
                className="label w-36 py-3 pl-6 font-medium !text-inherit"
              >
                {row.severity}
              </th>
              <td className="py-3 pr-4">
                <span
                  aria-hidden="true"
                  className="block h-1.5 rounded-full bg-current"
                  style={{
                    width: `${(row.count / max) * 100}%`,
                    minWidth: row.count ? "4px" : 0,
                  }}
                />
              </td>
              <td className="w-12 py-3 pr-6 text-right font-mono text-sm tabular-nums">
                {row.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="grid grid-cols-3 bg-ink-raised p-6 sm:grid-cols-1 sm:content-start sm:gap-6">
        <div>
          <dt className="label">Total</dt>
          <dd className="mt-1 font-display text-3xl text-bone">{total}</dd>
        </div>
        <div>
          <dt className="label">Resolved</dt>
          <dd className="mt-1 font-display text-3xl text-status-resolved">
            {resolved}
          </dd>
        </div>
        <div>
          <dt className="label">Acknowledged</dt>
          <dd className="mt-1 font-display text-3xl text-status-acknowledged">
            {acknowledged}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function FindingRow({ finding }: { finding: Finding }) {
  return (
    <li className="rule py-8 first:pt-4">
      <div className="grid gap-4 md:grid-cols-[8.5rem_minmax(0,1fr)]">
        <div className="flex flex-wrap gap-x-4 md:flex-col md:gap-y-2">
          <span className="font-mono text-sm text-bone">{finding.id}</span>
          <span className={`label ${SEVERITY_LABEL[finding.severity]}`}>
            {finding.severity}
          </span>
          <span className={`label ${STATUS_LABEL[finding.status]}`}>
            {finding.status}
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl leading-tight text-bone">
            {finding.title}
          </h3>
          <p className="mt-3 max-w-measure text-base leading-relaxed text-muted">
            {finding.summary}
          </p>
        </div>
      </div>
    </li>
  );
}
