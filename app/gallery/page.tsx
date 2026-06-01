"use client";

import { useEffect, useState } from "react";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/admin/gallery");
        if (res.ok) {
          const data = await res.json();
          setGalleryItems(data);
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="w-full max-w-viewport mx-auto pb-10">
      <h1 className="text-center mb-4">Our Reborn Babies Gallery</h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        Explore a collection of our most cherished creations. Each photo
        highlights the artistry and lifelike detail of our silicone babies.
      </p>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
        </div>
      ) : (
        <GalleryGrid items={galleryItems} />
      )}
    </div>
  );
}
