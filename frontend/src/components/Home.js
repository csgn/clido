/* eslint-disable jsx-a11y/alt-text */
import './Home.css';

import React from 'react';

import LastEvent from './LastEvent';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = { eventId: '', spinnerActive: false };
  }

  handleInput(event) {
    event.preventDefault();

    this.setState({ spinnerActive: true });
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="home row justify-content-center">
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
                  })
                }
              />
            </form>
            <p
              className="mt-3 text-center small text-muted"
              style={{ fontSize: '12px' }}
            >
              By using this app I agree to the
              <a href="/" className="text-decoration-none ps-2">
                Acceptable Use
              </a>
            </p>
            <div
              className={`d-flex justify-content-center ${
                this.state.spinnerActive ? '' : 'd-none'
              }`}
            >
              <div
                className="spinner-grow mt-5"
                role="status"
                style={{ color: '#00cc66' }}
              >
                <span className="sr-only">Loading</span>
              </div>
            </div>
          </div>
        </div>
        <LastEvent currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default Home;
