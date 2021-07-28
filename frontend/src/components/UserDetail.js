import React from 'react';

import axios from 'axios';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/event/create', {
      currentUser: this.props.currentUser,
      title: 'new event',
      date: Date.now(),
    });
  }

  render() {
    return (
      <div className="text-light justify-content-center animate__animated animate__fadeIn">
        {this.props.currentUser.email}
      </div>
    );
  }
}
export default UserDetail;
