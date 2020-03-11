import React, { useMemo } from 'react';

export default function Scope({ scopes, scopeMap, children }) {
  const token = useMemo(() => {
    for (let s = scopes.length - 1; s >= 0; s--) {
      const sParts = scopes[s].split('.');
      for (let i = sParts.length; i > 0; i--) {
        const test = sParts.slice(0, i).join('.');
        // Found scope in theme
        if (scopeMap[test]) {
          return scopeMap[test].id;
        }
      }
    }
    // Was never found in theme so should use root styles
    return 'root';
  }, [scopeMap, scopes]);

  // TODO: ensure token is "css safe"
  return <span className={token}>{children}</span>;
}
