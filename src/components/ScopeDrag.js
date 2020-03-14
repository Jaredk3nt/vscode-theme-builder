import React from "react";
import { useDrag } from "react-dnd";

export default function ScopeDrag({ isDragging, scope, tokenIndex = -1 }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "SCOPE", scope, tokenIndex },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <span ref={dragRef} style={{ opacity }}>
      {scope}
    </span>
  );
}
