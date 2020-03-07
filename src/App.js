/** @jsx jsx */
import React, { useMemo } from 'react';
import './App.css';
import JSX from './components/languages/jsx';
import { css, jsx } from '@emotion/core';
// Utils
import mapTheme from './themes/mapTheme';

function App() {
  const currentTheme = useMemo(mapTheme, []);
  console.log(currentTheme)
  const themeStyles = useMemo(() => {
    const styles = `${currentTheme.tokens
      .map(token => {
        return `${token.scopes.map(scope => '.' + scope).join(', ')} { ${Object.entries(token.style)
          .map(([key, value]) => `${key}: ${value};`)
          .join('')}} `;
      })
      .join('')}`;

    return `
      background-color: ${currentTheme.style.background};
      color: ${currentTheme.style.foreground};
      padding: 1em 2em;

      ${styles}
    `;
  }, [currentTheme]);
  console.log(themeStyles);
  const finalStyles = css(themeStyles);

  return (
    <div className="App" css={finalStyles}>
      <JSX />
    </div>
  );
}

export default App;
