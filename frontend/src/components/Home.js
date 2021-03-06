/* eslint-disable jsx-a11y/alt-text */
import './Home.css';
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      eventId: '',
      loading: false,
      error: null,
      redirect: false,
    };
  }

  async handleInput(event) {
    event.preventDefault();

    if (this.state.eventId.length < 6) {
      this.setState({
        error: 'Please enter an event code',
      });
    } else {
      this.setState({ loading: true }, async () => {
        try {
          const response = await axios.get(`/api/event/${this.state.eventId}`);
          this.setState({
            loading: false,
            redirect: true,
            event: response.data.event,
          });
        } catch (e) {
          this.setState({
            loading: false,
            error: e.response.data.errors[0].message,
          });
        }
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    if (this.state.redirect) {
    }

    return (
      <div className="home row justify-content-center animate__animated animate__fadeIn">
        <div className="col-12 d-flex justify-content-center mt-5 pt-5">
          <div>
            <form
              className="fw-bold input-group input-group-lg flex-nowrap"
              onSubmit={this.handleInput}
            >
              <span
                className="input-group-text fs-4 text-light fw-bold"
                style={{
                  backgroundColor: '#00CC66',
                  border: '1px #00cc66 solid',
                }}
              >
                #
              </span>
              <input
                className="form-control"
                type="text"
                placeholder="enter code here"
                aria-label="event-id"
                aria-describedby="addon-wrapping"
                minLength="6"
                maxLength="6"
                style={{
                  width: '22rem',
                  height: '3.4rem',
                  borderRadius: '0 5px 5px 0',
                }}
                value={this.state.eventId}
                onChange={(e) =>
                  this.setState({
                    eventId: e.target.value,
                    error: null,
                  })
                }
              />
            </form>
            <p
              className="mt-3 text-center small text-muted"
              style={{ fontSize: '12px' }}
            >
              By using this app I agree to the
              <a
                href="/"
                className="text-decoration-none ps-2"
                style={{ color: '#00cc66' }}
              >
                Acceptable Use
              </a>
            </p>

            <div className="d-flex justify-content-center mt-5">
              {this.state.error && (
                <div className="text-danger animate__animated animate__slideInDown">
                  <span>
                    <i className="fas fa-exclamation me-2"></i>
                    {this.state.error}
                  </span>
                </div>
              )}

              {this.state.loading ? (
                <div
                  className="spinner-grow mt-5"
                  role="status"
                  style={{ color: '#00cc66' }}
                >
                  <span className="sr-only">Loading</span>
                </div>
              ) : (
                <>
                  {this.state.redirect && (
                    <Redirect to={`/event/${this.state.eventId}`} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {!this.props.currentUser && (
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center">
              <NavLink to="/signup" className="btn btn-primary">
                Create account
              </NavLink>
            </div>
            <div className="col-12 d-flex justify-content-center mt-3">
              <span className="text-muted me-2">Already have an account?</span>
              <NavLink to="/signin" className="text-decoration-none fw-bold">
                Sign In
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
