import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Baby Bloom Dolls",
        short_name: "Baby Bloom Dolls",
        description: "Premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel.",
        start_url: '/',
        display: 'standalone',
        background_color: '#f38ca5',
        theme_color: '#f38ca5',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon1.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon1.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}