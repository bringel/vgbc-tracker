//@flow
import * as React from 'react';
import classnames from 'classnames';

import './Message.scss';

type Props = {
  type: 'warning' | 'error' | 'placeholder',
  children: React.Node
};

class Message extends React.Component<Props> {
  static defaultProps = {
    type: 'placeholder'
  };

  render() {
    const { type, children } = this.props;
    const messageClasses = classnames('message', { warning: type === 'warning', error: type === 'error' });
    return (
      <div className="message-wrapper">
        {type !== 'placeholder' && <div className={messageClasses}>{children}</div>}
      </div>
    );
  }
}

export default Message;
