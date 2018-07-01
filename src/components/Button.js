//@flow
import React from 'react';

import './Button.scss';

type Props = {
  children: any,
  buttonStyle: 'blue' | 'green' | 'red' | 'orange' | 'purple',
  className: string,
  onClick: () => void
};

const button = (props: Props) => (
  <button onClick={props.onClick} className={`btn ${props.buttonStyle}-button ${props.className}`}>
    {props.children}
  </button>
);

button.defaultProps = {
  buttonStyle: 'blue',
  className: ''
};

export default button;
