import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Signout from './Signout';
import UserDetail from './UserDetail';
import CreateEvent from './CreateEvent';
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

          {this.props.currentUser && (
            <Route path="/create-event">
              <CreateEvent currentUser={this.props.currentUser} />
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

          {this.props.currentUser && (
            <Route path="/signout">
              <Signout getCurrentUser={this.props.getCurrentUser} />
            </Route>
          )}

          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>

        <footer
          className="footer fixed-bottom flex-shrink-3 mt-auto py-3 bg-dark"
          style={{
            borderTop: '0.5px #cccccc solid',
          }}
        >
          <div className="container d-flex justify-content-center">
            <Link to="/" className="me-2 text-light text-decoration-none">
              <i className="fas fa-home me-2"></i>
              Home <span className="text-muted">|</span>
            </Link>
            {this.props.currentUser && (
              <Link
                to={`/user/${this.props.currentUser.id}`}
                className="me-2 text-light text-decoration-none"
              >
                <i className="fas fa-user-alt me-2"></i>
                Account <span className="text-muted">|</span>
              </Link>
            )}
            {this.props.currentUser && (
              <Link
                to="/create-event"
                className="me-2 text-light text-decoration-none"
              >
                <i className="fas fa-plus me-2"></i>
                Create Event <span className="text-muted">|</span>
              </Link>
            )}
            {this.props.currentUser && (
              <Link to="/signout" className="text-light text-decoration-none">
                <i className="fas fa-sign-out-alt me-2"></i>
                Sign-Out
              </Link>
            )}

            {!this.props.currentUser && (
              <Link
                to="/signin"
                className="text-light text-decoration-none me-2"
              >
                <i className="fas fa-door-open me-2"></i>
                Sign-In <span className="text-muted">|</span>
              </Link>
            )}
            {!this.props.currentUser && (
              <Link to="/signup" className="text-light text-decoration-none">
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign-Up
              </Link>
            )}
          </div>
        </footer>
      </Router>
    );
  }
}

export default Navigation;
