import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
// import node from '@astrojs/node'

export default defineConfig({
  output: 'server',
  adapter: vercel(), // node({mode:'standalone'}),
  vite: {
    ssr: {
      external: ['node:buffer', 'node:path', 'node:fs', 'node:os', 'node:crypto'],
    },
  },
})
