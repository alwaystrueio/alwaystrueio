import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrtHero, GlitchText } from "@/components/crt-hero";
import { SiteHeader, EMAIL } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CRITERIA,
  FAQ,
  HACKATHON,
  IDEAS,
  PRIZES,
  SCHEDULE,
  SIGNUP_URL,
  TOOLKIT,
  formatUsd,
} from "@/lib/hackathon";
import { X_HANDLE } from "@/lib/site";

const PRIZE_POOL = formatUsd(HACKATHON.prizePool);
const TITLE = `${HACKATHON.name} — Build DeFi on Cardano, ${PRIZE_POOL} in prizes`;
const DESCRIPTION = `An online hackathon to build DeFi dApps and protocols on Cardano with cardano-init and ContractsLibrary. Run by alwaystrue, sponsored by ${HACKATHON.sponsor}. ${PRIZE_POOL} in prizes.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/hackathon" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/hackathon",
    siteName: "alwaystrue",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const UPDATES_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  `${HACKATHON.name}: notify me when registration opens`,
)}`;

const TICKER = [
  `${PRIZE_POOL} in prizes`,
  "Build DeFi on Cardano",
  HACKATHON.format,
  "Sponsored by IOG",
  "cardano-init",
  "ContractsLibrary",
  "Free to enter",
];

export default function HackathonPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <SiteHeader />

      <main>
        <Hero />
        <Ticker />
        <PresentedBy />
        <Brief />
        <Toolkit />
        <Prizes />
        <Schedule />
        <Judging />
        <Faq />
        <Closing />
      </main>

      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <CrtHero>
      <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        <p className="label mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mb-12">
          <span className="inline-flex items-center gap-2 border border-[rgba(154,244,123,0.4)] px-2.5 py-1 !text-brand">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand"
            />
            {HACKATHON.format} hackathon
          </span>
          <span>
            {HACKATHON.dateConfirmed
              ? HACKATHON.date
              : `Starting around ${HACKATHON.date}`}
          </span>
        </p>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-16">
          <div>
            <GlitchText
              as="h1"
              className="font-display text-[3.25rem] leading-[0.95] tracking-[-0.03em] text-bone sm:text-display-md lg:text-display-lg"
            >
              Build DeFi on Cardano.
            </GlitchText>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted">
              An online hackathon for DeFi dApps and protocols. Learn on the
              Developer Portal, scaffold with{" "}
              <span className="font-mono text-base text-bone">cardano-init</span>,
              build on{" "}
              <span className="font-mono text-base text-bone">
                ContractsLibrary
              </span>
              , and compete for{" "}
              <span className="text-brand">{PRIZE_POOL} in prizes</span>.
            </p>
            <SignUp className="mt-10" />
          </div>
          <Terminal />
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:mt-20 lg:grid-cols-4">
          <Stat label="Prize pool" value={PRIZE_POOL} accent />
          <Stat
            label="Kickoff"
            value={HACKATHON.shortDate}
            note={HACKATHON.dateConfirmed ? undefined : "TBC"}
          />
          <Stat label="Format" value={HACKATHON.format} />
          <Stat label="Entry" value="Free" />
        </dl>
      </div>
    </CrtHero>
  );
}

function Stat({
  label,
  value,
  note,
  accent = false,
}: {
  label: string;
  value: string;
  note?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[rgba(17,29,37,0.9)] p-5 lg:p-6">
      <dt className="label">{label}</dt>
      <dd
        className={`mt-2 flex items-baseline gap-2 font-display text-3xl lg:text-4xl ${accent ? "text-brand" : "text-bone"}`}
      >
        {value}
        {note ? (
          <span className="label !text-status-acknowledged">{note}</span>
        ) : null}
      </dd>
    </div>
  );
}

/** A stylised cardano-init session: the first ten minutes of the hackathon. */
function Terminal() {
  const choices = [
    ["On-chain", "Aiken"],
    ["Off-chain", "MeshJS"],
    ["Devnet", "Yaci DevKit"],
  ] as const;
  return (
    <figure
      aria-label="A cardano-init session scaffolding a DeFi project"
      className="overflow-hidden rounded-md border border-line-bright bg-[#0b141a] shadow-[0_0_80px_-20px_rgba(154,244,123,0.25)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-bright" />
        <span className="label ml-3 !tracking-[0.1em]">~/my-defi-protocol</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-7 text-muted">
        <span className="text-teal">$</span>{" "}
        <span className="text-bone">cardano-init</span>
        {"\n"}
        {choices.map(([role, tool]) => (
          <span key={role}>
            <span className="text-teal">?</span> {role.padEnd(10)}
            <span className="text-bone">› {tool}</span>
            {"\n"}
          </span>
        ))}
        <span className="text-brand">✓</span> Project wired and tested
        {"\n\n"}
        <span className="text-teal">$</span>{" "}
        <span className="text-bone">just test</span>
        {"\n"}
        <span className="text-brand">✓</span> all tests passed
        {"\n\n"}
        <span className="text-teal">$</span>{" "}
        <span
          aria-hidden="true"
          className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-brand"
        />
      </pre>
    </figure>
  );
}

function Ticker() {
  // Two identical halves so the loop is seamless at -50%.
  const items = [...TICKER, ...TICKER];
  return (
    <div className="rule overflow-hidden border-b border-line bg-brand py-3">
      <ul
        aria-label="Hackathon highlights"
        className="flex w-max animate-marquee gap-10 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= TICKER.length || undefined}
            className="label flex items-center gap-10 !text-ink"
          >
            {item}
            <span aria-hidden="true">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PresentedBy() {
  return (
    <section className="border-b border-line bg-ink-raised">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-3 px-6 py-8 text-center lg:px-10">
        <div className="flex items-center gap-4 sm:gap-8">
          <Image
            src="/logo-solid-con-texto-verde.svg"
            alt="alwaystrue"
            width={168}
            height={36}
            className="h-7 w-auto sm:h-9"
          />
          <span aria-hidden="true" className="font-display text-2xl text-muted sm:text-3xl">
            ×
          </span>
          <Image
            src="/logos/iog.svg"
            alt="Input Output"
            width={168}
            height={28}
            className="h-5 w-auto sm:h-7"
          />
        </div>
        <p className="label">Run by alwaystrue · Sponsored by Input Output</p>
      </div>
    </section>
  );
}

function Brief() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
        <p className="label mb-6 !text-teal">The brief</p>
        <h2 className="max-w-[22ch] font-display text-display-sm text-bone md:text-display-md">
          Ship a DeFi dApp or protocol that holds up on mainnet.
        </h2>
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          Any DeFi idea qualifies. These are places to start, not a list to
          choose from.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {IDEAS.map((idea) => (
            <li
              key={idea}
              className="rounded-full border border-line-bright px-4 py-2 text-sm text-bone transition-colors hover:border-brand hover:text-brand"
            >
              {idea}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="rule bg-ink-raised">
      <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="label mb-6 !text-teal">The toolkit</p>
            <h2 className="font-display text-display-sm text-bone md:text-display-md">
              Learn. Scaffold. Compose.
            </h2>
          </div>
          <p className="max-w-measure text-lg leading-relaxed text-muted">
            The hackathon is built on open-source tooling alwaystrue develops
            with Input Output. You learn the foundations, generate a working
            project in minutes, and spend the rest of the time on your idea.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {TOOLKIT.map((tool, i) => (
            <li key={tool.name} className="group relative flex flex-col bg-ink p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand font-mono text-xs text-brand">
                  {i + 1}
                </span>
                <span className="label !text-brand">{tool.step}</span>
                {i < TOOLKIT.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="ml-auto hidden font-mono text-muted md:block"
                  >
                    →
                  </span>
                ) : null}
              </div>
              <h3 className="mt-8 font-display text-3xl text-bone">{tool.name}</h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted">
                {tool.description}
              </p>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 self-start break-all border-b border-line-bright pb-1 font-mono text-xs text-bone transition-colors hover:border-brand hover:text-brand"
              >
                {tool.linkLabel} ↗
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">
          Read how we built them:{" "}
          <Link
            href="/case-studies/cardano-init"
            className="border-b border-line-bright text-bone transition-colors hover:border-brand hover:text-brand"
          >
            cardano-init
          </Link>{" "}
          and{" "}
          <Link
            href="/case-studies/contracts-library"
            className="border-b border-line-bright text-bone transition-colors hover:border-brand hover:text-brand"
          >
            ContractsLibrary
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="rule relative isolate scroll-mt-16 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(154,244,123,0.1)] blur-[120px]"
      />
      <div className="mx-auto max-w-[1180px] px-6 py-20 text-center lg:px-10 lg:py-28">
        <p className="label mb-6 !text-teal">Prize pool</p>
        <p className="font-display text-[5.5rem] leading-none tracking-[-0.04em] text-brand sm:text-[9rem] lg:text-[12rem]">
          {PRIZE_POOL}
        </p>
        <p className="label mt-6">
          {HACKATHON.currency}, funded by {HACKATHON.sponsor}
        </p>
        <ul className="mx-auto mt-14 grid max-w-3xl items-end gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {PRIZES.map((prize, i) => (
            <li
              key={prize.place}
              className={`bg-ink-raised p-6 lg:p-8 ${i === 0 ? "sm:order-2 sm:pb-12 sm:pt-10" : i === 1 ? "sm:order-1" : "sm:order-3"}`}
            >
              <p className={`label ${i === 0 ? "!text-brand" : ""}`}>
                {prize.place} place
              </p>
              <p
                className={`mt-3 font-display ${i === 0 ? "text-5xl text-bone lg:text-6xl" : "text-4xl text-bone"}`}
              >
                {formatUsd(prize.amount)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="rule">
      <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="label mb-6 !text-teal">How it runs</p>
            <h2 className="font-display text-display-sm text-bone md:text-display-md">
              Two conversations, one build.
            </h2>
          </div>
          <p className="max-w-measure text-lg leading-relaxed text-muted">
            Every team talks with the judges at the start and at the end. Both
            interviews count toward your score.
            {HACKATHON.dateConfirmed
              ? null
              : " Dates are provisional; register to hear when they are confirmed."}
          </p>
        </div>

        <ol className="relative mt-14 grid gap-0 border-l border-line-bright pl-8 md:ml-4">
          {SCHEDULE.map((step) => (
            <li key={step.name} className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 ${step.interview ? "border-brand bg-brand shadow-[0_0_16px_rgba(154,244,123,0.6)]" : "border-line-bright bg-ink"}`}
              />
              <div className="grid gap-2 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
                <span className="font-mono text-sm text-bone">{step.when}</span>
                <div>
                  <h3 className="flex flex-wrap items-center gap-3 font-display text-2xl leading-tight text-bone">
                    {step.name}
                    {step.interview ? (
                      <span className="label border border-[rgba(154,244,123,0.5)] px-2 py-0.5 !text-brand">
                        Interview · scored
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-3 max-w-measure text-base leading-relaxed text-muted">
                    {step.summary}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Judging() {
  return (
    <section className="rule bg-ink-raised">
      <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
        <p className="label mb-6 !text-teal">Judging</p>
        <h2 className="max-w-[22ch] font-display text-display-sm text-bone md:text-display-md">
          Judged by people who audit Cardano protocols for a living.
        </h2>
        <p className="mt-8 max-w-measure text-lg leading-relaxed text-muted">
          We read the code and try to break it, the way we review a protocol
          before mainnet. Then we talk to you about it.
        </p>
        <dl className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CRITERIA.map((c, i) => (
            <div key={c.name} className="bg-ink p-6">
              <span className="font-mono text-sm text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="mt-4 font-display text-2xl text-bone">{c.name}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                {c.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="rule">
      <div className="mx-auto max-w-[1180px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label mb-6 !text-teal">FAQ</p>
            <h2 className="font-display text-display-sm text-bone">Questions</h2>
            <p className="mt-6 text-base text-muted">
              Something else?{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="border-b border-line-bright pb-px text-bone transition-colors hover:border-brand hover:text-brand"
              >
                {EMAIL}
              </a>
            </p>
          </div>
          <ul className="border-b border-line">
            {FAQ.map((item) => (
              <li key={item.q} className="rule">
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-2xl leading-tight text-bone transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="font-mono text-base text-teal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-measure text-base leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative isolate overflow-hidden bg-brand">
      <div className="mx-auto max-w-[1180px] px-6 py-24 lg:px-10 lg:py-32">
        <p className="label mb-6 !text-[rgba(17,29,37,0.7)]">
          {HACKATHON.format} · {PRIZE_POOL} in prizes · Free to enter
        </p>
        <h2 className="max-w-[18ch] font-display text-display-sm text-ink md:text-display-md lg:text-display-lg">
          Your DeFi protocol starts with one command.
        </h2>
        <SignUp className="mt-12" inverted />
      </div>
    </section>
  );
}

/** The registration call to action. Falls back to an email update until the form exists. */
function SignUp({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const primary = inverted
    ? "border-ink bg-ink !text-brand"
    : "border-brand bg-brand !text-ink";
  const muted = inverted
    ? "border-[rgba(17,29,37,0.4)] !text-ink"
    : "border-line-bright !text-bone";
  const link = inverted
    ? "border-[rgba(17,29,37,0.4)] !text-ink hover:border-ink"
    : "border-line-bright !text-bone hover:border-brand hover:!text-brand";
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-4 ${className}`}>
      {SIGNUP_URL ? (
        <a
          href={SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`label inline-block border px-6 py-4 transition-opacity hover:opacity-85 ${primary}`}
        >
          Register now →
        </a>
      ) : (
        <>
          <span className={`label inline-block border px-6 py-4 ${muted}`}>
            Registration opens soon
          </span>
          <a
            href={UPDATES_HREF}
            className={`label border-b pb-1 transition-colors ${link}`}
          >
            Email me when it opens
          </a>
        </>
      )}
    </div>
  );
}
