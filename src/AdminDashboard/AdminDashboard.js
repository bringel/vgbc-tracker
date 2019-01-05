//@flow
import * as React from 'react';

import { AccentColorUpdate } from '../themeContext';
import TabView from '../components/TabView';
import TabViewTab from '../components/TabViewTab';

type Props = {};

type State = {
  activeTab: string
};

class AdminDashboard extends React.Component<Props, State> {
  state = {
    activeTab: 'Tab 1'
  };

  handleTabChanged = (tabTitle: string) => {
    this.setState({ activeTab: tabTitle });
  };

  render() {
    return (
      <>
        <AccentColorUpdate accentColor="orange" />
        <TabView activeTab={this.state.activeTab} onTabClicked={this.handleTabChanged}>
          <TabViewTab tabTitle="Tab 1">Tab 1 content</TabViewTab>
          <TabViewTab tabTitle="Tab 2">Tab 2 content</TabViewTab>
          <TabViewTab tabTitle="Tab 3">Tab 3 content</TabViewTab>
          <TabViewTab tabTitle="Tab 4">Tab 4 content</TabViewTab>
        </TabView>
      </>
    );
  }
}

export default AdminDashboard;
