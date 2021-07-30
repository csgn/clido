import React from 'react';

import axios from 'axios';

import EventCard from './EventCard';
import Toast from './Toast';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.fetchUserEvents = this.fetchUserEvents.bind(this);
    this.toggleToast = this.toggleToast.bind(this);

    this.state = { events: [], toastIsShown: false };
  }

  async fetchUserEvents() {
    const events = await axios.post('/api/event/all', {
      userId: this.props.currentUser.id,
    });

    this.setState({ events: events.data });
  }

  toggleToast() {
    this.setState({ toastIsShown: !this.state.toastIsShown });
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
                toggleToast={this.toggleToast}
              />
            </li>
          );
        })
      ) : (
        <div className="text-center">
          <span className="h5 text-warning">
            <i className="fas fa-info me-2"></i>
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
          className="text-light d-flex justify-content-center animate__animated animate__fadeIn mt-5 pt-5"
          style={{ marginBottom: '49px' }}
        >
          <ul className="list-group">{renderedEventCards}</ul>
        </div>
        {this.state.toastIsShown && <Toast toggleToast={this.toggleToast} />}
      </>
    );
  }
}
export default UserDetail;
