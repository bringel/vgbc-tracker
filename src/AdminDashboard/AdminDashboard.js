//@flow
import * as React from 'react';

import { AccentColorUpdate } from '../themeContext';
import TabView from '../components/TabView';
import TabViewTab from '../components/TabViewTab';

import UserManagementTab from './UserManagement/UserManagementTab';

type Props = {};

type State = {
  activeTab: string
};

class AdminDashboard extends React.Component<Props, State> {
  state = {
    activeTab: 'User Management'
  };

  handleTabChanged = (tabTitle: string) => {
    this.setState({ activeTab: tabTitle });
  };

  render() {
    return (
      <>
        <AccentColorUpdate accentColor="orange" />
        <TabView activeTab={this.state.activeTab} onTabClicked={this.handleTabChanged}>
          <TabViewTab tabTitle="User Management">
            <UserManagementTab />
          </TabViewTab>
        </TabView>
      </>
    );
  }
}

export default AdminDashboard;
