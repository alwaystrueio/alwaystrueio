import Link from "next/link";
import { HACKATHON, formatUsd } from "@/lib/hackathon";

/** Slim announcement bar above the header, pointing to /hackathon. */
export function HackathonBanner() {
  return (
    <Link
      href="/hackathon"
      className="group block border-b border-[rgba(154,244,123,0.25)] bg-[rgba(154,244,123,0.08)] transition-colors hover:bg-[rgba(154,244,123,0.14)]"
    >
      <p className="mx-auto flex max-w-[1180px] items-center justify-center gap-x-3 px-6 py-2.5 text-center text-sm text-bone lg:px-10">
        <span className="label hidden shrink-0 items-center gap-2 !text-brand sm:inline-flex">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand"
          />
          New
        </span>
        <span>
          <span className="hidden sm:inline">
            {HACKATHON.format} hackathon:{" "}
          </span>
          Build DeFi on Cardano for{" "}
          <span className="text-brand">
            {formatUsd(HACKATHON.prizePool)} in prizes
          </span>
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-brand transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
}
