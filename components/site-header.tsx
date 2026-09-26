import Image from "next/image";
import Link from "next/link";

export const EMAIL = "contact@alwaystrue.io";

/**
 * Header shared by every page. Section links are root-relative so they work
 * from the landing page and from any subpage alike.
 */
export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-6 lg:px-10">
      <Link href="/" aria-label="alwaystrue home" className="shrink-0">
        <Image
          src="/logo-solid-con-texto-verde.svg"
          alt="alwaystrue"
          width={150}
          height={32}
          priority
        />
      </Link>
      <nav className="flex items-center gap-7">
        <Link
          href="/#practices"
          className="label hidden transition-colors hover:text-bone sm:block"
        >
          Practices
        </Link>
        <Link
          href="/#case-studies"
          className="label hidden transition-colors hover:text-bone sm:block"
        >
          Case studies
        </Link>
        <a
          href={`mailto:${EMAIL}`}
          className="label border border-line-bright px-4 py-2.5 !text-bone transition-colors hover:border-brand hover:!text-brand"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
