//@flow
import * as React from 'react';

import './Header.scss';

type Props = {
  userName: string,
  onLogout: () => void
};

const Header = (props: Props) => (
  <div className="header">
    <h1>Video Game Book Club Tracker</h1>
    <div className="user-container">
      <span className="user-name">{props.userName}</span>
      <span onClick={props.onLogout} className="logout-link">
        Logout
      </span>
    </div>
  </div>
);

export default Header;
