import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import UserDetail from './UserDetail';
import NotFound404 from './NotFound404';

class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              currentUser={this.props.currentUser}
              getCurrentUser={this.props.getCurrentUser}
            />
          </Route>

          {this.props.currentUser && (
            <Route path={`/user/${this.props.currentUser.id}`}>
              <UserDetail currentUser={this.props.currentUser} />
            </Route>
          )}

          {!this.props.currentUser && (
            <Route path="/signin">
              <Signin />
            </Route>
          )}
          {!this.props.currentUser && (
            <Route path="/signup">
              <Signup />
            </Route>
          )}
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>

        <div className="m-5 pt-5">
          <div className="d-flex justify-content-center">
            <Link to="/" className="me-3 text-dark">
              Home
            </Link>

            {this.props.currentUser && (
              <Link
                to={`/user/${this.props.currentUser.id}`}
                className="me-3 text-dark"
              >
                Account
              </Link>
            )}

            {!this.props.currentUser && (
              <Link to="/signin" className="me-3 text-dark">
                Sign In
              </Link>
            )}
            {!this.props.currentUser && (
              <Link to="/signup" className="text-dark">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default Navigation;
