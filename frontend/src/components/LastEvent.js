import React from 'react';

class LastEvent extends React.Component {
  render() {
    return (
      <>
        {this.props.currentUser && (
          <div className="col-sm-6 col-sm-8 col-md-6 col-lg-4 mt-5 pt-5 pb-5">
            <p className="text-center mt-5 pt-5 fs-6 text-muted">
              Your last event
            </p>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Test Event</h5>
                <p className="card-text text-muted">#000000</p>
                <p className="card-text text-muted">Jul 01 - 06, 2021</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default LastEvent;
