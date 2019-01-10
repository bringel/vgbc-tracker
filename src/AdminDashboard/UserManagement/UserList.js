//@flow
import './UserList.scss';

import { upperFirst } from 'lodash-es';
import * as React from 'react';

import type { User } from '../../types/User';
import Button from '../../components/Button';

type Props = {
  users: Array<User>
};

class UserList extends React.Component<Props> {
  handleUserActionButton = (user: User) => {
    if (user.role === 'user') {
      console.log('making user an admin');
    } else {
      console.log('removing admin privileges');
    }
  };

  render() {
    const { users } = this.props;
    return (
      <>
        <h2>All Users</h2>
        <ul className="user-list">
          {users.map((user) => {
            return (
              <li key={user.userID} className="user-row">
                <div className="user-info-container">
                  <div>
                    {user.displayName} {user.email}
                  </div>
                  <div>Role: {upperFirst(user.role)}</div>
                </div>
                <div className="user-actions-container">
                  <Button buttonStyle="outline" onClick={() => this.handleUserActionButton(user)}>
                    {user.role === 'user' ? 'Make Admin' : 'Remove Admin'}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default UserList;
