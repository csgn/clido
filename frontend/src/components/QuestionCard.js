import React from 'react';
import moment from 'moment';
import axios from 'axios';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleWithdraw(event) {
    event.preventDefault();

    axios.post(`/api/question/${this.props.question._id}/withdraw`).then(() => {
      // console.log(`Question ${this.props.question._id} withdrawn`);
      this.props.fetchEventQuestions();
    });
  }

  handleEdit(event) {
    event.preventDefault();

    console.log(this.props.question._id);
  }

  async handleVote(event) {
    event.preventDefault();

    let voteStatus = 'vote';

    this.props.question.vote.forEach((el) => {
      if (el.userId === this.props.currentUser.id) {
        voteStatus = 'unvote';
      }
    });

    await axios
      .post(`/api/question/${this.props.question._id}/${voteStatus}`, {
        userId: this.props.currentUser.id,
      })
      .then(() => {
        this.props.fetchEventQuestions();
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
                <div className={`${this.props.currentUser ? '' : 'd-none'}`}>
                  <button
                    className="btn rounded"
                    type="button"
                    id="propertiesMenu"
                    onClick={this.handleVote}
                  >
                    <span className="pe-2 text-dark">
                      {this.props.question.vote.length}
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

            <div
              className={`col-12 text-dark ${
                this.props.currentUser &&
                this.props.currentUser.id === this.props.question.userId
                  ? ''
                  : 'd-none'
              }`}
            >
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
                    <button
                      className="dropdown-item bg-light text-dark"
                      onClick={this.handleWithdraw}
                    >
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
