import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class QuestionCard extends React.Component {
  render() {
    return (
      <div
        className="card border-light shadow mt-3"
        style={{ maxWidth: '35rem' }}
      >
        <div className="row g-0">
          <div className="card-body bg-light">
            <div className="col-12 text-dark">
              <div className="card-title d-flex justify-content-between">
                <div>
                  <i className="fas fa-user text-dark pe-2 h5 m-2"></i>
                  <span className="text-muted h5">
                    {this.props.question.name}
                  </span>
                  <div className="card-subititle text-muted h6 ps-1">
                    {moment(new Date(this.props.question.date)).fromNow()}
                  </div>
                </div>
                <div>
                  <button
                    className="btn rounded"
                    type="button"
                    id="propertiesMenu"
                  >
                    <span className="pe-2 text-dark">
                      {this.props.question.vote}
                    </span>
                    <i className="fas fa-heart text-dark fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 text-dark fs-5">
              <div className="card-text text-break m-2">
                {this.props.question.context}
              </div>
            </div>

            <div className="col-12 text-dark">
              <div className="dropdown d-flex flex-row-reverse">
                <button
                  className="btn rounded"
                  type="button"
                  id="propertiesMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-h fa-lg text-dark"></i>
                </button>

                <ul
                  className="dropdown-menu bg-light justify-content-center animate__animated animate__fadeIn shadow"
                  style={{
                    borderColor: '#fefefe',
                  }}
                  aria-labelledby="propertiesMenu"
                >
                  <li>
                    <NavLink
                      to="/"
                      className="dropdown-item bg-light text-dark"
                    >
                      <i className="fas fa-marker me-2"></i>
                      Edit
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item bg-light text-dark">
                      <i className="fas fa-trash me-2"></i>
                      Withdraw
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
