type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Serves images directly from Cloudinary/Unsplash instead of Vercel's
 * image optimizer. This keeps Vercel image-optimization cache reads at zero
 * while still delivering correctly sized, modern-format images.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src) return src;

  if (src.includes("res.cloudinary.com") && src.includes("/image/upload/")) {
    const transformation = [
      "f_auto",
      `q_${quality ?? "auto"}`,
      `w_${width}`,
      "c_limit",
    ].join(",");

    return src.replace(
      "/image/upload/",
      `/image/upload/${transformation}/`
    );
  }

  if (src.includes("images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 80));
    return url.toString();
  }

  return src;
}
