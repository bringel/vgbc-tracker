//@flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Icon from './Icon';
import './Modal.scss';

type Props = {
  title: string,
  children: React.Node
};

class Modal extends React.Component<Props> {
  render() {
    const portalTarget = document.querySelector('#modal-portal');

    return portalTarget
      ? ReactDOM.createPortal(
          <>
            <div className="backdrop" />
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">{this.props.title}</div>
                <Icon type="cross" color="white" size={18} />
              </div>
              <div>{this.props.children}</div>
            </div>
          </>,
          portalTarget
        )
      : null;
  }
}

export default Modal;
