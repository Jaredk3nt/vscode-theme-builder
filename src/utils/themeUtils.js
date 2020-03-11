import { SCOPES } from '../scopes';
import { THEME_MAP } from '../themes';

const SETTINGS_MAP = {
  foreground: 'color',
  background: 'background-color',
  fontStyle: 'font-style',
};

export function getTheme(theme) {
  if (THEME_MAP[theme]) return THEME_MAP[theme].theme;
  return THEME_MAP['laserwave'].theme;
}

export function mapSetting(setting) {
  return SETTINGS_MAP[setting];
}

export function toSafeToken(token) {
  return token.split(/\s/g).join('-');
}

export function mapTheme(theme) {
  return {
    name: theme.name,
    style: {
      foreground: theme.colors[SCOPES.EDT_FG] || '#ffffff',
      background: theme.colors[SCOPES.EDT_BG] || '#333',
    },
    tokens: theme.tokenColors.map(token => {
      return {
        name: token.name,
        styles: Object.entries(token.settings).reduce(
          (acc, [set, value]) => ({ ...acc, [SETTINGS_MAP[set]]: value }),
          {}
        ),
        scopes: Array.isArray(token.scope) ? token.scope : [token.scope],
      };
    }),
  };
}

// Utils
function toSafe(scope) {
  if (scope) {
    return scope.replace(/\./g, '_');
  }
}

function toNormal(scope) {
  if (scope) {
    return scope.replace(/_/g, '.');
  }
}
