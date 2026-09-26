import { EMAIL } from "@/components/site-header";

export function SiteFooter() {
  return (
    <footer className="rule">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="label">alwaystrue — Cardano smart contract security</p>
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
  );
}
