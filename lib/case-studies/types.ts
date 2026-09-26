/**
 * The content of one case study page. Every case study renders through the
 * same template at /case-studies/[slug]; only the values in one of these
 * objects change from page to page. Two kinds exist: a security audit, whose
 * value is its findings, and an open source project, whose value is what
 * alwaystrue is delivering.
 */

export type Fact = { label: string; value: string; href?: string };

export type Link = { label: string; href: string };

export type Term = { name: string; description: string };

type CaseStudyBase = {
  slug: string;
  title: string;
  client: Link;
  /** One sentence under the title. */
  headline: string;
  /** One paragraph: the system, the engagement, the outcome. */
  summary: string;
  facts: Fact[];
  /** Public links only. Audit and contract repositories are private. */
  links: Link[];
  /** The short form shown on the landing page card. */
  card: { body: string; facts: string[] };
};

/* ------------------------------------------------------------------ audits */

export type Severity = "Critical" | "Major" | "Minor" | "Enhancement" | "Info";

export type FindingStatus = "Resolved" | "Acknowledged" | "Identified";

export type Finding = {
  id: string;
  title: string;
  severity: Severity;
  status: FindingStatus;
  /** One or two sentences: what was wrong and what it would have allowed. */
  summary: string;
};

export type Tally = { severity: Severity; count: number };

/** A trust assumption examined in the report, with the audit team's verdict. */
export type Assessment = {
  title: string;
  body: string;
  verdict: string;
};

export type AuditCaseStudy = CaseStudyBase & {
  kind: "Security audit";
  /** The downloadable report, where the client has agreed to disclosure. */
  report?: { href: string; meta: string };
  system: {
    paragraphs: string[];
    /** The parties or on-chain objects a reader needs to know by name. */
    glossary?: { label: string; items: Term[] };
  };
  scope: {
    paragraphs: string[];
    files: string[];
    /** The review loop, one step per entry. */
    process: string[];
  };
  findings: {
    intro: string;
    tally: Tally[];
    resolved: number;
    acknowledged: number;
    highlights: Finding[];
  };
  assessment: { intro: string; items: Assessment[] };
  outcome: { paragraphs: string[]; recommendations: string[] };
};

/* ------------------------------------------------------------- open source */

export type MilestoneState = "Delivered" | "In progress" | "Planned";

export type Milestone = {
  name: string;
  when: string;
  state: MilestoneState;
  summary: string;
};

export type OpenSourceCaseStudy = CaseStudyBase & {
  kind: "Open source";
  /** The public repository. */
  repo: Link;
  /** What alwaystrue owns and delivers. Leads the page. */
  deliverables: { intro: string; items: Term[] };
  /** Why the project exists. */
  problem: { paragraphs: string[] };
  /** What the project ships, part by part. */
  anatomy: { label: string; items: Term[] };
  /** The principles and decisions that shape the design. */
  approach: { intro: string; items: Term[] };
  status: { intro: string; milestones: Milestone[] };
};

export type CaseStudy = AuditCaseStudy | OpenSourceCaseStudy;
