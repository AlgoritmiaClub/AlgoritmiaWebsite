/**
 * @file A component to display a full-width team photo.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Image from "next/image";

/**
 * A simple section component to display the team photo at full width.
 * @returns The rendered TeamPhotoSection component.
 */
export function TeamPhotoSection() {
  return (
    <section className="w-full">
      <Image
        src="/Foto_Grupal.png"
        alt="A group photo of the Algoritmia Club members"
        width={1920} // Intrinsic width of the image for aspect ratio
        height={862} // Intrinsic height of the image for aspect ratio
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
