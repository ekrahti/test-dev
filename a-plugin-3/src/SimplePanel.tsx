import React, { useState /* useEffect */ } from 'react';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { FieldType, PanelProps } from '@grafana/data';
import Circle from 'Circle';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  let circle_color: string = options.color;

  switch (circle_color) {
    case 'red':
      circle_color = theme.palette.redBase;
      break;
    case 'green':
      circle_color = theme.palette.greenBase;
      break;
    case 'blue':
      circle_color = theme.palette.blue95;
      break;
  }

  const dats = data.series[1].fields.find(field => field.type === FieldType.number)?.values.get(0);
  let data_color = dats <= 50 ? 'green' : 'red';
  const [dragging, setDragging] = useState(false);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  // handledragmove ist nicht vom Typ Eventlistener ...
  // useEffect(() => {
  //   window.addEventListener('dragmove', handleDragMove);
  //   return () => {};
  // }, []);

  // Parameter muss explizit typisert werden
  const handleDragMove = (e: React.PointerEvent<SVGGElement>) => {
    if (dragging) {
      setTranslate({
        x: translate.x + e.movementX,
        y: translate.y + e.movementY,
      });
    }
  };

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g
          onPointerDown={e => {
            setDragging(true);
          }}
          onPointerMove={e => {
            handleDragMove(e);
          }}
          onPointerUp={e => setDragging(false)}
        >
          <Circle color={circle_color} translate={translate} />
        </g>
      </svg>
      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        {<div>Text option value: {options.text}</div>}
        <div
          className={css`
            color: ${data_color};
          `}
        >
          {dats}
        </div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
