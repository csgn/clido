import React from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      email: '',
      password: '',
      errorOrRedirect: '',
    };
  }

  async handleInput(event) {
    event.preventDefault();

    try {
      await axios.post(
        '/api/auth/signin',
        {
          email: this.state.email,
          password: this.state.password,
        },
        { withCredentials: true }
      );
      this.setState({ errorOrRedirect: <Redirect push to="/" /> });
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
        className="row d-flex justify-content-center text-center pb-5 mt-5 animate__animated animate__fadeIn"
        onSubmit={this.handleInput}
      >
        <h3 className="h3 text-light">Sign In</h3>
        <div className="col-12 d-flex justify-content-center mt-2">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              style={{ width: '22rem' }}
              placeholder="Email"
              required
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-3">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              style={{ width: '22rem' }}
              placeholder="Password"
              required
              value={this.state.password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
            <label htmlFor="floatingInput">Password</label>
          </div>
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-outline-success mb-3 mt-3"
            style={{
              backgroundColor: '#00cc66',
              border: '1px #00cc66 solid',
              color: '#ffffff',
            }}
          >
            Sign In
          </button>
        </div>
        {this.state.errorOrRedirect}
      </form>
    );
  }
}

export default Signin;
