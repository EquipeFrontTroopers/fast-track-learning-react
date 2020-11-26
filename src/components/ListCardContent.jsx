import React, { Component } from 'react';
import CardContent from './CardContent';
import './ListCardContent.css';

class ListCardContent extends Component {
  render() {
    return (
      <div className="list-card-container">
        <ul className="list-card">
          {this.props.listaConteudos.map((item, index) => (
            <li key={index} className="list-card-item">
              <CardContent
                indice={index}
                conteudo={item.conteudo}
                tecnologia={item.tecnologia}
                tipo={item.tipo}
                url={item.url}
                cargaHoraria={item.cargaHoraria}
                prioridade={item.prioridade}
                deletarCard={this.props.deletarCard}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListCardContent;
