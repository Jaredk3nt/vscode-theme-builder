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
  // Reverse tokens to map of scope: token-name for fast lookup
  // TODO: move scope map up a level and to context since it is used by so many components
  const scopeMap = useMemo(() => {
    const map = {};
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
  }, [theme]);
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
      <LangComponent scopeMap={scopeMap} />
    </div>
  );
}

export default Preview;
