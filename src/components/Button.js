//@flow
import React from 'react';
import classnames from 'classnames';

import './Button.scss';

type Props = {
  children: any,
  buttonStyle?: 'blue' | 'green' | 'red' | 'orange' | 'purple' | '',
  className: string,
  disabled?: boolean,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void
};

const button = (props: Props) => {
  const styleClassname = `${props.buttonStyle || ''}-button`;
  const classes = classnames('btn', { [styleClassname]: props.buttonStyle, disabled: props.disabled }, props.className);

  return (
    <button
      onClick={(event: SyntheticMouseEvent<HTMLButtonElement>) => {
        if (props.disabled) {
          event.preventDefault();
          return;
        }

        if (props.onClick) {
          props.onClick(event);
        }
      }}
      className={classes}>
      {props.children}
    </button>
  );
};

button.defaultProps = {
  className: '',
  buttonStyle: '',
  disabled: false
};

export default button;
