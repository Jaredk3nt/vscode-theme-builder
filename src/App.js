import React, { useState, useReducer, useEffect, useMemo } from 'react';
// Components
import Preview from './components/Preview';
// Utils
import { THEME_MAP } from './themes';
import { getTheme } from './utils/themeUtils';
import { INITIAL_STATE, types, reducer } from './stateManagement';
// Context
import { AppContextProvider } from './context';

function App() {
  const [base, setBase] = useState('nightowl');
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
  // Update the theme when base is selected
  useEffect(() => {
    dispatch({ type: types.USE_THEME_FILE, theme: getTheme(base) });
  }, [base]);

  return (
    <>
      <AppContextProvider value={{ scopeMap }}>
        <select value={base} onChange={e => setBase(e.target.value)}>
          {Object.entries(THEME_MAP).map(([key, th]) => (
            <option value={key}>{th.displayName}</option>
          ))}
        </select>
        <Preview language={state.language} theme={state.theme} />
      </AppContextProvider>
    </>
  );
}

export default App;
