import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="col-12 fs-3 fw-bold">
        <div className="nav d-flex justify-content-between">
          <NavLink
            to="/"
            className="text-center text-decoration-none ms-5"
            activeStyle={{ color: '#fff' }}
          >
            <i className="fas fa-home"></i>
          </NavLink>

          <NavLink
            to="/"
            className="text-center text-decoration-none"
            activeStyle={{ color: '#00CC66' }}
          >
            clido
          </NavLink>

          {this.props.currentUser && (
            <NavLink
              to={`/user/${this.props.currentUser.id}`}
              className="text-center text-decoration-none me-5"
              style={{ color: '#fff' }}
            >
              <i className="fas fa-user"></i>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
