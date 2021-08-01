import React from 'react';
import { NavLink } from 'react-router-dom';
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
          <NavLink
            to="/create-event"
            className="btn btn-success mt-5"
            style={{ backgroundColor: '#00cc66' }}
          >
            Create Event
          </NavLink>
        </div>
      );

    return (
      <>
        <div
          className="text-light animate__animated animate__fadeIn mt-5 pt-5"
          style={{ marginBottom: '49px' }}
        >
          {this.state.events.length !== 0 && (
            <div>
              <div className="d-flex justify-content-between">
                <p className="m-auto ms-4">Active Events</p>
                <NavLink
                  to="/create-event"
                  className="btn btn-outline-primary me-4"
                >
                  <i className="fa fa-plus"></i>
                </NavLink>
              </div>

              <hr />
            </div>
          )}

          <div className="d-flex justify-content-center">
            <ul className="list-group">{renderedEventCards}</ul>
          </div>
        </div>
        {this.state.toastIsShown && <Toast toggleToast={this.toggleToast} />}
      </>
    );
  }
}
export default UserDetail;
