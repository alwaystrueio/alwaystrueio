import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";

export const alt = "alwaystrue case study";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();
  return renderShareImage({
    eyebrow: `${study.kind} · ${study.client.label}`,
    title: study.title,
    subtitle: study.headline,
    facts: study.card.facts,
  });
}
