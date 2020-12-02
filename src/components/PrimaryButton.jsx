import React, { Component } from 'react';
import './PrimaryButton.css';

class PrimaryButton extends Component {
  render() {
    console.log('BOTAOOO', this.props.disabled);
    return (

      <button
        type="button"
        className="primary-button"
        onClick={this.props.onClick}
        disabled={this.props.disable}
      >
        {this.props.children}
      </button>
    );
  }
}

export default PrimaryButton;
