import React, { Component } from 'react';
import axios from 'axios';
import { MdAddCircleOutline } from 'react-icons/md';
import ListCardContent from './components/ListCardContent';
import FormContent from './components/FormContent';
import PrimaryButton from './components/PrimaryButton';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    this.getContent();
  }

  async getContent() {
    const contentResponse = await axios.get('http://localhost:3000/conteudos');
    const contents = contentResponse.data;

    const prioritiesResponse = await axios.get('http://localhost:3000/prioridades');
    const priorities = prioritiesResponse.data;

    const typeResponse = await axios.get('http://localhost:3000/tipoConteudos');
    const type = typeResponse.data;

    const technologyResponse = await axios.get('http://localhost:3000/tecnologias');
    const technology = technologyResponse.data;

    const priorityOfContent = this.addPriorityDescription(contents, priorities);
    const typeOfContent = this.addTypeDescription(priorityOfContent, type);
    const technologyOfContent = this.addTechnologyName(typeOfContent, technology);

    this.setState({
      contents: technologyOfContent,
    });
  }

  deleteCard(id) {
    axios.delete(`http://localhost:3000/conteudos/${id}`).then(() => {
      const items = this.state.contents;
      const result = items.filter((contents) => contents.id !== id);
      this.setState({ contents: result });
    });
  }

  addPriorityDescription(contents, priorities) {
    const result = contents.map((item) => {
      const prioritiesContent = priorities.find(
        (priorityItem) => item.prioridadeId === priorityItem.id,
      );
      const newItem = item;
      newItem.priorityDescription = prioritiesContent.descricao;
      return item;
    });
    return result;
  }

  addTypeDescription(contents, type) {
    const result = contents.map((item) => {
      const typeOfContent = type.find(
        (typeItem) => item.tipoConteudoId === typeItem.id,
      );
      const newItem = item;
      newItem.typeDescription = typeOfContent.descricao;
      return item;
    });
    return result;
  }

  addTechnologyName(contents, technology) {
    const result = contents.map((item) => {
      const technologyOfContent = technology.find(
        (technologyItem) => item.tecnologiaId === technologyItem.id,
      );
      const newItem = item;
      newItem.technologyName = technologyOfContent.nome;
      return item;
    });
    return result;
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <PrimaryButton onClick={() => alert('oi')}>
          <MdAddCircleOutline />
          Adicionar Conteúdo
        </PrimaryButton>
        <FormContent />
        <ListCardContent
          listContents={this.state.contents}
          deleteCard={this.deleteCard.bind(this)}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
