import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { WEB_DIST, WEB_ROOT, ROOT } from '../config/paths.mjs'

const steps = [
  { cmd: 'npx', args: ['tsc', '-b'], cwd: ROOT },
  { cmd: 'npx', args: ['vite', 'build', '--config', 'vite.config.mjs'], cwd: WEB_ROOT },
]

console.log('[build] Alijay Empire hub…')

for (const { cmd, args, cwd } of steps) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: true, cwd })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

if (!existsSync(WEB_DIST)) {
  console.error(`[build] Failed — dist not found at ${WEB_DIST}`)
  process.exit(1)
}

console.log(`[build] OK → ${WEB_DIST}`)
