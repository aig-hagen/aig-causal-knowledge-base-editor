import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { redirectPlugin } from '@vuepress/plugin-redirect'

const base = '/docs/'

function rewriteContributorName(name) {
  if (name === "larsbengel") {
    return "Lars Bengel"
  }
  return name
}


// Plugin for transforming contributor names
// If someone does not commmit with a full name,
// but we want to show the full name,
// the full name can be added using this.
const contributorTransformPlugin = {
  name: 'vuepress-plugin-contributor-transform',
  extendsPage(page) {
    const gitData = page.data.git
    if (gitData?.contributors) {
      gitData.contributors = gitData.contributors.map((contributor) => ({
        ...contributor,
        name: rewriteContributorName(contributor.name)
      }))
    }
  },
}

export default defineUserConfig({
  lang: 'en-US',
  title: 'Causal Knowledge Base Editor',
  base: base,
  dest: 'dist/docs',
  bundler: viteBundler(),
  theme: defaultTheme({
    home: '/user-guide.html',
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
    redirectPlugin(),
    markdownImagePlugin({
      // Enable figure
      figure: true,
    }),
    markdownExtPlugin({
      footnote: true,
    }),
    contributorTransformPlugin,
  ],
})
