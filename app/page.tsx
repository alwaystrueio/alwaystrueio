import Image from "next/image";
import Link from "next/link";
import { TransactionFlow } from "@/components/transaction-flow";

const EMAIL = "contact@alwaystrue.io";

const SERVICES = [
  {
    id: "audits",
    short: "Audits",
    output: "findings report",
    title: "Security & optimization audits",
    body: "We read every path through your validators, model the transaction an attacker would build, and write up what we find with a reproduction and a fix. Optimization passes ship with before-and-after execution budgets, so the saving is a number rather than a claim.",
    detail: ["Aiken", "Plutus / PlutusTx", "Plutarch", "eUTxO threat modelling"],
  },
  {
    id: "products",
    short: "Products",
    output: "shipped product",
    title: "Product engineering",
    body: "We build Cardano products end to end: on-chain validators, the off-chain services and indexers around them, and the interface on top. Some are ours. Most are someone else's, shipped under their name.",
    detail: ["On-chain", "Off-chain services", "Indexing", "Front end"],
  },
  {
    id: "engineers",
    short: "Engineers",
    output: "embedded engineers",
    title: "Team augmentation",
    body: "Cardano-fluent engineers who join your repository, your standup and your on-call rotation. They arrive knowing the eUTxO model, so you spend your ramp-up time on your product instead of on the ledger.",
    detail: ["Embedded", "Senior", "Contract or retainer"],
  },
  {
    id: "open-source",
    short: "Open source",
    output: "upstream commits",
    title: "Open source",
    body: "We depend on the same libraries you do, so we fix them in public rather than in a private fork. The tooling we build for our own audits gets published on the same terms.",
    detail: ["Libraries", "Audit tooling", "Upstream fixes"],
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" aria-label="alwaystrue home" className="shrink-0">
          <Image
            src="/logo-solid-con-texto-verde.svg"
            alt="alwaystrue"
            width={150}
            height={32}
            priority
          />
        </Link>
        <nav className="flex items-center gap-7">
          <a
            href="#transaction"
            className="label hidden transition-colors hover:text-bone sm:block"
          >
            What we do
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="label border border-line-bright px-4 py-2.5 !text-bone transition-colors hover:border-brand hover:!text-brand"
          >
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* Hero — quiet and typographic. The diagram below is the loud part. */}
        <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
          <p className="label mb-10 lg:mb-14">Cardano smart contract security</p>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
            <h1 className="max-w-[16ch] font-display text-display-sm text-bone md:text-display-md lg:text-display-lg">
              On-chain, there is no{" "}
              <em className="italic text-brand">hotfix</em>.
            </h1>
            {/* Four practices, legible before the fold. */}
            <nav aria-label="Practices" className="lg:pt-3 lg:text-right">
              <p className="label mb-5">Practice</p>
              <ul className="border-b border-line">
                {SERVICES.map((service) => (
                  <li key={service.id} className="rule">
                    <a
                      href={`#${service.id}`}
                      className="block py-2.5 font-mono text-sm text-muted transition-colors hover:text-bone lg:w-56"
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
              <span className="text-bone">alwaystrue</span> audits Cardano smart
              contracts, builds the products that use them, and embeds engineers
              in the teams that ship them. We find the bug while it is still
              cheap — before the ledger makes it permanent.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="label mt-10 inline-block border border-brand bg-brand px-6 py-4 !text-ink transition-opacity hover:opacity-85"
            >
              Start a conversation
            </a>
          </div>
        </section>

        {/* The signature: services as the shape of a transaction. */}
        <section id="transaction" className="rule scroll-mt-16 bg-ink">
          <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
            <div className="mb-12 flex flex-col gap-6 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[24ch] font-display text-display-sm text-bone">
                The people who audit your contracts also write them.
              </h2>
              <p className="max-w-[44ch] text-base leading-relaxed text-muted">
                Four practices, one team. Bring us a repository, a roadmap or a
                hiring gap — the work lands with the same engineers either way.
              </p>
            </div>
            <TransactionFlow />
          </div>
        </section>

        {/* Each output, expanded. */}
        <section className="rule">
          <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
            <ul>
              {SERVICES.map((service, i) => (
                <li
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-16 py-14 lg:py-20 ${i > 0 ? "rule" : ""}`}
                >
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

        {/*
          TODO(alwaystrue): these three numbers are the highest-value thing on
          the page and the only thing here that cannot be written by a
          competitor. Replace the em-dashes with real figures from real
          engagements. Do not ship this section with placeholders.
        */}
        <section className="rule bg-ink-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
            <p className="label mb-12">On the record</p>
            <dl className="grid gap-12 sm:grid-cols-3">
              {[
                { value: "—", label: "Validators audited" },
                { value: "—", label: "Execution units reclaimed" },
                { value: "—", label: "Findings reported" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="label order-2 mt-3">{stat.label}</dt>
                  <dd className="order-1 font-display text-5xl text-bone lg:text-6xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="rule">
          <div className="mx-auto max-w-[1180px] px-6 py-24 lg:px-10 lg:py-32">
            <h2 className="max-w-[24ch] font-display text-display-sm text-bone md:text-display-md">
              Send us the repository.
            </h2>
            <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
              Tell us what it does and when it goes to mainnet. We will tell you
              what an audit would cover, what it would cost, and how long it
              takes.
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

      <footer className="rule">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="label">
            alwaystrue — Cardano smart contract security
          </p>
          {/* TODO(alwaystrue): point these at the real accounts. */}
          <nav className="flex gap-7">
            <a href="#" className="label transition-colors hover:text-bone">
              GitHub
            </a>
            <a href="#" className="label transition-colors hover:text-bone">
              X
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="label transition-colors hover:text-bone"
            >
              Email
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
