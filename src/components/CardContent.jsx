import React, { Component } from 'react';
import './reset.css';
import './CardContent.css';
import { MdDelete, MdModeEdit } from 'react-icons/md';

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
        <div className="card-left">
          <p className="card-title">
            {this.props.technology}
          </p>
          <p className="card-content"><a href={this.props.url}>{this.props.content}</a></p>
          <p className="card-type-content">{this.props.type}</p>
          <div className="card-priority ">{this.props.priority}</div>
        </div>

        <div className="card-right">
          <p className="card-workload">{this.formatTime(this.props.workload)}</p>
          <div className="card-buttons-actions">
            <button type="submit" className="card-button">
              <MdModeEdit />
            </button>
            <button type="submit" className="card-button" onClick={this.delete.bind(this)}>
              <MdDelete />
            </button>
          </div>
        </div>

      </section>
    );
  }
}

export default CardContent;
