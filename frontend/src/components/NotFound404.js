/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

class NotFound404 extends React.Component {
  render() {
    return (
      <div className="text-center mt-5 pb-5">
        <img src="https://i.imgur.com/u4Xt4Yn.png"></img>
        <h1 className="h1 animate__animated animate__flash text-danger">
          <i className="fas fa-exclamation me-2"></i>
          404 Not Found
        </h1>
      </div>
    );
  }
}

export default NotFound404;
