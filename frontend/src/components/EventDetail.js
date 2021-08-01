import React from 'react';

class EventDetail extends React.Component {
  render() {
    return <div className="text-danger">{this.props.match.params.eventId}</div>;
  }
}

export default EventDetail;
