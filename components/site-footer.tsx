import { EMAIL } from "@/components/site-header";
import { SOCIAL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="rule">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="label">alwaystrue — Cardano smart contract security</p>
        <nav aria-label="alwaystrue elsewhere" className="flex flex-wrap gap-x-7 gap-y-3">
          {SOCIAL.map((profile) => (
            <a
              key={profile.href}
              href={profile.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="label transition-colors hover:text-bone"
            >
              {profile.label}
            </a>
          ))}
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
