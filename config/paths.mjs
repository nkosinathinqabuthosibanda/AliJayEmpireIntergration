import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Repository root (one level above /config) */
export const ROOT = path.join(__dirname, '..')

/** React frontend source */
export const WEB_ROOT = path.join(ROOT, 'apps', 'web')

/** Production static build output */
export const WEB_DIST = path.join(WEB_ROOT, 'dist')
