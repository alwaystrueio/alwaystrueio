import { TransactionFlow } from "@/components/transaction-flow";
import { CrtHero, GlitchText } from "@/components/crt-hero";
import { SiteHeader, EMAIL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CASE_STUDIES as PUBLISHED, caseStudyPath } from "@/lib/case-studies";
import { AuditSeal, ServiceNumeral } from "@/components/section-backdrops";

const SERVICES = [
  {
    id: "audits",
    short: "Security audits",
    output: "Security audit",
    title: "Security and optimization audits",
    body: "We conduct a systematic review of each validator, enumerating the execution paths through the contract and the transactions an adversary could construct against it. Every finding is delivered with a severity rating, a reproduction, and a recommended remediation. Optimization reviews include measured before-and-after execution budgets.",
    detail: ["Aiken", "Plutus / PlutusTx", "Plutarch", "eUTxO threat modeling"],
  },
  {
    id: "products",
    short: "Product engineering",
    output: "Delivered product",
    title: "Product engineering",
    body: "We deliver Cardano products end to end: on-chain validators, the off-chain services and indexers that support them, and the client applications above. Engagements range from discrete components to complete delivery under the client's own name.",
    detail: [
      "On-chain",
      "Off-chain services",
      "Indexing",
      "Client applications",
    ],
  },
  {
    id: "engineers",
    short: "Team augmentation",
    output: "Embedded engineers",
    title: "Team augmentation",
    body: "We place senior Cardano engineers within existing teams, integrated into the client's repository, development process, and on-call rotation. Our engineers are experienced in the extended UTxO model and require no ecosystem onboarding.",
    detail: ["Senior", "Embedded", "Contract or retainer"],
  },
  {
    id: "open-source",
    short: "Open source",
    output: "Upstream contributions",
    title: "Open source",
    body: "We maintain and contribute to the open-source libraries the Cardano ecosystem depends on, and publish the tooling developed for our own audit practice under the same licenses.",
    detail: ["Libraries", "Audit tooling", "Upstream fixes"],
  },
] as const;

const CASE_STUDIES = PUBLISHED.map((study) => ({
  id: study.slug,
  kind: study.kind === "Security audit" ? "Audit" : "Open source",
  title: study.title,
  body: study.card.body,
  facts: study.card.facts,
  href: caseStudyPath(study),
  linkLabel: "Read the case study",
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <SiteHeader />

      <main>
        <CrtHero>
          <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
            <p className="label mb-10 lg:mb-14">
              Cardano smart contract security
            </p>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
              <GlitchText
                as="h1"
                className="max-w-[20ch] font-display text-display-sm text-bone md:text-display-md"
              >
                Security and engineering for the Cardano ecosystem.
              </GlitchText>
              <nav aria-label="Practices" className="lg:pt-3 lg:text-right">
                <p className="label mb-5">Practices</p>
                <ul className="border-b border-line">
                  {SERVICES.map((service) => (
                    <li key={service.id} className="rule">
                      <a
                        href={`#${service.id}`}
                        className="block py-2.5 font-mono text-sm text-muted transition-colors hover:text-bone lg:w-60"
                      >
                        {service.short}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mt-14 max-w-measure lg:mt-16">
              <p className="text-lg leading-relaxed text-muted">
                <span className="text-bone">alwaystrue</span> provides
                independent security audits, product engineering, and embedded
                engineering teams to organizations building on Cardano. We work
                in Aiken, Plutus, and Plutarch, and contribute to the
                open-source libraries the ecosystem depends on.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="label mt-10 inline-block border border-brand bg-brand px-6 py-4 !text-ink transition-opacity hover:opacity-85"
              >
                Request a proposal
              </a>
            </div>
          </div>
        </CrtHero>

        {/* Services, arranged as the shape of a Cardano transaction. */}
        <section id="practices" className="scroll-mt-16 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
            <div className="mb-12 flex flex-col gap-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[22ch] font-display text-display-sm text-bone">
                We join at any stage of development.
              </h2>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted">
                Engagements begin with a finished codebase, a roadmap that is
                not yet built, or a team that needs additional capacity. In each
                case the work is staffed from the same group of Cardano
                engineers.
              </p>
            </div>
            <TransactionFlow />
          </div>
        </section>

        <section className="rule">
          <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
            <ul>
              {SERVICES.map((service, i) => (
                <li
                  key={service.id}
                  id={service.id}
                  className={`relative isolate scroll-mt-16 py-14 lg:py-20 ${i > 0 ? "rule" : ""}`}
                >
                  <ServiceNumeral index={i} />
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
                    <div>
                      <p className="label mb-4 !text-teal">{service.output}</p>
                      <h3 className="font-display text-3xl leading-tight text-bone lg:text-4xl">
                        {service.title}
                      </h3>
                    </div>
                    <div>
                      <p className="max-w-measure text-lg leading-relaxed text-muted">
                        {service.body}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                        {service.detail.map((d) => (
                          <li key={d} className="label !text-muted">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="case-studies" className="rule scroll-mt-16 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
            <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[22ch] font-display text-display-sm text-bone">
                Case studies
              </h2>
              <p className="max-w-[46ch] text-base leading-relaxed text-muted">
                Two security reviews and two open-source projects we lead for
                the ecosystem. Reports are published where the client has agreed
                to disclosure.
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {CASE_STUDIES.map((study) => (
                <li
                  key={study.id}
                  className="flex flex-col bg-ink-raised p-8 lg:p-10"
                >
                  <p className="label mb-5 !text-teal">{study.kind}</p>
                  <h3 className="font-display text-2xl leading-tight text-bone lg:text-3xl">
                    {study.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {study.body}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                    {study.facts.map((fact) => (
                      <li key={fact} className="label !text-muted">
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={study.href}
                    className="label mt-8 inline-block border-b border-line-bright pb-1 !text-bone transition-colors hover:border-brand hover:!text-brand"
                  >
                    {study.linkLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rule relative isolate overflow-hidden">
          <AuditSeal />
          <div className="mx-auto max-w-[1180px] px-6 py-24 lg:px-10 lg:py-32">
            <h2 className="max-w-[24ch] font-display text-display-sm text-bone md:text-display-md">
              Request a proposal.
            </h2>
            <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
              Send an outline of the system and your intended mainnet date. We
              will respond with a proposed scope of review, a fee estimate, and
              an expected timeline.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="label mt-12 inline-block border border-brand bg-brand px-6 py-4 !text-ink transition-opacity hover:opacity-85"
            >
              {EMAIL}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
