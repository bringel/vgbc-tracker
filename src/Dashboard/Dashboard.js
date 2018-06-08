import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Dashboard.scss';

type Props = {
  loggedIn: boolean
};

class Dashboard extends Component<Props> {
  render() {
    return this.props.loggedIn ? <div className="dashboard" /> : <Redirect to="/login" />;
  }
}

export default Dashboard;
