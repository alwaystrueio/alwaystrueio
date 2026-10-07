import type { AuditCaseStudy } from "./types";

const FINAL_COMMIT = "a3ef3895835a19f75ba3f32754e970ee6c3d2dc2";

export const asteria: AuditCaseStudy = {
  slug: "asteria",
  kind: "Security audit",
  title: "Asteria",
  client: { label: "TxPipe", href: "https://txpipe.io" },
  headline:
    "A Cardano bot challenge in which players pilot tokenised ships across an on-chain grid to reach a prize pool.",
  summary:
    "Asteria is a challenge built by TxPipe to showcase the extended UTxO model. Developers write bots that steer a ship across a two-dimensional grid, gathering fuel from pellets scattered across the board and racing to the origin, where the accumulated rewards can be mined. alwaystrue reviewed the protocol's Aiken validators over several weeks in early 2025. The review identified two critical and two major vulnerabilities, the most severe of which allowed an attacker to drain the prize pool and to mint unlimited fuel. The project team resolved every non-informational finding before the report was finalised.",
  facts: [
    { label: "Client", value: "TxPipe", href: "https://txpipe.io" },
    { label: "Language", value: "Aiken" },
    { label: "Scope", value: "6 on-chain files" },
    { label: "Final commit", value: FINAL_COMMIT.slice(0, 7) },
    { label: "Report", value: "28 Mar 2025" },
    { label: "Findings", value: "9" },
  ],
  report: {
    href: "/reports/asteria-audit.pdf",
    meta: "PDF, v1.0.0, 0.6 MB",
  },
  links: [{ label: "asteria.txpipe.io", href: "https://asteria.txpipe.io" }],
  card: {
    body: "A Cardano bot challenge by TxPipe in which players pilot tokenised ships across an on-chain grid to reach a prize pool. The review of its Aiken validators found two critical vulnerabilities that allowed the prize pool to be drained, both resolved during the engagement.",
    facts: ["Aiken"],
  },

  system: {
    paragraphs: [
      "Asteria is a Cardano challenge in which developers participate by building bots: off-chain processes that control particular UTxOs constrained by on-chain validators. Each bot pilots a spaceship across a two-dimensional grid. The goal is to reach the coordinates (0, 0), where the challenge rewards can be claimed. A maximum speed and a fuel resource constrain movement. Fuel is freely available at fixed coordinates on the grid, and a ship can gather it whenever their positions overlap.",
      "Each game has a single Asteria UTxO, which locks the ADA paid by every player when creating a ship, and several Pellet UTxOs holding fuel. Each player has one Ship UTxO. An admin token deposited in the Asteria UTxO identifies the valid game state and parameterises the Asteria, Pellet, and Spacetime validators, so that separate instances of the game can run with different tokens and settings. Each ship is identified by a ship token minted by the shipyard policy, and its owner holds a matching pilot token.",
    ],
    glossary: {
      label: "Game objects",
      items: [
        {
          name: "Ship UTxO",
          description:
            "One per player. Holds the ship's position, its fuel tokens, and the timestamp of its last move. Consumed and re-created every time the ship moves, gathers fuel, or mines Asteria.",
        },
        {
          name: "Pellet UTxO",
          description:
            "Locks fuel tokens, and optionally prize tokens, at a fixed position. Ships with the same coordinates draw fuel from it. Created by the admin before or during a game.",
        },
        {
          name: "Asteria UTxO",
          description:
            "The single UTxO at the origin holding the prize pool. It records how many ships have joined and governs how rewards are claimed by a ship that reaches it.",
        },
        {
          name: "Admin token",
          description:
            "Identifies the Asteria UTxO and parameterises every validator. Whoever holds one can consume the Asteria UTxO or create pellets, so its custody defines who must be trusted.",
        },
      ],
    },
  },

  scope: {
    paragraphs: [
      "The audit covered the on-chain validators only. Off-chain code, including the bots and the game's indexers, and the test suite were out of scope, and the report makes no claim about them. Each audited file is identified in the report by its SHA-256 hash, and the final state of the code for the purposes of the report is the commit recorded above.",
      "The review began with a thorough examination of the validators and their documentation. The team then worked to steal from, manipulate, and break the protocol using that knowledge, considering vulnerabilities both common to eUTxO systems and specific to this design: interactions between the three validators, extraction of value from the prize pool and the pellets, and disruption of other players.",
    ],
    files: [
      "onchain/src/validators/asteria.ak",
      "onchain/src/validators/spacetime.ak",
      "onchain/src/validators/pellet.ak",
      "onchain/src/validators/deploy.ak",
      "onchain/src/lib/asteria/types.ak",
      "onchain/src/lib/asteria/utils.ak",
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
      "Findings are numbered by severity. Each is delivered with a description, a recommendation, and the commit in which it was resolved. Every critical and major finding was resolved during the engagement; the two acknowledged findings are informational and were deferred by the project team.",
    tally: [
      { severity: "Critical", count: 2 },
      { severity: "Major", count: 2 },
      { severity: "Minor", count: 0 },
      { severity: "Info", count: 5 },
    ],
    resolved: 7,
    acknowledged: 2,
    highlights: [
      {
        id: "AST-001",
        title: "Leaking admin tokens",
        severity: "Critical",
        status: "Resolved",
        summary:
          "The Asteria and Pellet UTxOs each had to carry at least one admin token, but nothing stopped them carrying more. Any surplus token could be sent to a player's wallet during an ordinary transaction, and a single leaked admin token is enough to consume the Asteria UTxO and take the entire prize pool.",
      },
      {
        id: "AST-002",
        title: "Pirate ships",
        severity: "Critical",
        status: "Resolved",
        summary:
          "The mine and gather-fuel transactions checked only that a ship's token came from the shipyard policy, not that it was a ship token rather than a pilot token. A player could lock their pilot token at the ship address to forge a ship at any position, mine the prize pool repeatedly, drain every pellet, and quit with the prize tokens.",
      },
      {
        id: "AST-101",
        title: "Fuel tokens, fuel tokens everywhere",
        severity: "Major",
        status: "Resolved",
        summary:
          "The fuel minting policy required an admin token among the inputs but did not care where it came from. By joining the game without running the shipyard policy, a player could thread the Asteria UTxO's admin token through the transaction and mint unlimited fuel to their own wallet. A prior fix by the team kept this from reaching ships, which held it below critical.",
      },
      {
        id: "AST-102",
        title: "No presents this Christmas",
        severity: "Major",
        status: "Resolved",
        summary:
          "When a ship gathered fuel, the validator required the pellet's remaining value to match its previous value exactly, apart from the fuel taken. That made it impossible to remove anything else, so the prize tokens the admin placed in pellets could never be collected.",
      },
      {
        id: "AST-304",
        title: "That's not my ship",
        severity: "Info",
        status: "Acknowledged",
        summary:
          "The shipyard policy numbers each ship token to keep it unique, but the ship's datum already carries the unique pilot token name. The code that enforces ship token uniqueness is therefore unnecessary and could be removed. The project team chose to keep it.",
      },
    ],
  },

  assessment: {
    intro:
      "Beyond individual findings, the report examines where control is concentrated in the protocol, what a malicious party in that position could do, and what players are being asked to trust.",
    items: [
      {
        title: "Control of the admin tokens",
        body: "The minting of admin tokens sits outside the protocol, and the validators keep no record of how many exist. An admin who retains or mints additional tokens before, during, or after a game could consume the Asteria UTxO and take the rewards, manipulate pellets so that a chosen player wins, or block players' transactions by altering datums. Minor changes to the protocol could make the game immutable once deployed, even to its admin. TxPipe chose to keep the current design and to rely on off-chain proofs to address players' concerns where needed.",
        verdict:
          "As a player, one has to understand that trust in the admin is almost mandatory. The audit team recommends a mitigation that requires no protocol change: mint admin tokens under a policy with a fixed maximum, mint them all before the game starts, and lock every one in the Asteria and Pellet UTxOs, so that players can verify off-chain that none remains in a wallet.",
      },
    ],
  },

  outcome: {
    paragraphs: [
      "Both critical findings and both major findings were resolved during the engagement, along with three of the five informational findings. The project team was responsive throughout. Along the way the most heavily used validator was slimmed down by moving checks into the validators that always run alongside it, redundant credential checks were removed, and a confusing custom type was replaced with its standard-library equivalent.",
      "Three recommendations were left with the team for operating the game.",
    ],
    recommendations: [
      "Avoid locking admin tokens in Pellet UTxOs. It is no longer necessary and only widens the surface through which these tokens could be obtained.",
      "Secure every admin token not locked by the protocol, including tokens from past games that could be reused against a new instance.",
      "Mint a fresh admin token for each instance of the game, so that two instances never share the same validator parameters.",
    ],
  },
};
