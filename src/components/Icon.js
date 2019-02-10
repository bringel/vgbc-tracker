//@flow
import * as React from 'react';

type Props = {
  type: string,
  size: number,
  color: string,
  onClick?: (event: *) => void
};

const Icon = (props: Props) => (
  <svg
    viewBox="0 0 100 100"
    width={`${props.size}px`}
    height={`${props.size}px`}
    style={{ fill: props.color, cursor: props.onClick ? 'pointer' : 'default' }}
    onClick={props.onClick ? props.onClick : null}>
    <use href={`icons.svg#${props.type}`} />
  </svg>
);

Icon.defaultProps = {
  color: 'currentcolor',
  size: 32
};

export default Icon;
