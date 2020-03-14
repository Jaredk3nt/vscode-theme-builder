import { generate } from "shortid";
import { pureKeyRemove } from "./utils/pureFunctions";
import { SCOPES } from "./scopes";

export const INITIAL_STATE = {
  language: "jsx",
  scopes: Object.values(SCOPES),
  theme: {
    name: "",
    styles: {},
    tokens: [{ name: "", scopes: [], styles: {} }]
  }
};

export const types = {
  CHANGE_LANG: "CHANGE_LANG",
  // THEME TYPES
  USE_THEME_FILE: "USE_THEME_FILE",
  CHANGE_THEME_NAME: "CHANGE_THEME_NAME",
  ADD_THEME_STYLE: "ADD_THEME_STYLE",
  REMOVE_THEME_STYLE: "REMOVE_THEME_STYLE",
  // TOKEN TYPES
  ADD_TOKEN: "ADD_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
  CHANGE_TOKEN_NAME: "CHANGE_TOKEN_NAME",
  ADD_TOKEN_STYLE: "ADD_TOKEN_STYLE",
  REMOVE_TOKEN_STYLE: "REMOVE_TOKEN_STYLE",
  PLACE_SCOPE: "PLACE_SCOPE",
  DISCARD_SCOPE: 'DISCARD_SCOPE'
};

// TODO: move into utils file
function purePush(arr, item) {
  return [...arr, item];
}

function pureRemove(arr, i) {
  return [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)];
}

function pureUpdate(arr, i, item) {
  return [...arr.slice(0, i), item, ...arr.slice(i + 1, arr.length)];
}

function removeScopes(scopes, removals) {
  const removalsMap = {};
  removals.forEach(r => (removalsMap[r] = r));
  return scopes.filter(s => !removalsMap[s]);
}

function addScopeToToken(tokens, index, scope) {
  const updatee = tokens[index];
  return pureUpdate(tokens, index, {
    ...updatee,
    scopes: purePush(updatee.scopes, scope)
  });
}

function removeScopeFromToken(tokens, index, scope) {
  const updatee = tokens[index];
  const scopeIndex = updatee.scopes.findIndex(item => item === scope);
  return pureUpdate(tokens, index, {
    ...updatee,
    scopes: pureRemove(updatee.scopes, scopeIndex)
  })
}

function moveScopeToken(tokens, to, from, scope) {
  const toToken = tokens[to];
  const fromToken = tokens[from];
  const newTo = {
    ...toToken,
    scopes: [...toToken.scopes, scope]
  };
  const scopeIndex = fromToken.scopes.findIndex(item => item === scope);
  const newFrom = {
    ...fromToken,
    scopes: pureRemove(fromToken.scopes, scopeIndex)
  };

  if (to > from) {
    return [
      ...tokens.slice(0, from),
      newFrom,
      ...tokens.slice(from + 1, to),
      newTo,
      ...tokens.slice(to + 1, tokens.length)
    ];
  } else {
    return [
      ...tokens.slice(0, to),
      newTo,
      ...tokens.slice(to + 1, from),
      newFrom,
      ...tokens.slice(from + 1, tokens.length)
    ];
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case types.CHANGE_LANG:
      return {
        ...state,
        language: action.language
      };
    case types.USE_THEME_FILE:
      return {
        ...state,
        scopes: removeScopes(
          state.scopes,
          action.theme.tokenColors.reduce((acc, tk) => {
            const tkScopes = Array.isArray(tk.scope) ? tk.scope : [tk.scope];
            return [...acc, ...tkScopes];
          }, [])
        ),
        theme: {
          ...state.theme,
          name: action.theme.name.toLowerCase(),
          styles: action.theme.colors,
          tokens: action.theme.tokenColors.map(tk => ({
            id: generate(),
            name: tk.name,
            styles: tk.settings,
            scopes: Array.isArray(tk.scope) ? tk.scope : [tk.scope]
          }))
        }
      };
    case types.CHANGE_THEME_NAME:
      return {
        ...state,
        theme: {
          ...state.theme,
          name: action.name
        }
      };
    case types.ADD_THEME_STYLE:
      return {
        ...state,
        theme: {
          ...state.theme,
          styles: {
            ...state.theme.styles,
            [action.style]: action.value
          }
        }
      };
    case types.REMOVE_THEME_STYLE:
      return {
        ...state,
        theme: {
          ...state.theme,
          styles: pureKeyRemove(state.theme.styles, action.style)
        }
      };
    case types.PLACE_SCOPE:
      if (action.item.tokenIndex > -1) {
        // Came from another token
        return {
          ...state,
          theme: {
            ...state.theme,
            tokens: moveScopeToken(
              state.theme.tokens,
              action.index,
              action.item.tokenIndex,
              action.item.scope
            )
          }
        };
      } else {
        return {
          ...state,
          scopes: removeScopes(state.scopes, [action.item.scope]),
          theme: {
            ...state.theme,
            tokens: addScopeToToken(
              state.theme.tokens,
              action.index,
              action.item.scope
            )
          }
        };
      }
    case types.DISCARD_SCOPE:
      return {
        ...state,
        scopes: purePush(state.scopes, action.item.scope),
        theme: {
          ...state.theme,
          tokens: removeScopeFromToken(state.theme.tokens, action.item.tokenIndex, action.item.scope)
        }
      }
    default:
      throw "Undefined action in reducer";
  }
}
