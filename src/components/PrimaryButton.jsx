import React, { Component } from 'react';
import './PrimaryButton.css';

class PrimaryButton extends Component {
  render() {
    return (
      <button type="button" className="primary-button" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default PrimaryButton;
