/** @jsx jsx */
import { useMemo } from 'react';
import { css, jsx } from '@emotion/core';
// Utils
import { mapSetting } from '../utils/themeUtils';
// Constants
import { SCOPES } from '../scopes';
import { LANG_MAP } from './languages';

function Preview({ language = 'jsx', theme }) {
  // Pick correct language example
  const lang = LANG_MAP[language];
  const LangComponent = lang.preview;
  // Generate classes for each token
  const themeStyles = useMemo(() => {
    const styles = `${theme.tokens
      .map(token => {
        return `.${token.id} { ${Object.entries(token.styles)
          .map(([key, value]) => `${mapSetting(key)}: ${value}; `)
          .join(' ')}}`;
      })
      .join(' ')}`;

    return `
      background-color: ${theme.styles[SCOPES.EDT_BG]};
      color: ${theme.styles[SCOPES.EDT_FG]};
      padding: 1em 2em;

      ${styles}
    `;
  }, [theme]);

  return (
    <div css={css(themeStyles)}>
      <LangComponent />
    </div>
  );
}

export default Preview;
