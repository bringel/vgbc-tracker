//@flow
import * as React from 'react';

type Props = {
  tabTitle: string,
  children: React.Node
};

class TabViewTab extends React.Component<Props> {
  render() {
    return this.props.children;
  }
}

export default TabViewTab;
