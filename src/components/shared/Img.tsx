import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/paths";

/** next/image with the GitHub Pages base path applied (static export → unoptimized). */
export function Img({ src, alt, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={asset(src)} alt={alt} {...rest} />;
}
