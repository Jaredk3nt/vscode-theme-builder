/** @jsx jsx */
import { useMemo } from 'react';
import { css, jsx } from '@emotion/core';
// Utils
import { mapTheme } from '../themes/utils';
// Constants
import { LANG_MAP } from './languages';

function Preview({ language = 'jsx', theme }) {
  const currentTheme = useMemo(() => mapTheme(theme), [theme]);
  const themeStyles = useMemo(() => {
    const styles = `${currentTheme.tokens
      .map(token => {
        // Generate CSS scopes for all theme scopes
        return `${token.scopes && token.scopes
          .map(scope => '.' + scope)
          .join(', ')} { ${Object.entries(token.style)
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
  // Pick correct language example
  const lang = LANG_MAP[language];
  const LangComponent = lang.preview;

  return (
    <div css={css(themeStyles)}>
      <LangComponent />
    </div>
  );
}

export default Preview;
