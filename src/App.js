import React, { useReducer, useMemo } from 'react';
// Components
import Preview from './components/Preview';
// Utils
import { getTheme } from './themes/utils';
import { INITIAL_STATE, types, reducer } from './stateManagement';

// TODO: fix double quoted string
// TODO: fix semi-colons (probably a laserWave issue)
function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const themeName = 'laserWave';
  const theme = useMemo(() => getTheme(themeName), [themeName]);

  return <Preview language={state.language} theme={theme} />;
}

export default App;
