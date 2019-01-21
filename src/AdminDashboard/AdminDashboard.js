//@flow
import * as React from 'react';

import { AccentColorUpdate } from '../themeContext';
import SuggestionsTab from './Suggestions/SuggestionsTab';
import TabView from '../components/TabView';
import TabViewTab from '../components/TabViewTab';
import UserManagementTab from './UserManagement/UserManagementTab';

import './AdminDashboard.scss';

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
      <div className="admin-wrapper">
        <AccentColorUpdate accentColor="orange" />
        <TabView activeTab={this.state.activeTab} onTabClicked={this.handleTabChanged}>
          <TabViewTab tabTitle="User Management">
            <UserManagementTab />
          </TabViewTab>
          <TabViewTab tabTitle="Game Suggestions">
            <SuggestionsTab />
          </TabViewTab>
        </TabView>
      </div>
    );
  }
}

export default AdminDashboard;
