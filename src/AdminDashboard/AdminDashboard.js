//@flow
import * as React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink, Route, Switch, type Match, Redirect } from 'react-router-dom';

import { AccentColorUpdate } from '../themeContext';
import SuggestionsTab from './Suggestions/SuggestionsTab';
import UserManagementTab from './UserManagement/UserManagementTab';

import './AdminDashboard.scss';

type Props = {
  match: Match
};

class AdminDashboard extends React.Component<Props> {
  render() {
    return (
      <div className="admin-wrapper">
        <AccentColorUpdate accentColor="orange" />
        <Nav pills vertical className="admin-nav">
          <NavItem>
            <NavLink tag={RouterNavLink} to={`${this.props.match.path}/users`}>
              User Management
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RouterNavLink} to={`${this.props.match.path}/suggestions`}>
              Game Suggestions
            </NavLink>
          </NavItem>
        </Nav>
        <Switch>
          <Route path={`${this.props.match.path}/users`} render={() => <UserManagementTab />} />
          <Route path={`${this.props.match.path}/suggestions`} render={() => <SuggestionsTab />} />
          <Route exact render={() => <Redirect to={`${this.props.match.path}/users`} />} />
        </Switch>
      </div>
    );
  }
}

export default AdminDashboard;
