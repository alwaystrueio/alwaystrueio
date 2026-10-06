import type { MetadataRoute } from "next";
import { CASE_STUDIES, caseStudyPath } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE_URL}${caseStudyPath(study)}`,
      priority: 0.8,
    })),
  ];
}
