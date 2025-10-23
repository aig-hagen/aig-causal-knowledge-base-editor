import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'

const base = '/docs/'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Causal Knowledge Base Editor',
  base: base,
  dest: 'dist/docs',
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: `/images/logoaig2025_transparent.png`,
    navbar: [
      {
        text: 'Editor',
        link: 'https://causal-knowledge-base-editor.aig.fernuni-hagen.de/',
      },
      {
        text: 'Artificial Intelligence Group',
        link: 'https://www.fernuni-hagen.de/aig/en/',
      }
    ]
  }),
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes:"32x32", href: `${base}/images/favicon-32x32.png` }],
    ['link', { rel: 'icon', type: 'image/png', sizes:"16x16", href: `${base}/images/favicon-16x16.png` }],
    ['link', { rel: 'icon', type: 'image/png', sizes:"192x192", href: `${base}/images/favicon-192x192.png` }],
  ],
  plugins: [
    markdownImagePlugin({
      // Enable figure
      figure: true,
    }),
    markdownExtPlugin({
      footnote: true,
    })
  ],
})
