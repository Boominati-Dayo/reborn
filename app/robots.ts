import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.babybloomdolls.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/cart', '/checkout', '/order/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}