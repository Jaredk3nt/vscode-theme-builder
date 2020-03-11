import React, { useState, useReducer, useEffect } from 'react';
// Components
import Preview from './components/Preview';
// Utils
import { THEME_MAP } from './themes';
import { getTheme } from './utils/themeUtils';
import { INITIAL_STATE, types, reducer } from './stateManagement';

function App() {
  const [base, setBase] = useState('nightowl');
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: types.USE_THEME_FILE, theme: getTheme(base) });
  }, [base]);

  return (
    <>
      <select value={base} onChange={e => setBase(e.target.value)}>
        {Object.entries(THEME_MAP).map(([key, th]) => (
          <option value={key}>{th.displayName}</option>
        ))}
      </select>
      <Preview language={state.language} theme={state.theme} />
    </>
  );
}

export default App;
