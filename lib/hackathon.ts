/**
 * Everything on /hackathon that is still being decided lives here, so the page
 * layout never needs editing when a date or a prize split changes.
 */

/**
 * The external sign-up form (Google Forms, Tally, Typeform...). While this is
 * null the page shows "Registration opens soon" and offers an email update.
 */
export const SIGNUP_URL: string | null = null;

export const HACKATHON = {
  name: "alwaystrue Hackathon",
  edition: "2026",
  /** Shown wherever the date appears until it is confirmed. */
  date: "30 November 2026",
  shortDate: "30 Nov",
  dateConfirmed: false,
  format: "Online",
  sponsor: "IOG",
  prizePool: 20_000,
  currency: "USD",
} as const;

export const PRIZES = [
  { place: "1st", amount: 10_000 },
  { place: "2nd", amount: 6_000 },
  { place: "3rd", amount: 4_000 },
] as const;

/** The three tools the hackathon is built around, in the order a participant meets them. */
export const TOOLKIT = [
  {
    step: "Learn",
    name: "Developer Portal",
    description:
      "Start with the onboarding on the Cardano Developer Portal: the extended UTxO model, validators, transactions, and the tools that build them.",
    href: "https://developers.cardano.org",
    linkLabel: "developers.cardano.org",
  },
  {
    step: "Scaffold",
    name: "cardano-init",
    description:
      "One command generates a complete protocol monorepo, on-chain, off-chain and a local devnet, already wired together and passing its tests.",
    href: "https://github.com/input-output-hk/cardano-init",
    linkLabel: "input-output-hk/cardano-init",
  },
  {
    step: "Compose",
    name: "ContractsLibrary",
    description:
      "Standardised, reusable contracts with off-chain builders and specifications. Deploy them, compose them, or fork them instead of starting from zero.",
    href: "https://github.com/input-output-hk/contracts-library",
    linkLabel: "input-output-hk/contracts-library",
  },
] as const;

/** Directions to start from. Any DeFi dApp or protocol qualifies. */
export const IDEAS = [
  "DEXs and AMMs",
  "Lending and borrowing",
  "Stablecoins",
  "Token launches and vesting",
  "DAO treasuries",
  "Multisig smart wallets",
  "Yield and staking",
  "Payments and escrow",
] as const;

export const SCHEDULE = [
  {
    when: "November",
    name: "Registration opens",
    summary: "Sign up alone or as a team. You can register right up to kickoff.",
    interview: false,
  },
  {
    when: HACKATHON.shortDate,
    name: "Kickoff and first interview",
    summary:
      "Opening session online. Each team then has a short call with the judges about what they plan to build and why. It counts toward the final score.",
    interview: true,
  },
  {
    when: "TBC",
    name: "Build",
    summary:
      "Work through the Developer Portal onboarding, scaffold with cardano-init, and build on ContractsLibrary, with mentors on hand.",
    interview: false,
  },
  {
    when: "TBC",
    name: "Submission and final interview",
    summary:
      "Submit a public repository, a short demo video and a README. Then walk the judges through what you built, what changed and what you learned.",
    interview: true,
  },
  {
    when: "TBC",
    name: "Winners announced",
    summary: "Judges review every submission and the winners are announced live.",
    interview: false,
  },
] as const;

export const CRITERIA = [
  {
    name: "Correctness",
    description: "Does it do what it claims, including when someone tries to break it?",
  },
  {
    name: "Use of the toolkit",
    description:
      "How well the project builds on cardano-init and ContractsLibrary, rather than around them.",
  },
  {
    name: "DeFi value",
    description: "Would real users or protocols reach for this after the hackathon?",
  },
  {
    name: "Interviews",
    description:
      "The kickoff and final calls: how clearly you reason about your design, and how far you came.",
  },
] as const;

export const FAQ = [
  {
    q: "Who can take part?",
    a: "Anyone. Students, independent developers and teams from existing companies are all welcome. You do not need prior Cardano experience: the Developer Portal onboarding is part of the hackathon.",
  },
  {
    q: "Where does it happen?",
    a: "Online. Kickoff, mentoring, interviews and the final announcement all run remotely, so you can take part from anywhere.",
  },
  {
    q: "What are the interviews?",
    a: "Two short video calls with the judges, one at kickoff and one after you submit. They are part of the judging, and they are conversations, not exams: we want to hear how you think.",
  },
  {
    q: "Do I have to use cardano-init and ContractsLibrary?",
    a: "The hackathon is built around them, and how well you use them is one of the judging criteria. You can add any other open-source library you like.",
  },
  {
    q: "How big can a team be?",
    a: "Between one and four people. You can sign up alone and find a team at kickoff.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Participation is free.",
  },
  {
    q: "Who owns what I build?",
    a: "You do. Submissions must be open source so judges can review them, under a license of your choice.",
  },
] as const;

export const formatUsd = (amount: number) =>
  `$${amount.toLocaleString("en-US")}`;
