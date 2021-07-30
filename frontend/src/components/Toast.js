import './Toast.css';
import React from 'react';

class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: true };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: !this.state.visible });
      this.props.showToast();
    }, 2500);
  }

  render() {
    return (
      <div className="animate__animated animate__fadeIn">
        {this.state.visible && (
          <div className="clido-toast ">
            <div className="m-3 pt-1">
              <i className="fas fa-info-circle me-2"></i>
              <span className="">Event Removed</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Toast;
