"use client";

import { useEffect, useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

interface ImageViewerProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

export function ImageViewer({
    isOpen,
    onClose,
    images,
    initialIndex = 0,
}: ImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isOpen) return null;

    const nextImage = () => {
        if (images.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (images.length <= 1) return;
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50"
                aria-label="Close"
            >
                <FaTimes size={32} />
            </button>

            {/* Navigation - Left */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                    }}
                    className="absolute left-4 md:left-8 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-50"
                    aria-label="Previous image"
                >
                    <FaChevronLeft size={40} />
                </button>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
                <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                    {images[currentIndex] && (
                        <Image
                            src={images[currentIndex]}
                            alt={`Full screen view ${currentIndex + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    )}
                </div>
            </div>

            {/* Navigation - Right */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                    }}
                    className="absolute right-4 md:right-8 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all z-50"
                    aria-label="Next image"
                >
                    <FaChevronRight size={40} />
                </button>
            )}

            {/* Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium bg-black/50 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
}
