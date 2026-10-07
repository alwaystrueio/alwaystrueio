import type { AuditCaseStudy, CaseStudy } from "./types";
import { githoney } from "./githoney";
import { asteria } from "./asteria";
import { contractsLibrary } from "./contracts-library";
import { cardanoInit } from "./cardano-init";

export type {
  CaseStudy,
  AuditCaseStudy,
  OpenSourceCaseStudy,
  Finding,
  Severity,
} from "./types";

/** Every published case study, in the order they appear on the landing page. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  githoney,
  asteria,
  contractsLibrary,
  cardanoInit,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function caseStudyPath(study: Pick<CaseStudy, "slug">): string {
  return `/case-studies/${study.slug}`;
}

/** Headline numbers for an audit, counted from its severity tally. */
export function findingCounts(study: AuditCaseStudy) {
  const count = (severity: string) =>
    study.findings.tally.find((row) => row.severity === severity)?.count ?? 0;
  return {
    total: study.findings.tally.reduce((sum, row) => sum + row.count, 0),
    critical: count("Critical"),
  };
}
