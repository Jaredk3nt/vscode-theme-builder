import React, { useState } from 'react';
import styled from '@emotion/styled';
// Components
import TokenDrop from './TokenDrop';
import ScopeDrag from './ScopeDrag';
import ScopeListDrop from './ScopeListDrop';
// Utils
import { getTheme } from '../utils/themeUtils';
// Variables
import { THEME_MAP } from '../themes';
import { types } from '../stateManagement';

export default function Builder({ onThemeChange, store, dispatch }) {
  const [tokenAdd, setTokenAdd] = useState(false);
  const [addTokenName, setAddTokenName] = useState('');

  function closeAddToken() {
    setTokenAdd(false);
    setAddTokenName('');
  }

  return (
    <BuilderLayout>
      <div>
        <select
          value={store.theme.name}
          onChange={e => onThemeChange(getTheme(e.target.value))}
        >
          {Object.entries(THEME_MAP).map(([key, th]) => (
            <option value={key}>{th.displayName}</option>
          ))}
        </select>
        <button
          onClick={() => setTokenAdd(true)}
          type="button"
          disabled={tokenAdd}
        >
          + Token
        </button>
      </div>
      <Layout>
        <ScrollingList>
          {tokenAdd && (
            <div>
              <input
                value={addTokenName}
                onChange={e => setAddTokenName(e.target.value)}
              />
              <button type="button" onClick={() => closeAddToken()}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: types.ADD_TOKEN, name: addTokenName });
                  closeAddToken();
                }}
              >+ Token</button>
            </div>
          )}
          {store.theme.tokens.map((tk, i) => (
            <li>
              <TokenDrop
                onDrop={item =>
                  dispatch({ type: types.PLACE_SCOPE, item, index: i })
                }
              >
                <p>{tk.name}</p>
                {Object.entries(tk.styles).map(([style, value]) => (
                  <>
                    <label>{style}</label>
                    <input
                      value={value}
                      onChange={e =>
                        dispatch({
                          type: types.UPDATE_TOKEN_STYLE,
                          style,
                          index: i,
                          value: e.target.value,
                        })
                      }
                    />
                  </>
                ))}
                {console.log(tk)}
                <ul>
                  {tk.scopes.map(scope => (
                    <li>
                      <ScopeDrag scope={scope} tokenIndex={i} />
                    </li>
                  ))}
                </ul>
              </TokenDrop>
            </li>
          ))}
        </ScrollingList>
        <ScrollingList>
          <ScopeListDrop
            onDrop={item => dispatch({ type: types.DISCARD_SCOPE, item })}
          >
            {store.scopes.map(scope => (
              <li>
                <ScopeDrag scope={scope} />
              </li>
            ))}
          </ScopeListDrop>
        </ScrollingList>
      </Layout>
    </BuilderLayout>
  );
}

const BuilderLayout = styled('div')`
  display: grid;
  grid-template-rows: 30% 1fr;
  height: 100vh;
`;

const Layout = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ScrollingList = styled('ul')`
  height: 100%;
  max-height: calc(100vh - 50px);
  overflow: scroll;
  margin: 0;
  padding: 0px;
`;
