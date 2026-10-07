import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LanguageIcon, languageOf } from "@/components/language-icons";
import {
  caseStudyPath,
  findingCounts,
  type CaseStudy,
} from "@/lib/case-studies";

const CHIP =
  "label inline-flex items-center gap-2 rounded-sm border border-line bg-ink px-3 py-2";

/**
 * One case study on the landing page. The whole card is the link: the
 * "Read the case study" anchor stretches over it, so the card has one tab
 * stop and one accessible name. Facts and the link sit on the card's floor,
 * so they line up across a row whatever the length of the copy above.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const counts = study.kind === "Security audit" ? findingCounts(study) : null;

  return (
    <li className="group relative isolate flex flex-col overflow-hidden bg-ink-raised p-8 transition-colors duration-300 hover:bg-ink-hover lg:p-10">
      {/* Hover: a brand line draws across the top and a glow rises behind it. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-6">
        <p className="label !text-teal">
          {study.kind === "Security audit" ? "Audit" : "Open source"}
          <span className="text-muted"> · {study.client.label}</span>
        </p>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>

      <h3 className="mt-6 font-display text-3xl leading-tight text-bone lg:text-4xl">
        {study.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {study.card.body}
      </p>

      <div className="mt-auto pt-10">
        <ul className="flex flex-wrap gap-2 border-t border-line pt-6">
          {study.card.facts.map((fact) => {
            const language = languageOf(fact);
            return (
              <li key={fact} className={`${CHIP} !text-bone`}>
                {language ? (
                  <LanguageIcon name={language} className="size-4" />
                ) : null}
                {fact}
              </li>
            );
          })}
          {counts ? (
            <>
              <li className={`${CHIP} border-findings/40 !text-findings`}>
                <Dot />
                {counts.total} findings
              </li>
              {counts.critical > 0 ? (
                <li
                  className={`${CHIP} border-severity-critical/40 !text-severity-critical`}
                >
                  <Dot />
                  {counts.critical} critical
                </li>
              ) : null}
            </>
          ) : null}
        </ul>
        <a
          href={caseStudyPath(study)}
          className="label mt-7 inline-flex items-center gap-2 !text-bone transition-colors after:absolute after:inset-0 after:content-[''] group-hover:!text-brand"
        >
          Read the case study
          <span className="sr-only">: {study.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </li>
  );
}

function Dot() {
  return <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />;
}
