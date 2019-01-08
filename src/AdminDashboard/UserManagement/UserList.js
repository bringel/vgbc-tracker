//@flow
import './UserList.scss';

import * as React from 'react';

import type { User } from '../../types/User';
import Button from '../../components/Button';

type Props = {
  users: Array<User>
};

class UserList extends React.Component<Props> {
  render() {
    const { users } = this.props;
    return (
      <div className="user-list">
        {users.map((user) => {
          return (
            <div key={user.userID} className="user-row">
              <div className="user-info-container">
                <div>
                  {user.displayName} {user.email}
                </div>
                <div>Role: {user.role}</div>
              </div>
              <div className="user-actions-container">
                <Button buttonStyle="outline" onClick={() => {}}>
                  Make Admin
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserList;
