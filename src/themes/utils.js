import { SOURCE_MAP } from "../sources/sourceMap";
// Theme
import laserWave from "./laserWave.json";

const SETTINGS_MAP = {
  foreground: "color"
};

// TODO: dynamically import themes
export function getTheme(theme) {
  return laserWave;
}

export function mapTheme(theme) {
  return {
    name: theme.name,
    style: {
      foreground: theme.colors[toNormal(SOURCE_MAP.EDT_FG)] || "#ffffff",
      background: theme.colors[toNormal(SOURCE_MAP.EDT_BG)] || "#333"
    },
    tokens: theme.tokenColors.map(token => {
      console.log(token.scope);
      return {
        name: token.name,
        style: Object.entries(token.settings).reduce(
          (acc, [set, value]) => ({ ...acc, [SETTINGS_MAP[set]]: value }),
          {}
        ),
        scopes: Array.isArray(token.scope)
          ? token.scope.map(toSafe)
          : [toSafe(token.scope)]
      };
    })
  };
}

// Utils
function toSafe(scope) {
  if (scope) {
    return scope.replace(/\./g, "_");
  }
}

function toNormal(scope) {
  if (scope) {
    return scope.replace(/_/g, ".");
  }
}
