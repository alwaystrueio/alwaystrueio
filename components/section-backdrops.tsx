import styles from "./section-backdrops.module.css";

/**
 * Decorative backdrops for the landing page sections below the hero. Both are
 * aria-hidden and sit behind their section's content, which must be an
 * `isolate`d stacking context so the -z-10 stays inside it.
 */

/** Oversized outlined index number behind a practice in the list. */
export function ServiceNumeral({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.numeral} pointer-events-none absolute right-0 top-8 -z-10 select-none font-display leading-[0.8] lg:top-12`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

/** A slowly turning audit seal behind the closing call to action. */
export function AuditSeal() {
  return (
    <div
      aria-hidden="true"
      // On phones only an arc shows in the bottom-right corner, clear of the copy.
      className="pointer-events-none absolute -bottom-[340px] -right-[340px] -z-10 size-[560px] md:bottom-auto md:right-[4%] md:top-1/2 md:-translate-y-1/2"
    >
      <svg viewBox="0 0 200 200" className={`${styles.seal} size-full`}>
        <defs>
          <path
            id="seal-ring"
            d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
          />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.25"
          strokeDasharray="0.6 2.4"
        />
        <g className={styles.ring}>
          {/* Letter-spacing is measured so the phrase, in Martian Mono at this
              size, runs the ring's full circumference (2π × 82 ≈ 515) and
              closes on itself. Re-measure if the wording changes. */}
          <text
            fill="currentColor"
            fontSize="8"
            letterSpacing="0.384"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <textPath href="#seal-ring">
              {"ALWAYSTRUE · SECURITY AUDITS · PRODUCT ENGINEERING · TEAM AUGMENTATION · OPEN SOURCE · "}
            </textPath>
          </text>
        </g>
        {/* The logo mark, centred: 29×29 in a 200×200 box. */}
        <path
          transform="translate(85.5 85.5)"
          className={styles.mark}
          fillRule="evenodd"
          fill="currentColor"
          d="M2.20532 0C0.987356 0 0 0.987357 0 2.20532V26.7947C0 28.0127 0.987357 29 2.20532 29H26.7947C28.0127 29 29 28.0127 29 26.7947V2.20532C29 0.987356 28.0127 0 26.7947 0H2.20532ZM4.30038 3.63878H14.8308C16.0944 3.63878 16.9369 4.65908 16.9369 5.67938V9.76056H12.7247V7.71997H6.40646C5.14281 7.71997 4.30038 6.69967 4.30038 5.67938V3.63878ZM12.7247 12.4312V21.28H6.40646C5.14281 21.28 4.30038 22.3003 4.30038 23.3206V25.3612H23.2551C23.2551 25.3612 25.3612 25.3612 25.3612 23.4226C25.3612 21.28 23.2551 21.28 23.2551 21.28H16.9369V12.4312H12.7247Z"
        />
      </svg>
    </div>
  );
}
