import React, { Component } from 'react';
import ListCardContent from './components/ListCardContent';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      conteudos: [],
    };
  }

  componentDidMount() {
    this.setState({
      conteudos: this.getConteudos(),
    });
  }

  getConteudos() {
    return [{
      id: 1,
      tecnologia: 'React',
      conteudo: 'Hooks',
      url: 'https://pt-br.reactjs.org/docs/hooks-state.html',
      tipo: 'Site',
      cargaHoraria: '2',
      prioridade: 'Obrigatória',
    },
    {
      id: 1,
      tecnologia: 'React',
      conteudo: 'Hooks',
      url: 'https://pt-br.reactjs.org/docs/hooks-state.html',
      tipo: 'Site',
      cargaHoraria: '2',
      prioridade: 'Obrigatória',
    },
    {
      id: 1,
      tecnologia: 'React',
      conteudo: 'Hooks',
      url: 'https://pt-br.reactjs.org/docs/hooks-state.html',
      tipo: 'Site',
      cargaHoraria: '2',
      prioridade: 'Obrigatória',
    },
    {
      id: 1,
      tecnologia: 'React',
      conteudo: 'Hooks',
      url: 'https://pt-br.reactjs.org/docs/hooks-state.html',
      tipo: 'Site',
      cargaHoraria: '2',
      prioridade: 'Obrigatória',
    }];
  }

  deletarCard(index) {
    const arrayCard = this.state.conteudos;
    arrayCard.splice(index, 1);
    this.setState({ conteudos: arrayCard });
  }

  render() {
    return (
      <div>
        <ListCardContent
          listaConteudos={this.state.conteudos}
          deletarCard={this.deletarCard.bind(this)}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
