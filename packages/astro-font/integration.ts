import type { AstroIntegration } from 'astro'

export function astroFont(): AstroIntegration {
  let publicDirectory = './public'
  return {
    name: 'astro-font',
    hooks: {
      'astro:build:setup': ({ vite }) => {
        const { publicDir } = vite
        if (publicDir) publicDirectory = publicDir
      },
      'astro:build:done': async ({ dir }) => {
        const { existsSync, cpSync, readdirSync } = await import('node:fs')
        const { join } = await import('node:path')
        const buildDir = dir.pathname
        function findAndCopyFontDirs(currentDir: string, relPath: string = '') {
          const entries = readdirSync(currentDir, { withFileTypes: true })
          for (const entry of entries) {
            const fullPath = join(currentDir, entry.name)
            const relativePath = join(relPath, entry.name)
            if (entry.isDirectory()) {
              if (entry.name === '__astro_font_generated__') {
                const targetPath = join(buildDir, relativePath)
                cpSync(fullPath, targetPath, { recursive: true })
              } else findAndCopyFontDirs(fullPath, relativePath)
            }
          }
        }
        if (existsSync(publicDirectory)) findAndCopyFontDirs(publicDirectory)
      },
    },
  }
}
