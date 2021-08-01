/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleShareButton = this.handleShareButton.bind(this);

    const { eventName, eventId } = props.event;

    const finalDate = this.toString({
      startDate: new Date(props.event.startDate),
      endDate: new Date(props.event.endDate),
    });

    this.state = { eventName, eventId, finalDate };
  }

  toString({ startDate, endDate }) {
    const startDateArray = startDate.toDateString().toString().split(' ');
    const endDateArray = endDate.toDateString().toString().split(' ');

    const sdd = startDateArray[2];
    const edd = endDateArray[2];

    const smm = startDateArray[1];
    const emm = endDateArray[1];

    const syy = startDateArray[3];
    const eyy = endDateArray[3];

    let finalDate = [];
    finalDate.push(sdd);

    if (smm === emm) {
      if (sdd !== edd) {
        finalDate.push('-');
        finalDate.push(edd);
      }
      finalDate.push(smm);
    } else {
      finalDate.push(smm);
      finalDate.push('-');
      finalDate.push(edd);
      finalDate.push(emm);
    }

    if (syy === eyy) {
      finalDate.push(syy);
    }

    return finalDate.join(' ').toString();
  }

  async handleRemoveButton() {
    await axios
      .post(`/api/event/${this.state.eventId}/remove`, {
        userId: this.props.userId,
      })
      .then((result) => {
        this.props.fetchUserEvents();
        this.props.toggleToast();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleShareButton() {}

  render() {
    return (
      <div
        className="card mb-3 bg-dark border-success"
        style={{ width: '29rem' }}
      >
        <div className="row g-0">
          <div className="col-auto">
            <i className="fas fa-calendar text-light mt-4 pt-2 ms-4"></i>
          </div>
          <NavLink
            className="col-8 text-decoration-none"
            to={`/event/${this.state.eventId}`}
          >
            <div className="card-body text-light">
              <div className="card-title">
                <span className="me-2 ps-2">{this.state.eventName}</span>
                <span className="text-muted">#{this.state.eventId}</span>
              </div>
              <div className="card-subtitle text-muted">
                <span className="ms-2" style={{ fontSize: '14px' }}>
                  {this.state.finalDate}
                </span>
              </div>
            </div>
          </NavLink>

          <div className="col-auto">
            <div className="dropdown">
              <button
                className="btn rounded mt-4 ms-5 pt-1 dropdown-toggle"
                type="button"
                id="propertiesMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v text-light"></i>
              </button>

              <ul
                className="dropdown-menu bg-dark justify-content-center animate__animated animate__fadeIn"
                style={{
                  borderColor: '#00cc66',
                }}
                aria-labelledby="propertiesMenu"
              >
                <li>
                  <NavLink
                    to={`/event/${this.state.eventId}`}
                    className="dropdown-item bg-dark text-light"
                  >
                    <i className="fas fa-marker me-2"></i>
                    Open
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item bg-dark text-light"
                    onClick={(e) => this.handleRemoveButton()}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Remove
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item bg-dark text-light"
                    onClick={(e) => this.handleShareButton()}
                  >
                    <i className="fas fa-share me-2"></i>
                    Share
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
