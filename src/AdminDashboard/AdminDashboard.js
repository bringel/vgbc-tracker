//@flow
import * as React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import { AccentColorUpdate } from '../themeContext';
import SuggestionsTab from './Suggestions/SuggestionsTab';
// import TabView from '../components/TabView';
// import TabViewTab from '../components/TabViewTab';
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'User Management' })}
              onClick={() => {
                this.handleTabChanged('User Management');
              }}>
              User Management
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'Game Suggestions' })}
              onClick={() => {
                this.handleTabChanged('Game Suggestions');
              }}>
              Game Suggestions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="User Management">
            <UserManagementTab />
          </TabPane>
          <TabPane tabId="Game Suggestions">
            <SuggestionsTab />
          </TabPane>
        </TabContent>
        {/* <TabView activeTab={this.state.activeTab} onTabClicked={this.handleTabChanged}>
          <TabViewTab tabTitle="User Management">
            <UserManagementTab />
          </TabViewTab>
          <TabViewTab tabTitle="Game Suggestions">
            <SuggestionsTab />
          </TabViewTab>
        </TabView> */}
      </div>
    );
  }
}

export default AdminDashboard;
