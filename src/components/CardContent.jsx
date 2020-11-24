import React, { Component } from 'react';
import './reset.css';
import './CardContent.css';
import { MdDelete, MdModeEdit } from 'react-icons/md';

class CardContent extends Component {
  apagar() {
    const { indice } = this.props;
    console.log(this.props);
    this.props.deletarCard(indice);
  }

  render() {
    return (
      <section className="card">
        <div className="card-left">
          <p className="card-title">
            {this.props.tecnologia}
          </p>
          <p className="card-content"><a href={this.props.url}>{this.props.conteudo}</a></p>
          <p className="card-type-content">{this.props.tipo}</p>
          <div className="card-priority ">{this.props.prioridade}</div>
        </div>

        <div className="card-right">
          <p className="card-hour">{`${this.props.cargaHoraria} horas`}</p>
          <div className="card-buttons-actions">
            <button type="submit" className="card-button">
              <MdModeEdit />
            </button>
            <button type="submit" className="card-button" onClick={this.apagar.bind(this)}>
              <MdDelete />
            </button>
          </div>
        </div>

      </section>
    );
  }
}

export default CardContent;
