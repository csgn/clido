import './Toast.css';
import React from 'react';

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isHidden: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.toggleToast();
    }, 1500);
  }

  componentWillUnmount() {
    this.setState({ isHidden: true });
  }

  render() {
    return (
      <div
        className={`clido-toast animate__animated animate__fadeInLeft ${
          this.state.isHidden ? 'd-none' : ''
        }`}
      >
        <div className="m-3 pt-1">
          <i className="fas fa-info-circle me-2"></i>
          <span className="">Event Removed</span>
        </div>
      </div>
    );
  }
}

export default Toast;
