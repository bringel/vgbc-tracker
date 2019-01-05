//@flow
import * as React from 'react';

type Props = {
  children: React.Node
};

class TabView extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return children;
  }
}

export default TabView;
