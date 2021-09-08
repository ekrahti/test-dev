import React from 'react';
import { css } from 'emotion';

interface CircleProp {
  color: string;
  translate: {
    x: number;
    y: number;
  };
}

const Circle = ({ color, translate }: CircleProp) => {
  return (
    <circle
      className={css`
        fill: ${color};
        &:hover {
          fill: white;
          opacity: 30%;
          r: 84px;
        }
      `}
      r={80}
      cx={translate.x}
      cy={translate.y}
    />
  );
};
export default Circle;
