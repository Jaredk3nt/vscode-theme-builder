import { SOURCE_MAP } from '../sources/sourceMap'
// Theme
import theme from './laserWave.json';

const SETTINGS_MAP = {
  foreground: 'color'
}

export default function mapTheme(
  // theme
) {
  // TODO: dynamically import themes

  return {
    name: theme.name,
    style: {
      foreground: theme.colors[toNormal(SOURCE_MAP.EDT_FG)] || '#ffffff',
      background: theme.colors[toNormal(SOURCE_MAP.EDT_BG)] || '#333',
    },
    tokens: theme.tokenColors.map(token => ({
      name: token.name,
      style: Object.entries(token.settings).reduce((acc, [set, value]) => ({ ...acc, [SETTINGS_MAP[set]]: value }), {}),
      scopes: token.scope.map(toSafe)
    }))
  }
}

// Utils
function toSafe(scope) {
  return scope.replace(/\./g, '_');
}

function toNormal(scope) {
  return scope.replace(/_/g, '.');
}

