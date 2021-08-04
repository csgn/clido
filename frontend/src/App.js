import './App.css';
import React from 'react';

import Header from './components/Header';
import Navigation from './components/Navigation';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getCurrentUser = this.getCurrentUser.bind(this);

    this.state = { currentUser: null };
  }

  async getCurrentUser() {
    const user = await axios.get('/api/auth/currentuser');
    this.setState({ currentUser: user.data.currentUser });
  }

  async componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <Header currentUser={this.state.currentUser} />
        </div>
        <Navigation
          currentUser={this.state.currentUser}
          getCurrentUser={this.getCurrentUser}
        />
      </div>
    );
  }
}

export default App;
