import React from 'react';

import './Button.scss';

type Props = {
  children: any,
  buttonStyle: 'blue' | 'green' | 'red' | 'orange' | 'purple',
  className: string
};

const button = (props: Props) => (
  <button {...props} className={`btn ${props.buttonStyle}-button ${props.className}`}>
    {props.children}
  </button>
);

button.defaultProps = {
  buttonStyle: 'blue',
  className: ''
};

export default button;
