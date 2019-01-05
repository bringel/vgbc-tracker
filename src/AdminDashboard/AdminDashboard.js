//@flow
import * as React from 'react';

import { AccentColorUpdate } from '../themeContext';
import TabView from '../components/TabView';
import TabViewTab from '../components/TabViewTab';

type Props = {};

class AdminDashboard extends React.Component<Props> {
  render() {
    return (
      <>
        <AccentColorUpdate accentColor="orange" />
        <TabView activeTab="Tab 1">
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
