import Image from "next/image";
import type { Photo } from "@/lib/photos";

/**
 * Cadre photo commun : coins arrondis, filet, cadrage en `cover`.
 * En développement, une pastille signale les images d'attente pour éviter
 * de les publier sans s'en apercevoir.
 */
export function PhotoFrame({
  photo,
  className = "",
  imageClassName = "",
  sizes,
  priority = false,
  overlay = "none",
}: {
  photo: Photo;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  overlay?: "none" | "scrim";
}) {
  const showBadge = process.env.NODE_ENV !== "production" && photo.placeholder;

  return (
    <figure className={`relative overflow-hidden rounded-3xl border border-line bg-mist ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover ${imageClassName}`}
      />

      {overlay === "scrim" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,17,39,0.78) 0%, rgba(6,17,39,0.22) 38%, transparent 62%)",
          }}
        />
      ) : null}

      {photo.caption && overlay === "scrim" ? (
        <figcaption className="absolute inset-x-0 bottom-0 p-7 text-[15px] font-medium leading-snug text-white lg:p-9 lg:text-[17px]">
          {photo.caption}
        </figcaption>
      ) : null}

      {showBadge ? (
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
          Image d&apos;attente
        </span>
      ) : null}
    </figure>
  );
}
