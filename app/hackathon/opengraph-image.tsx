import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";
import { HACKATHON, formatUsd } from "@/lib/hackathon";

export const alt = `${HACKATHON.name}: build DeFi on Cardano, ${formatUsd(HACKATHON.prizePool)} in prizes`;
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderShareImage({
    eyebrow: `${HACKATHON.format} hackathon · Sponsored by ${HACKATHON.sponsor}`,
    title: "Build DeFi on Cardano.",
    subtitle: "With cardano-init and ContractsLibrary.",
    facts: [
      `${formatUsd(HACKATHON.prizePool)} in prizes`,
      HACKATHON.dateConfirmed ? HACKATHON.date : "Late November",
      "Free entry",
    ],
  });
}
