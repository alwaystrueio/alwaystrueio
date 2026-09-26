import type { OpenSourceCaseStudy } from "./types";

const REPO = "https://github.com/input-output-hk/cardano-init";

export const cardanoInit: OpenSourceCaseStudy = {
  slug: "cardano-init",
  kind: "Open source",
  title: "cardano-init",
  client: { label: "Input Output", href: "https://iohk.io" },
  headline:
    "A command-line tool that takes a developer from nothing to a running, tested Cardano protocol in one command.",
  summary:
    "Input Output engaged alwaystrue to own and deliver cardano-init as part of its Developer Experience initiative. The developer picks a tool for each role a protocol needs, on-chain, off-chain, devnet, infrastructure, and formal methods, and cardano-init generates a monorepo in which every component is already wired together and a worked example builds and passes its tests immediately. It is written in Rust, ships prebuilt binaries for Linux, macOS, and Windows, and is designed from the start to be driven by coding agents as well as people.",
  facts: [
    { label: "Client", value: "Input Output", href: "https://iohk.io" },
    { label: "Language", value: "Rust" },
    { label: "License", value: "Apache 2.0" },
    { label: "Release", value: "v0.2.1, Aug 2026" },
    { label: "Registry", value: "15 tools, 5 roles" },
    { label: "Status", value: "RC due Nov 2026" },
  ],
  links: [],
  repo: { label: "View on GitHub", href: REPO },
  card: {
    body: "A command-line tool that scaffolds a complete, wired-together Cardano protocol monorepo in one command, with a worked example that builds and passes its tests out of the box. alwaystrue owns the project for Input Output's Developer Experience initiative.",
    facts: ["Rust", "Apache 2.0", "v0.2.1"],
  },

  deliverables: {
    intro:
      "cardano-init is one of the Developer Experience initiative's milestones. alwaystrue owns the product requirements, the architecture, the implementation, the releases, and the documentation, and integrates the templates of the ecosystem tools the registry carries.",
    items: [
      {
        name: "Specification and proof of concept",
        description:
          "A product requirements document, a system architecture, a technical specification of the interface contract, a contributor guide for adding tools, and a working tool covering all five roles, delivered for community and key-player review in August 2026.",
      },
      {
        name: "The tool",
        description:
          "A Rust command-line application with an interactive guided mode and a deterministic one-shot mode, a dependency doctor that detects missing toolchains and names the exact installer to run, dry runs, and compatibility checks that stop before generating a stack whose parts cannot reach each other.",
      },
      {
        name: "A registry of fifteen tools",
        description:
          "Aiken, Scalus, and Plinth for on-chain code. MeshJS, Scalus, Evolution SDK, and Tx3 for off-chain. Yaci DevKit as a local devnet. Kupo, Ogmios, Dolos, Tx Submit API, Cardano Node, Cardano Node API, and Dingo as infrastructure, provisioned through cardano-up. Lean-Blaster, flagged experimental, for formal methods. Adding a tool is a data change, not a code change.",
      },
      {
        name: "Releases and distribution",
        description:
          "Prebuilt binaries for Linux, macOS, and Windows on x86-64 and ARM64, shell and PowerShell installers, an npm package, a Nix flake, and a documented release process for the team that inherits the project. Three releases have shipped since July 2026.",
      },
    ],
  },

  problem: {
    paragraphs: [
      "Two distinct problems stop people from starting a Cardano protocol. The first is wiring. Individual tools ship their own initialisers, but nothing connects across roles. Joining an on-chain validator to an off-chain transaction builder, the builder to a local chain, and both to build commands and environment variables is undifferentiated work that has to be redone for every new combination of tools.",
      "The second is that the landscape is opaque to newcomers. A developer arriving at Cardano must work out which tool writes validators, which builds transactions, which indexes the chain, and which of these actually work together, and the cost of a wrong early choice is high. A newcomer's first impression of the ecosystem is formed at exactly this point.",
    ],
  },

  anatomy: {
    label: "What a generated project contains",
    items: [
      {
        name: "on-chain/",
        description:
          "Validators in the chosen language. Emits the CIP-57 blueprint at a canonical path that the rest of the project reads.",
      },
      {
        name: "off-chain/",
        description:
          "Transaction building and submission against the blueprint, connecting to whichever local endpoint the devnet or infrastructure component provisioned.",
      },
      {
        name: "devnet/ and infra/",
        description:
          "A throwaway local chain for integration tests, and indexers, node providers, and chain followers, each writing standard connection variables to the shared environment file.",
      },
      {
        name: "Justfile, .env, blueprint/, AGENTS.md",
        description:
          "The base layer that wires the components together: standard build, test, and clean tasks, the shared environment, the blueprint seam, and a brief that tells a coding agent what the project is and what to do next.",
      },
    ],
  },

  approach: {
    intro:
      "The defining decision is an interface contract between components rather than integration code between pairs of tools.",
    items: [
      {
        name: "Components talk to a contract, not to each other",
        description:
          "Every on-chain tool emits its blueprint at the same path. Whatever provisions a local endpoint writes the same environment variables. Consumers read those two seams and degrade gracefully when they are blank. Any on-chain tool therefore composes with any off-chain tool without per-pair code, and the integration problem stops growing with the square of the number of tools.",
      },
      {
        name: "One worked example everywhere",
        description:
          "Every template implements the same gift card scenario: a one-shot minting policy gated by a specific UTxO, and a validator that releases a locked gift when the token is burned. Because all tools share the scenario and its parameter interface, a generated project runs end to end, and an Aiken contract can be driven by the Scalus off-chain code or the reverse.",
      },
      {
        name: "Coding agents are a first-class user",
        description:
          "Every command has machine-readable JSON output and error codes, the registry can be dumped for an agent to read before composing a command, output is deterministic, and every generated project carries an agent brief. Newcomers are the other primary user, so explanation wins over terseness and sane defaults over open-ended choice.",
      },
      {
        name: "Whatever ships must work",
        description:
          "Continuous integration scaffolds each template in isolation and runs its build and tests with the toolchains present. A tool that does not build green does not enter the registry, or ships flagged experimental and gated behind an explicit flag.",
      },
    ],
  },

  status: {
    intro:
      "The work is anchored on two milestones of Input Output's Developer Experience initiative.",
    milestones: [
      {
        name: "Specifications and proof of concept",
        when: "August 2026",
        state: "Delivered",
        summary:
          "All five roles present and generating, four of them building green, with the specifications, architecture, and integration strategy shown to the community and key players for feedback.",
      },
      {
        name: "Release candidate",
        when: "Due November 2026",
        state: "In progress",
        summary:
          "A public release candidate that builds green on a reduced stack, with documentation, hardened continuous integration, and dependency installation as a nice-to-have.",
      },
      {
        name: "General availability",
        when: "After November 2026",
        state: "Planned",
        summary:
          "Stabilise the release candidate, widen the supported stack, and promote automatic dependency installation to a supported feature.",
      },
    ],
  },
};
