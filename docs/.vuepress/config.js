import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Causal Knowledge Base Editor',
  base: '/docs/',
  dest: 'dist/docs',
  bundler: viteBundler(),
  theme: defaultTheme(), // Maybe add navbar entries and logo later,
  plugins: [
    markdownHintPlugin({
      // Enable hint container, true by default
      hint: true,
    }),
    markdownImagePlugin({
      // Enable figure
      figure: true,
    }),
    markdownExtPlugin({
      footnote: true,
    })
  ],
})
