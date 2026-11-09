import { MetadataRoute } from 'next'
import { readdir } from 'fs/promises'
import path from 'path'

const BASE_URL = 'https://ultrazone.blue'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // src/app 以下の page.tsx を再帰的に探す
    // api フォルダ、_ で始まるフォルダ(ページ専用の部品置き場)、. で始まるフォルダは対象外にする
    const files = await readdir(path.join(process.cwd(), 'src/app'), { recursive: true })
    const pages = files.filter((file) => {
        const segments = file.split(/[\\/]/)
        return segments.at(-1) === 'page.tsx'
            && !segments.some((segment) => segment === 'api' || segment.startsWith('_') || segment.startsWith('.'))
    })

    const sitemapEntries: MetadataRoute.Sitemap = pages.map((pagePath: string) => {
        let route = pagePath.replace(/\/page\.tsx$|\\page\.tsx$/, '').replace('page.tsx', '')

        route = route.replace(/\\/g, '/')

        // (contents) のようなルートグループのフォルダは URL に含まれないため取り除く
        route = route.split('/').filter((segment) => !/^\(.+\)$/.test(segment)).join('/')

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
