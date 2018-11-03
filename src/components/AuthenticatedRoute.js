//@flow
import * as React from 'react';
import { Route, Redirect, type ContextRouter } from 'react-router';
import FirebaseContext from '../firebase-context';

type Props = {
  component?: React$ComponentType<*>,
  render?: (router: ContextRouter) => React$Node,
  children?: React$ComponentType<ContextRouter> | React$Node,
  path?: string,
  exact?: boolean
};

class AuthenticatedRoute extends React.Component<Props> {
  static contextType = FirebaseContext;

  render() {
    if (this.context.isLoggedIn) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
