import React from 'react';
// Utils
import { getTheme } from '../utils/themeUtils';
// Variables
import { THEME_MAP } from '../themes';

export default function Builder({ onThemeChange, store }) {
  // TODO: add all existing scopes to list
  // TODO: add current theme tokens to list with scopes, remove from full list ones in theme
  // TODO: make all of those scopes drag and droppable into one another, this should update the theme
  return (
    <>
      <select
        value={store.theme.name}
        onChange={e => onThemeChange(getTheme(e.target.value))}
      >
        {Object.entries(THEME_MAP).map(([key, th]) => (
          <option value={key}>{th.displayName}</option>
        ))}
      </select>
    </>
  );
}
