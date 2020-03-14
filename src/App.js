import React, { useState, useReducer, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
// Components
import Preview from "./components/Preview";
import Builder from "./components/Builder";
import { DndProvider } from "react-dnd";
// Utils
import Backend from 'react-dnd-html5-backend';
import { getTheme } from "./utils/themeUtils";
import { INITIAL_STATE, types, reducer } from "./stateManagement";
// Context
import { AppContextProvider } from "./context";
import "./App.css";

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
      dispatch({ type: types.USE_THEME_FILE, theme: getTheme("laserwave") }),
    []
  );

  return (
    <>
      <AppContextProvider value={{ scopeMap }}>
        <DndProvider backend={Backend}>
          <Layout>
            <Preview language={state.language} theme={state.theme} />
            <Builder
              store={state}
              dispatch={dispatch}
              onThemeChange={theme =>
                dispatch({ type: types.USE_THEME_FILE, theme })
              }
            />
          </Layout>
        </DndProvider>
      </AppContextProvider>
    </>
  );
}

const Layout = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;

  height: 100vh;
  box-sizing: border-box;
`;

export default App;
