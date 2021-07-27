import React from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = { email: '', password: '', errorOrRedirect: '' };
  }

  async handleInput(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        '/api/auth/signup',
        {
          email: this.state.email,
          password: this.state.password,
        },
        { withCredentials: true }
      );
      console.log(response);
      this.setState({
        errorOrRedirect: <Redirect push to="/" />,
      });
    } catch (error) {
      const renderedErrors = (
        <div className="alert alert-danger m-2">
          <h4>Ooopss...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => {
              return <li key={err.message}> {err.message} </li>;
            })}
          </ul>
        </div>
      );
      this.setState({ errorOrRedirect: renderedErrors });
    }
  }

  render() {
    return (
      <form
        className="row d-flex justify-content-center pb-5 mt-5 text-center"
        onSubmit={this.handleInput}
      >
        <h3 className="h3">Sign Up</h3>
        <div className="col-12 d-flex justify-content-center mt-2">
          <input
            className="form-control"
            type="text"
            style={{ width: '22rem' }}
            placeholder="Email"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="col-12 d-flex justify-content-center mt-3">
          <input
            className="form-control"
            type="password"
            style={{ width: '22rem' }}
            placeholder="Password"
            minLength="4"
            maxLength="20"
            required
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mb-3 mt-3">
            Sign Up
          </button>
        </div>
        {this.state.errorOrRedirect}
      </form>
    );
  }
}

export default Signup;
