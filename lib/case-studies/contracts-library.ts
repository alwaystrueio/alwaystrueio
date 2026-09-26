import type { OpenSourceCaseStudy } from "./types";

const REPO = "https://github.com/input-output-hk/contracts-library";

export const contractsLibrary: OpenSourceCaseStudy = {
  slug: "contracts-library",
  kind: "Open source",
  title: "ContractsLibrary",
  client: { label: "Input Output", href: "https://iohk.io" },
  headline:
    "A library of standardised, reusable smart contracts for Cardano, shipped with off-chain builders, specifications, and machine-checked proofs.",
  summary:
    "Input Output engaged alwaystrue to own and deliver ContractsLibrary, Cardano's counterpart to OpenZeppelin: complete, use-case-level contracts that teams can deploy, compose, or fork instead of re-implementing the same primitives, and re-incurring the same design and security risk, on every project. Each contract ships as an Aiken on-chain module, off-chain transaction builders in MeshJS and Tx3, an implementation-independent specification, and Lean 4 proofs about that specification. The work runs across four milestones between July and November 2026 and delivers five contracts to a defined ready-to-audit bar.",
  facts: [
    { label: "Client", value: "Input Output", href: "https://iohk.io" },
    { label: "Languages", value: "Aiken, Lean 4" },
    { label: "License", value: "Apache 2.0" },
    { label: "Started", value: "July 2026" },
    { label: "Delivery", value: "November 2026" },
    { label: "Status", value: "In progress" },
  ],
  links: [],
  repo: { label: "View on GitHub", href: REPO },
  card: {
    body: "Cardano's counterpart to OpenZeppelin: complete, reusable contracts shipped as on-chain code, off-chain builders, a specification, and machine-checked proofs. alwaystrue owns the project for Input Output, delivering five contracts to a ready-to-audit bar by November 2026.",
    facts: ["Aiken", "Lean 4", "Apache 2.0"],
  },

  deliverables: {
    intro:
      "Input Output's developer experience team set the goal. alwaystrue owns the product definition, the architecture, the implementation, and the delivery schedule, and works in the open on a public repository under the Apache 2.0 licence.",
    items: [
      {
        name: "Product definition and scoping",
        description:
          "A product requirements document, a composability architecture that every contract must follow, and a public catalogue in which more than thirty candidate contracts are explored and triaged into build now, later, or never, with the reason for each decision recorded.",
      },
      {
        name: "Five contracts to a ready-to-audit bar",
        description:
          "Each with parameterised Aiken logic and a reference validator, unit and property tests covering adversarial cases, two off-chain implementations with end-to-end tests, and a written specification with a threat model. Settings management, upgradeability, a DAO, a CIP-113 event-triggered asset standard, and a multisig smart wallet form the selected slate. Linear vesting was built first to exercise the architecture end to end.",
      },
      {
        name: "Formal proofs of the specifications",
        description:
          "Lean 4 proofs, discharged through Input Output's Lean-Blaster SMT backend, that the compiled validator accepts every transaction the specification permits and rejects every one it forbids, including double-satisfaction attempts. The proofs are about the specification, not any one implementation.",
      },
      {
        name: "Documentation and consolidation",
        description:
          "Specification, design, and usage guides for each contract, contributions to the Cardano Developer Portal, and a consolidated handover at the end of the final milestone.",
      },
    ],
  },

  problem: {
    paragraphs: [
      "The EVM ecosystem matured in part because OpenZeppelin gave developers vetted, reusable contracts. Cardano has had no equivalent. Teams re-implement the same primitives on each project, vesting, escrow, token standards, governance, and re-incur the same design and security risk each time.",
      "Existing Cardano libraries such as Vodka and Anastasia Labs' design patterns operate at a lower level: on-chain utility functions and generic patterns. ContractsLibrary operates at the use-case level, shipping complete contracts with both their on-chain and off-chain halves, and builds on those libraries rather than replacing them. It is a fully open-source public good.",
    ],
  },

  anatomy: {
    label: "Anatomy of a contract",
    items: [
      {
        name: "On-chain",
        description:
          "Aiken validation logic the ledger enforces, and the only part that carries security. Shipped as parameterised library functions that other contracts can import, plus a ready-to-deploy reference validator.",
      },
      {
        name: "Off-chain",
        description:
          "Transaction builders for every action the contract supports, in MeshJS and Tx3, so a developer can use the contract without reading the on-chain code or reasoning about transaction shape.",
      },
      {
        name: "Specification",
        description:
          "An implementation-independent description of the contract's actions, state model, invariants, and threat model. It is the source of truth: an implementation is correct insofar as it matches the specification, not the existing code.",
      },
      {
        name: "Formal proofs",
        description:
          "Machine-checked Lean 4 proofs about the specification, covering completeness, soundness, and robustness. Every theorem cites the section of the specification it discharges.",
      },
    ],
  },

  approach: {
    intro: "Three principles decide every trade-off in the library.",
    items: [
      {
        name: "Validators must compose",
        description:
          "A Cardano validator is a predicate over the whole transaction, so an assumption one validator makes about transaction shape can break another validator sharing that transaction. Library validators assert only properties of their own UTxOs, their authorisation, and related UTxOs. They never assert the total number of inputs or outputs, the total value moved, or the exact set of signatories.",
      },
      {
        name: "Use, compose, or fork",
        description:
          "Every contract supports three levels of adoption. Supply parameters to a finished contract and ship it. Import its validation functions and off-chain helpers to build something new. Or copy its modules and modify them.",
      },
      {
        name: "Developer experience over cost, security over everything",
        description:
          "Where a trade-off is unavoidable, the library favours ease of use over execution cost, speed, and even composability. Security is never traded.",
      },
    ],
  },

  status: {
    intro:
      "Delivery is organised in four milestones. The selection of contracts is not fixed in advance: the committed set of five emerges from public exploration and triage on the repository's tracking issue.",
    milestones: [
      {
        name: "Onboarding and scoping",
        when: "July 2026",
        state: "Delivered",
        summary:
          "Product requirements, the composability architecture, and a prioritised candidate list agreed with Input Output's developer experience team.",
      },
      {
        name: "Contracts 1 and 2",
        when: "July to August 2026",
        state: "Delivered",
        summary:
          "Specifications, Aiken implementations, MeshJS and Tx3 builders, tests, and design and usage documentation for the first two contracts.",
      },
      {
        name: "Contracts 3 and 4",
        when: "August to October 2026",
        state: "In progress",
        summary: "The same deliverables for the next two contracts.",
      },
      {
        name: "Contract 5 and consolidation",
        when: "October to November 2026",
        state: "Planned",
        summary:
          "The fifth contract, consolidated documentation across the library, and handover.",
      },
    ],
  },
};
