import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Causal Knowledge Base Editor',
  bundler: viteBundler(),
  theme: defaultTheme(), // Maybe add navbar entries and logo later
})
