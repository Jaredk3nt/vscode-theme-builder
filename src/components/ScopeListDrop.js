import React from "react";
import { useDrop } from "react-dnd";

export default function ScopeListDrop({ children, onDrop }) {
  const [collectedProps, dropRef] = useDrop({
    accept: 'SCOPE',
    drop: onDrop
  });

  return (
    <div ref={dropRef}>{children}</div>
  );
}
