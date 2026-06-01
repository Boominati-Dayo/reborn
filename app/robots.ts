import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baby-bloom-dolls.vercel.app'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/cart', '/checkout', '/order/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}