import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Signout from './Signout';
import UserDetail from './UserDetail';
import EventDetail from './EventDetail';
import CreateEvent from './CreateEvent';
import NotFound404 from './NotFound404';

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Home
              currentUser={this.props.currentUser}
              getCurrentUser={this.props.getCurrentUser}
            />
          </Route>

          <Route
            path={`/event/:eventId?`}
            component={(props) => (
              <EventDetail currentUser={this.props.currentUser} {...props} />
            )}
          />

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

          {this.props.currentUser && (
            <route path="/signout">
              <Signout getCurrentUser={this.props.getCurrentUser} />
            </route>
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
      </div>
    );
  }
}

export default Navigation;
