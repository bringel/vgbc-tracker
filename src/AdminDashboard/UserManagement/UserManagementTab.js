//@flow
import * as React from 'react';

import { type User } from '../../types/User';
import { usersCollection } from '../../services/firebase';
import UserList from './UserList';

type Props = {};

type State = {
  users: Array<User>
};

class UserManagementTab extends React.Component<Props, State> {
  state = {
    users: []
  };
  unsubscribeUsersCollection = null;

  componentDidMount() {
    this.unsubscribeUsersCollection = usersCollection().onSnapshot((snapshot) => {
      const users = snapshot.docs.map((userDoc) => ({
        userID: userDoc.id,
        ...userDoc.data()
      }));
      this.setState({ users: users });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeUsersCollection) {
      this.unsubscribeUsersCollection();
    }
  }

  render() {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
    );
  }
}

export default UserManagementTab;
