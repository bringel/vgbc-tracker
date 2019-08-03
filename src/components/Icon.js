//@flow
import * as React from 'react';

type Props = {
  path: string,
  size: number,
  color: string,
  className: string,
  onClick?: (event: *) => void
};

const Icon = (props: Props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    width={`${props.size}px`}
    height={`${props.size}px`}
    style={{ fill: props.color, cursor: props.onClick ? 'pointer' : 'default' }}
    className={props.className}
    onClick={props.onClick ? props.onClick : null}>
    <path d={props.path} />
  </svg>
);

Icon.defaultProps = {
  color: 'currentcolor',
  size: 32,
  className: ''
};

export default Icon;
