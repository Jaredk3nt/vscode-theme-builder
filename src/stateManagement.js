export const INITIAL_STATE = {
  language: 'jsx',
  theme: {
    name: '',
    styles: {},
    tokens: [
      { name: '', scopes: [], styles: {} }
    ],
  }
}

export const types = {
  CHANGE_LANG: 'CHANGE_LANG',
  // THEME TYPES
  USE_THEME_FILE: 'USE_THEME_FILE',
  CHANGE_THEME_NAME: 'CHANGE_THEME_NAME',
  ADD_THEME_STYLE: 'ADD_THEME_STYLE',
  REMOVE_THEME_STYLE: 'REMOVE_THEME_STYLE',
  // TOKEN TYPES
  ADD_TOKEN: 'ADD_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  CHANGE_TOKEN_NAME: 'CHANGE_TOKEN_NAME',
  ADD_TOKEN_STYLE: 'ADD_TOKEN_STYLE',
  REMOVE_TOKEN_STYLE: 'REMOVE_TOKEN_STYLE',
  PLACE_SCOPE: 'PLACE_SCOPE',
};

export function reducer(state, action) {
  switch(action.type) {
    case types.CHANGE_LANG:
      return {
        ...state,
        language: action.language
      };
    case types.USE_THEME_FILE:
      return {
        ...state,
        theme: {
          ...state.theme,
          name: action.theme.name + ' Copy',
          styles: action.theme.colors,
          tokens: theme.tokenColors.map(tk => ({
            name: tk.name,
            styles: tk.settings,
            scopes: tk.scope
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
          styles: {
            ...stat
          }
        }
      }
    default:
      throw 'Undefined action in reducer';
  }
}