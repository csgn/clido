import React from 'react';

class UserDetail extends React.Component {
  render() {
    return <div>{this.props.currentUser.email}</div>;
  }
}
export default UserDetail;
