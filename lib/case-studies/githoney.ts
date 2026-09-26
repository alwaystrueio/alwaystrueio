import type { AuditCaseStudy } from "./types";

const FINAL_COMMIT = "8118116c0f7873aa85c8a596aefe481af5508e83";

export const githoney: AuditCaseStudy = {
  slug: "githoney",
  kind: "Security audit",
  title: "GitHoney",
  client: { label: "TxPipe", href: "https://txpipe.io" },
  headline:
    "An on-chain bounty protocol that pays open-source contributors through Cardano smart contracts.",
  summary:
    "GitHoney lets a repository maintainer attach a bounty to a GitHub issue, lock the reward in a validator, and release it to the contributor whose pull request is merged. alwaystrue reviewed the protocol's Aiken validators over several weeks in 2025. The review identified three critical and one major vulnerability, the most severe of which allowed an attacker to steal bounty rewards and to avoid protocol fees. The project team resolved every non-enhancement finding before the report was finalised.",
  facts: [
    { label: "Client", value: "TxPipe", href: "https://txpipe.io" },
    { label: "Language", value: "Aiken" },
    { label: "Scope", value: "5 on-chain files" },
    { label: "Final commit", value: FINAL_COMMIT.slice(0, 7) },
    { label: "Report", value: "29 May 2025" },
    { label: "Findings", value: "21" },
  ],
  report: {
    href: "/reports/githoney-audit.pdf",
    meta: "PDF, v1.0.0, 0.5 MB",
  },
  links: [{ label: "githoney.io", href: "https://githoney.io" }],
  card: {
    body: "A bounty protocol that pays open-source contributors through Cardano smart contracts, built by TxPipe. The review of its Aiken validators found three critical vulnerabilities, including one that allowed bounty rewards to be stolen, all resolved before release.",
    facts: ["Aiken", "5 on-chain files", "May 2025"],
  },

  system: {
    paragraphs: [
      "GitHoney is a bounty management system for open-source software development. It operates as a bot inside GitHub, interacting with users through issues, pull requests, and comments, and it is responsible for deploying the on-chain contracts and monitoring every interaction with them. A maintainer creates a bounty on an issue. A contributor accepts it and eventually links it to a pull request. Once the pull request is reviewed and merged, the contributor claims the reward.",
      "The protocol implemented by the audited files describes only the on-chain contracts and their interactions: a single Settings UTxO per protocol instance, holding the fee schedule and the bounty validator itself, and one Bounty UTxO per bounty, holding the reward assets and a datum that records the parties, the deadline, and whether the bounty has been merged. Four validators govern them, together with two optional badge contracts that sit outside the protocol.",
    ],
    glossary: {
      label: "Roles",
      items: [
        {
          name: "Maintainer",
          description:
            "Maintains a repository and has a task that requires completion within a deadline. Creates and funds the bounty.",
        },
        {
          name: "Contributor",
          description:
            "Completes the task by submitting a pull request, and claims the reward once the bounty is merged.",
        },
        {
          name: "Admin",
          description:
            "Acts as an oracle of the work done. Confirms the contributor's payment by merging the bounty, or reclaims the deposited assets for the maintainer by closing it.",
        },
        {
          name: "GitHoney",
          description:
            "Manages the protocol instance and its settings: the fee-receiving address, the bounty creation fee, and the bounty reward fee.",
        },
      ],
    },
  },

  scope: {
    paragraphs: [
      "The audit covered the on-chain validators only. Off-chain code and the test suite were out of scope, and the report makes no claim about them. Each audited file is identified in the report by its SHA-256 hash, and the final state of the code for the purposes of the report is the commit recorded above.",
      "The review began with a thorough examination of the validators and their documentation. The team then worked to steal from, manipulate, and break the protocol using that knowledge, considering vulnerabilities both common to eUTxO systems and specific to this design: interactions between contracts, extraction of value, disruption to other users, and other attack vectors.",
    ],
    files: [
      "onchain/validators/githoney_contract.ak",
      "onchain/lib/checks.ak",
      "onchain/lib/types.ak",
      "onchain/lib/utils.ak",
      "onchain/lib/validations.ak",
    ],
    process: [
      "The audit team shares a description of the finding and a recommended resolution.",
      "The project team acknowledges the finding and, where it decides to resolve it, opens a pull request with a fix.",
      "The audit team reviews the fix and either returns feedback or recommends it for merging.",
      "The project team merges the fix and the audit team updates the report.",
      "The audit team continues the review against the changed code.",
    ],
  },

  findings: {
    intro:
      "Findings are numbered by severity. Each is delivered with a description, a recommendation, and the commit in which it was resolved. Every finding below Enhancement was resolved during the engagement; the one acknowledged finding is an enhancement the project team chose to defer.",
    tally: [
      { severity: "Critical", count: 3 },
      { severity: "Major", count: 1 },
      { severity: "Minor", count: 0 },
      { severity: "Enhancement", count: 12 },
      { severity: "Info", count: 5 },
    ],
    resolved: 20,
    acknowledged: 1,
    highlights: [
      {
        id: "GH-001",
        title: "Multiple bounty satisfaction",
        severity: "Critical",
        status: "Resolved",
        summary:
          "A bounty's identity rested on the name of its BountyId token, but the protocol never enforced that names were unique. Two bounties sharing a name could be consumed in one transaction and re-created as the larger of the two, stealing the rest. Anyone could also mint a duplicate token to release a BountyId to their own wallet and forge bounties with arbitrary values and datums.",
      },
      {
        id: "GH-002",
        title: "Resin instead of honey",
        severity: "Critical",
        status: "Resolved",
        summary:
          "The check that a bounty carried a reward accepted any non-zero value. A worthless dummy token satisfied it, so a bounty could be created while locking less than the minimum 3 ADA the protocol requires.",
      },
      {
        id: "GH-003",
        title: "Fatal exception on initialization",
        severity: "Critical",
        status: "Resolved",
        summary:
          "A fix for an informational finding sent the Settings NFT to an address whose default spending validator always fails. Had it shipped, the team deploying the protocol could never have spent the NFT, and no instance of the protocol could have been initialised.",
      },
      {
        id: "GH-101",
        title: "Honey-lock",
        severity: "Major",
        status: "Resolved",
        summary:
          "The bounty minting policy demanded the Settings UTxO on both its mint and burn paths. Had GitHoney ever deleted the settings, contributors could no longer have burned their BountyId tokens, and rewards on already-merged bounties would have been locked permanently.",
      },
      {
        id: "GH-301",
        title: "Claim on merge",
        severity: "Enhancement",
        status: "Acknowledged",
        summary:
          "Merging a bounty and claiming it are two transactions where one would do. Paying the contributor within the merge transaction would remove a transaction, a datum field, and a proportion of the protocol's cost and attack surface. The project team chose not to adopt this change in the audited release.",
      },
    ],
  },

  assessment: {
    intro:
      "Beyond individual findings, the report examines where control is concentrated in the protocol, what a malicious party in each position could do, and whether the honest parties could still recover the value they had locked.",
    items: [
      {
        title: "GitHoney's control over the protocol",
        body: "By controlling the Settings UTxO, GitHoney can change the fee schedule at any time or halt the protocol by deleting the settings altogether. Fee changes carry little risk: existing bounties record their reward fee in their own datum, and maintainers may simply stop creating bounties. Deletion is more serious, but the close and claim transactions do not depend on the settings, so merged bounties remain claimable and unmerged ones remain closable even after the settings are gone.",
        verdict:
          "The audit team considers GitHoney's control over the protocol not only acceptable but an example for decentralised protocols: the worst case, a malicious operator, still allows the honest parties to recover the value locked by the protocol.",
      },
      {
        title: "The Admin's control over bounties and rewards",
        body: "The Admin is the only actor able to merge or close a bounty, and has discretion over where rewards added after creation are sent. An Admin could therefore decline to merge a bounty that was in fact merged on GitHub, decline to close one that was in fact abandoned, or direct the extra rewards to themselves.",
        verdict:
          "The audit team considers the Admin's control too high for a trustless interaction: both the maintainer and the contributor must trust the Admin. Given that the Admin must decide whether a pull request solves an issue, current technical limitations prevent a fully trustless design. Multi-signature Admin wallets are recommended as a mitigation.",
      },
    ],
  },

  outcome: {
    paragraphs: [
      "All three critical findings and the major finding were resolved during the engagement, along with every informational finding and eleven of the twelve enhancements. The project team was responsive throughout, and the code that reached the final commit was materially smaller, faster, and easier to reason about than the code first submitted for review: redundant checks were removed, expensive value comparisons were replaced with direct lovelace comparisons, and custom types were replaced with their standard-library equivalents.",
      "Two recommendations were left with the team for the next release.",
    ],
    recommendations: [
      "Resolve GH-301 by paying the contributor within the merge transaction and removing the separate claim transaction.",
      "Explore ways to reduce the trust that maintainers and contributors must place in the Admin.",
    ],
  },
};
