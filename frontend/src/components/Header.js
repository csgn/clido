import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="col-12 fs-3 fw-bold" style={{ maxWidth: '35rem' }}>
        <div className="nav d-flex justify-content-between">
          <div className="m-3">
            <NavLink
              to="/"
              className="text-center text-decoration-none"
              activeStyle={{ color: '#fff' }}
            >
              <i className="fas fa-home fa-md"></i>
            </NavLink>
          </div>

          <div className="m-3 ps-3">
            <NavLink
              to="/"
              className="text-center text-decoration-none"
              activeStyle={{ color: '#00CC66' }}
            >
              clido
            </NavLink>
          </div>

          <div className="dropdown m-3">
            <button
              className="btn rounded"
              type="button"
              id="propertiesMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user text-light fa-lg"></i>
            </button>
            <ul
              className="dropdown-menu bg-dark justify-content-center animate__animated animate__fadeIn"
              style={{
                borderColor: '#00cc66',
              }}
              aria-labelledby="propertiesMenu"
            >
              {this.props.currentUser ? (
                <>
                  <li>
                    <NavLink
                      to={`/user/${this.props.currentUser.id}`}
                      className="dropdown-item bg-dark text-light"
                    >
                      <i className="fas fa-marker me-2"></i>
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signout"
                      className="dropdown-item bg-dark text-light"
                    >
                      <i className="fas fa-sign-out me-2"></i>
                      Sign Out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/signin"
                      className="dropdown-item bg-dark text-light"
                    >
                      <i className="fas fa-sign-in me-2"></i>
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="dropdown-item bg-dark text-light"
                    >
                      <i className="fas fa-door-open me-2"></i>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
