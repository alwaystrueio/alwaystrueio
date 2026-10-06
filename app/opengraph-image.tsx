import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";

export const alt = "alwaystrue — Security and engineering for the Cardano ecosystem";
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareImage({
    eyebrow: "Cardano smart contract security",
    title: "Security and engineering for the Cardano ecosystem.",
    facts: [
      "Security audits",
      "Product engineering",
      "Team augmentation",
      "Open source",
    ],
  });
}
