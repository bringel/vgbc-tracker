//@flow
import './UserList.scss';

import * as React from 'react';
import { upperFirst } from 'lodash-es';
import superagent from 'superagent';

import type { User } from '../../types/User';
import Button from '../../components/Button';

type Props = {
  users: Array<User>
};

class UserList extends React.Component<Props> {
  handleUserActionButton = (user: User) => {
    let payload = {
      userID: user.userID,
      role: ''
    };

    if (user.role === 'user') {
      payload.role = 'user';
      console.log('making user an admin');
    } else {
      payload.role = 'admin';
      console.log('removing admin privileges');
    }

    superagent
      .post('/updaterole')
      .send(payload)
      .then((response) => {
        console.log(response);
      });
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
                  <div>{user.displayName}</div>
                  <div>{user.email}</div>
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
