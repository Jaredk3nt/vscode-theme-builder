/** @jsx jsx */
import { useMemo } from "react";
import { Global, css, jsx } from "@emotion/core";
// Utils
import { mapSetting } from "../utils/themeUtils";
// Constants
import { SCOPES } from "../scopes";
import { LANG_MAP } from "./languages";

function Preview({ language = "jsx", theme }) {
  // Pick correct language example
  const lang = LANG_MAP[language];
  const LangComponent = lang.preview;
  // Generate classes for each token
  const themeStyles = useMemo(() => {
    console.log('RECALCULATING THEME STYLES')
    return theme.tokens.reduce((acc, token) => {
      const styles = Object.entries(token.styles).map(([key, value]) => [
        mapSetting(key),
        value
      ]);
      return {
        ...acc,
        ['.' + token.id]: Object.fromEntries(styles)
      };
    }, {});
  }, [theme]);

  return (
    <div
      css={css`
        background-color: ${theme.styles[SCOPES.EDT_BG]};
        color: ${theme.styles[SCOPES.EDT_FG]};
        padding: 1em 2em;
        height: 100%;
        max-height: 100vh;
        box-sizing: border-box;
      `}
    >
      <Global styles={themeStyles} />
      <LangComponent />
    </div>
  );
}

export default Preview;
