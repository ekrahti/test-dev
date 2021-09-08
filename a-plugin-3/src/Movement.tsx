import React, { useState } from 'react';

interface MoveProp {
  onDragMove(e: Event): void;
  children: JSX.Element;
  translate: { x: number; y: number };
}

export default function Move({ onDragMove, children, translate }: MoveProp) {
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e: Event) => {
    setDragging(true);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (dragging) {
      onDragMove(e);
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <g
      /* Unerwarteter Wert translateX beim Parsen von transform ..        
         transform={`translateX(${translate.x}px) translateY(${translate.y}px)`}
      */
      onPointerDown={e => handlePointerDown}
      onPointerMove={e => handlePointerMove}
      onPointerUp={e => handlePointerUp}
    >
      {children}
    </g>
  );
}
