import React, { Component } from 'react';
import '../../style/reset.css';
import './CardContent.css';

import { MdDelete, MdModeEdit } from 'react-icons/md';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

class CardContent extends Component {
  delete() {
    const { id } = this.props;
    this.props.deleteCard(id);
  }

  edit() {
    const { id } = this.props;
    this.props.editCard(id);
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
        <a target="_blank" rel="noopener noreferrer" href={this.props.url} className="card-link">
          <div className="card-header">
            <div className="card-content-technology">
              <p>{this.props.technology}</p>
            </div>
            <div className="card-content-workload">
              <p>{this.formatTime(this.props.workload)}</p>
            </div>
          </div>

          <div className="card-container-content">

            <p className="card-content">{this.props.content}</p>
            <p className="card-content-type">{this.props.type}</p>
          </div>
        </a>
        <div className="card-footer">
          <div className="card-container-priority">
            <div className="card-content-priority">{this.props.priority}</div>
          </div>
          <div className="card-container-button">
            <PrimaryButton
              onClick={this.edit.bind(this)}
              disable={this.props.disableActions}
            >
              <MdModeEdit />

            </PrimaryButton>
            <PrimaryButton
              onClick={this.delete.bind(this)}
              disable={this.props.disableActions}
            >
              <MdDelete />

            </PrimaryButton>
          </div>
        </div>

      </section>
    );
  }
}

export default CardContent;
