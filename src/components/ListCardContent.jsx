import React, { Component } from 'react';
import CardContent from './CardContent';
import './ListCardContent.css';

class ListCardContent extends Component {
  render() {
    return (
      <div className="list-card-container">
        <ul className="list-card">
          { this.props.listContents.map((item) => (
            <li key={item.id} className="list-card-item">
              <CardContent
                id={item.id}
                content={item.conteudo}
                technology={item.tecnologia}
                type={item.tipoConteudoId}
                url={item.url}
                workload={item.carga_horaria}
                priority={item.prioridadeId}
                deleteCard={this.props.deleteCard}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListCardContent;
