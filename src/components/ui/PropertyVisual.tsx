import { Photo } from "@/components/ui/Photo";
import { Scene } from "@/components/ui/Scene";
import type { SceneVariant } from "@/types";

/**
 * Renders a sourced photo when one exists and falls back to the on-brand
 * gradient `Scene` when it does not, so a listing without full photography
 * still looks deliberate rather than broken.
 */
export function PropertyVisual({
  photo,
  variant,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  glow = true,
}: {
  photo: string | null;
  variant: SceneVariant;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  glow?: boolean;
}) {
  if (photo) {
    return (
      <Photo
        src={photo}
        alt={alt}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return <Scene variant={variant} className={className} glow={glow} />;
}
