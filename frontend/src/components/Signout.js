import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Signout extends React.Component {
  async componentDidMount() {
    await axios.post('/api/auth/signout', {});

    this.props.getCurrentUser();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Signout;
