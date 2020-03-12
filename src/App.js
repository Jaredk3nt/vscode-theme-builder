import React, { useState, useReducer, useEffect, useMemo } from 'react';
// Components
import Preview from './components/Preview';
import Builder from './components/Builder';
// Utils
import { getTheme } from './utils/themeUtils';
import { INITIAL_STATE, types, reducer } from './stateManagement';
// Context
import { AppContextProvider } from './context';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // Reverse tokens to map of scope: token-name for fast lookup
  const scopeMap = useMemo(() => {
    const map = {};
    const theme = state.theme;
    for (let token of theme.tokens) {
      if (token.scopes) {
        if (Array.isArray(token.scopes)) {
          for (let scope of token.scopes) {
            map[scope] = { id: token.id, name: token.name };
          }
        } else {
          map[token.scopes] = { id: token.id, name: token.name };
        }
      }
    }
    return map;
  }, [state.theme]);

  // Temporary first time set up
  useEffect(
    () =>
      dispatch({ type: types.USE_THEME_FILE, theme: getTheme('laserwave') }),
    []
  );

  return (
    <>
      <AppContextProvider value={{ scopeMap }}>
        <Preview language={state.language} theme={state.theme} />
        <Builder
          store={state}
          onThemeChange={theme =>
            dispatch({ type: types.USE_THEME_FILE, theme })
          }
        />
      </AppContextProvider>
    </>
  );
}

export default App;
