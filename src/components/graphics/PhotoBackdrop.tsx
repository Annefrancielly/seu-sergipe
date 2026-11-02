import Image, { type StaticImageData } from "next/image";

const MASKS = {
  centro: "radial-gradient(ellipse 80% 50% at 50% 50%, #000 30%, transparent 100%)",
  direita: "radial-gradient(ellipse 70% 50% at 75% 50%, #000 30%, transparent 100%)",
  esquerda: "radial-gradient(ellipse 70% 50% at 25% 50%, #000 30%, transparent 100%)",
} as const;

type PhotoBackdropProps = {
  image: StaticImageData | string;
  position?: string;
  focus?: keyof typeof MASKS;
};

export function PhotoBackdrop({ image, position, focus = "centro" }: PhotoBackdropProps) {
  const mask = MASKS[focus];

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30 saturate-[0.85]"
        style={{ objectPosition: position, maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  );
}
