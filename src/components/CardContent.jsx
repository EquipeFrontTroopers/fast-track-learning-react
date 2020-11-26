import React, { Component } from 'react';
import './reset.css';
import './CardContent.css';

import { MdDelete, MdModeEdit } from 'react-icons/md';
import PrimaryButton from './PrimaryButton';

class CardContent extends Component {
  delete() {
    const { id } = this.props;
    console.log(this.props);
    this.props.deleteCard(id);
  }

  formatTime(hours) {
    if (!hours) {
      return '';
    }
    if (hours > 2) {
      return `${hours} Horas`;
    }
    return `${hours} Hora`;
  }

  render() {
    return (
      <section className="card">

        <div className="card-header">
          <div className="card-content-technology">
            <p>{this.props.technology}</p>
          </div>
          <div className="card-content-workload">
            <p>{this.formatTime(this.props.workload)}</p>

          </div>
        </div>

        <div className="card-container-content">
          <p className="card-content"><a href={this.props.url}>{this.props.content}</a></p>
          <p className="card-content-type">{this.props.type}</p>
        </div>

        <div className="card-footer">
          <div className="card-container-priority">
            <div className="card-content-priority">{this.props.priority}</div>
          </div>
          <div className="card-container-button">
            <PrimaryButton onClick={() => alert('oi')}><MdModeEdit /></PrimaryButton>
            <PrimaryButton onClick={this.delete.bind(this)}><MdDelete /></PrimaryButton>

          </div>
        </div>

      </section>
    );
  }
}

export default CardContent;
