import React from 'react';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      error: false,
    };
  }

  toString(date) {
    return date.toISOString().split('T')[0];
  }

  handleRangeDate(startDate, selectedDate) {
    const resultDate = new Date(startDate.setDate(startDate.getDate() + 7));

    return resultDate - selectedDate < 0 ? true : false;
  }

  handleStartDate(event) {
    const selectedDate = new Date(event.target.value);

    if (this.state.endDate - selectedDate < 0) {
      this.setState({ endDate: selectedDate });
    }

    if (this.state.error) {
      const resultOrError = this.handleRangeDate(
        selectedDate,
        this.state.endDate
      );
      this.setState({ error: resultOrError });
    }

    this.setState({ startDate: selectedDate });
  }

  handleEndDate(event) {
    const selectedDate = new Date(event.target.value);
    const startDate = new Date(this.state.startDate);

    const resultOrError = this.handleRangeDate(startDate, selectedDate);

    this.setState({
      error: resultOrError,
      endDate: selectedDate,
    });
  }

  render() {
    return (
      <form className="row d-flex justify-content-center text-center pb-5 mt-5 animate__animated animate__fadeIn">
        <h3 className="h3 text-light">Schedule Clido</h3>
        <div className="col-12 d-flex justify-content-center mt-2">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              style={{ width: '25.5rem' }}
              placeholder="Event name"
              autoFocus
              required
            />
            <label htmlFor="floatingInput">Event name</label>
          </div>
        </div>
        <div className="col-6 mt-2 d-flex justify-content-end">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="date"
              style={{ width: '12rem' }}
              required
              min={this.toString(new Date(Date.now()))}
              value={this.toString(this.state.startDate)}
              onChange={(e) => this.handleStartDate(e)}
            />
            <label htmlFor="floatingInput">Start date</label>
          </div>
        </div>
        <div className="col-6 mt-2">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="date"
              style={{ width: '12rem' }}
              required
              min={this.toString(this.state.startDate)}
              value={this.toString(this.state.endDate)}
              onChange={(e) => this.handleEndDate(e)}
            />
            <label htmlFor="floatingInput">End date</label>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-2">
          {this.state.error && (
            <span className="text-danger animate__animated animate__slideInDown">
              <i className="fas fa-exclamation me-2"></i>
              Max. event length 1 week
            </span>
          )}
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className={`btn btn-outline-success mt-3 ${
              this.state.error ? 'disabled' : ''
            }`}
            style={{
              backgroundColor: '#00cc66',
              border: '1px #00cc66 solid',
              color: '#ffffff',
            }}
          >
            Schedule Clido
          </button>
        </div>
      </form>
    );
  }
}

export default CreateEvent;
