//@flow
import * as React from 'react';
import { upperFirst } from 'lodash-es';
import axios from 'axios';
import { Button } from 'reactstrap';

import FirebaseContext from '../../firebase-context';
import type { FirebaseContextValue } from '../../firebase-context';
import type { User } from '../../types/User';

import './UserList.scss';

type Props = {
  users: Array<User>
};

class UserList extends React.Component<Props> {
  static contextType = FirebaseContext;
  context: FirebaseContextValue;

  handleUserActionButton = (user: User) => {
    if (user.userID !== this.context.currentUser.userID) {
      let payload = {
        userID: user.userID,
        role: ''
      };

      if (user.role === 'user') {
        payload.role = 'admin';
      } else {
        payload.role = 'user';
      }

      axios.post('/updaterole', payload);
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
                  <div className="info-row">
                    <div className="row-label">Display Name</div>
                    <div>{user.displayName}</div>
                  </div>
                  <div className="info-row">
                    <div className="row-label">Email</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="info-row">
                    <div className="row-label">Role</div>
                    <div>{upperFirst(user.role)}</div>
                  </div>
                  {/* <div>Display Name: {user.displayName}</div>
                  <div>Email: {user.email}</div>
                  <div>Role: {upperFirst(user.role)}</div> */}
                </div>
                <div className="user-actions-container">
                  <Button
                    color="primary"
                    outline
                    onClick={() => this.handleUserActionButton(user)}
                    disabled={user.userID === this.context.currentUser.userID}>
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
