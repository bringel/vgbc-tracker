//@flow
import React from 'react';
import classnames from 'classnames';

import './Button.scss';

type Props = {
  children: any,
  buttonStyle?: 'fill' | 'outline',
  buttonColor?: 'blue' | 'green' | 'red' | 'orange' | 'purple' | '',
  className: string,
  disabled?: boolean,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void
};

const button = (props: Props) => {
  const colorClassname = `${props.buttonColor || ''}-${props.buttonStyle || ''}-button`;
  const classes = classnames(
    'btn',
    {
      'fill-button': props.buttonStyle === 'fill',
      'outline-button': props.buttonStyle === 'outline',
      [colorClassname]: props.buttonColor,
      disabled: props.disabled
    },
    props.className
  );

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
  buttonStyle: 'fill',
  buttonColor: '',
  disabled: false
};

export default button;
