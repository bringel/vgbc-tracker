//@flow
import * as React from 'react';

import './Input.scss';

type Props = {
  id: string,
  type: string,
  label?: string
};

const Input = (props: Props) => (
  <div className="input-wrapper">
    <label htmlFor={props.id}>{props.label}</label>
    <input {...props} />
  </div>
);

Input.defaultProps = {
  label: ''
};

export default Input;
