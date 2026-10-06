import { EMAIL } from "@/components/site-header";
import { SocialIcon } from "@/components/social-icons";
import { SOCIAL } from "@/lib/site";

const LINK =
  "label inline-flex items-center gap-2.5 transition-colors hover:text-bone";

export function SiteFooter() {
  return (
    <footer className="rule">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="label">alwaystrue — Cardano smart contract security</p>
        <nav aria-label="alwaystrue elsewhere" className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-7">
          {SOCIAL.map((profile) => (
            <a
              key={profile.href}
              href={profile.href}
              target="_blank"
              rel="me noopener noreferrer"
              className={LINK}
            >
              <SocialIcon name={profile.label} className="size-3.5" />
              {profile.label}
            </a>
          ))}
          <a href={`mailto:${EMAIL}`} className={LINK}>
            <SocialIcon name="Email" className="size-3.5" />
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
