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
  const [scopes, setScopes] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [language, setLanguage] = useState('jsx');
  const themeName = 'laserWave';
  const theme = useMemo(() => getTheme(themeName), [themeName]);

  // Sets up the buckets to use a prexisting theme
  function useTheme() {

  }

  function placeScope(index, bucket)

  return <Preview language={language} theme={theme} />;
}

export default App;
