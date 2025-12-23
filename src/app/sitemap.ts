import { MetadataRoute } from 'next'
import { glob } from 'glob'
import path from 'path'

const BASE_URL = 'https://ultrazone.blue'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages = await glob('**/page.tsx', {
        cwd: path.join(process.cwd(), 'src/app'),
        ignore: ['**/api/**', '**/_*/**']
    })

    const sitemapEntries: MetadataRoute.Sitemap = pages.map((pagePath: string) => {
        let route = pagePath.replace(/\/page\.tsx$|\\page\.tsx$/, '').replace('page.tsx', '')

        route = route.replace(/\\/g, '/')

        if (route && !route.startsWith('/')) {
            route = `/${route}`
        }

        if (route === '') {
            route = '/'
        }

        const priority = route === '/' ? 1.0 : 0.8
        const changeFrequency = 'weekly'

        return {
            url: `${BASE_URL}${route === '/' ? '' : route}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        }
    })

    return sitemapEntries
}
