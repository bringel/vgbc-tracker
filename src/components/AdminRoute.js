//@flow
import * as React from 'react';
import { Route, Redirect, type ContextRouter } from 'react-router';

import FirebaseContext, { type FirebaseContextValue } from '../firebase-context';

type Props = {
  component?: React$ComponentType<*>,
  render?: (router: ContextRouter) => React$Node,
  children?: React$ComponentType<ContextRouter> | React$Node,
  path?: string,
  exact?: boolean
};

class AdminRoute extends React.Component<Props> {
  static contextType = FirebaseContext;
  context: FirebaseContextValue;

  render() {
    if (this.context.isLoggedIn) {
      if (this.context.currentUser.role === 'admin') {
        return <Route {...this.props} />;
      }
    }
    return <Redirect to="/" />;
  }
}

export default AdminRoute;
