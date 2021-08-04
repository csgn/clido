import './EventDetail.css';

import React from 'react';
import axios from 'axios';

import { toFinalDate } from './DateUtils';

import QuestionCard from './QuestionCard';
import { Redirect } from 'react-router-dom';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);

    this.fetchEventQuestions = this.fetchEventQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      event: null,
      questions: [],
      nameInput: '',
      contextInput: '',
      redirect: false,
    };
  }

  handleChange(event) {
    this.setState({
      contextInput: event.target.value,
    });
  }

  async handleInput(event) {
    event.preventDefault();

    const questionData = {
      userId: this.props.currentUser.id,
      name: this.state.nameInput || 'Anonymous',
      context: this.state.contextInput,
      date: new Date(Date.now()),
      vote: [],
    };

    await axios.post(
      `/api/question/${this.props.match.params.eventId}/create`,
      {
        ...questionData,
      }
    );

    this.fetchEventQuestions();

    this.setState({ contextInput: '' });
  }

  async fetchEvent() {
    await axios
      .get(`/api/event/${this.props.match.params.eventId}`)
      .then((res) => {
        this.setState({ event: res.data.event });
      })
      .catch((err) => {
        this.setState({ redirect: true });
      });
  }

  async fetchEventQuestions() {
    await axios
      .post(`/api/question/${this.props.match.params.eventId}/all`, {})
      .then((res) => this.setState({ questions: res.data }));
  }

  componentDidMount() {
    this.fetchEvent();
    this.fetchEventQuestions();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    const renderedQuestionCards =
      this.state.questions.length !== 0 ? (
        this.state.questions.map((question) => {
          return (
            <li className="list-item pb-3" key={question._id}>
              <QuestionCard
                question={question}
                fetchEventQuestions={this.fetchEventQuestions}
                currentUser={this.props.currentUser}
              />
            </li>
          );
        })
      ) : (
        <div className="text-center">
          <span className="h5 text-warning">
            <i className="fas fa-info me-2"></i>
            There are no questions asked yet.
          </span>
          <br />
        </div>
      );

    return (
      <>
        <div className="row mt-5">
          {this.state.event && (
            <div className="col-md-4 mt-5">
              <div className="h4 text-light">
                {this.state.event.eventName || null}
              </div>
              <div className="h5 text-muted">
                {toFinalDate({ ...this.state.event }) || null}
              </div>
              <div className="h6 text-muted">
                #{this.state.event.eventId || null}
              </div>
            </div>
          )}

          <div className="col-md-8 mt-5" style={{ maxWidth: '35rem' }}>
            <div className="row">
              <div
                className={`col-md-12 ${
                  !this.props.currentUser ? 'd-none' : ''
                }`}
              >
                <span className="text-light h6 text-muted">
                  Ask the speaker
                </span>
                <form
                  className="fw-bold input-group input-group-lg mt-4"
                  style={{ borderRadius: '6px' }}
                  onSubmit={this.handleInput}
                >
                  <div
                    className="bg-light"
                    style={{ width: '35rem', borderRadius: '5px' }}
                  >
                    <textarea
                      className="remove-border form-control bg-light mt-3 ps-3 pe-3"
                      placeholder="Type your question"
                      style={{
                        resize: 'none',
                        border: 'none',
                        overflow: 'hidden',
                      }}
                      value={this.state.contextInput}
                      onChange={this.handleChange}
                      required
                    />
                    <span
                      className={`d-flex justify-content-end pe-3 ${
                        this.state.contextInput.length > 140
                          ? 'text-danger'
                          : 'text-muted'
                      }`}
                    >
                      {140 - this.state.contextInput.length}
                    </span>
                    <div className="d-flex justify-content-between">
                      <div>
                        <i className="fas fa-user mt-4 ps-3 fa-lg"></i>
                        <span className="ps-2 text-muted">
                          <input
                            className="remove-border"
                            type="text"
                            placeholder="Your name (optional)"
                            maxLength="20"
                            style={{ border: 'none' }}
                            value={this.state.nameInput}
                            onChange={(e) =>
                              this.setState({ nameInput: e.target.value })
                            }
                          ></input>
                        </span>
                      </div>
                      <button
                        className={`btn btn-primary m-3 ${
                          this.state.contextInput.length > 140 ? 'disabled' : ''
                        }`}
                        style={{ backgroundColor: '#00cc66', border: 'none' }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-md-12 mt-5">
                {this.state.questions.length > 0 && (
                  <div className="d-flex justify-content-between">
                    <span className="text-light h6 text-muted">Popular</span>
                    <span className="text-light h6 text-muted">
                      {this.state.questions.length} questions
                    </span>
                  </div>
                )}
                <ul className="list-group">{renderedQuestionCards}</ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EventDetail;
