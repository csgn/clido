import React from 'react';

import axios from 'axios';

import EventCard from './EventCard';
import Toast from './Toast';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.fetchUserEvents = this.fetchUserEvents.bind(this);
    this.showToast = this.showToast.bind(this);

    this.state = { events: [], toast: false };
  }

  async fetchUserEvents() {
    const events = await axios.post('/api/event/all', {
      userId: this.props.currentUser.id,
    });

    this.setState({ events: events.data });
  }

  async showToast() {
    this.setState({ toast: !this.state.toast });
  }

  componentDidMount() {
    this.fetchUserEvents();
  }

  render() {
    const renderedEventCards =
      this.state.events.length !== 0 ? (
        this.state.events.map((event) => {
          return (
            <li
              className="list-group-item bg-dark border-dark"
              key={event.eventId}
            >
              <EventCard
                event={event}
                userId={this.props.currentUser.id}
                fetchUserEvents={this.fetchUserEvents}
                showToast={this.showToast}
              />
            </li>
          );
        })
      ) : (
        <div className="text-center">
          <span className="h5 text-danger me-3">
            There are no clido's scheduled here.
          </span>
          <br />
          <a
            href="/create-event"
            className="btn btn-success mt-5"
            style={{ backgroundColor: '#00cc66' }}
          >
            Create Event
          </a>
        </div>
      );

    return (
      <>
        <div
          className="text-light d-flex justify-content-center animate__animated animate__fadeIn mt-6"
          style={{ marginBottom: '49px' }}
        >
          <ul className="list-group">{renderedEventCards}</ul>
        </div>

        {this.state.toast && <Toast showToast={this.showToast} />}
      </>
    );
  }
}
export default UserDetail;
