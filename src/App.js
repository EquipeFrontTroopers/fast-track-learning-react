import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MdAddCircleOutline, MdFilterList } from 'react-icons/md';
import Header from './components/Header';

import FormContent from './components/FormContent';
import ListCardContent from './components/ListCardContent';

import PrimaryButton from './components/PrimaryButton';
import './HomePage.css';

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

  handleNewContentClick() {
    this.openFormModal();
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

  addPriorityDescription(contents, priorities) {
    const result = contents.map((item) => {
      const prioritiesContent = priorities.find(
        (priorityItem) => item.prioridadeId === priorityItem.id,
      );
      const newItem = item;
      if (prioritiesContent) {
        newItem.priorityDescription = prioritiesContent.descricao;
      }

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
      if (typeOfContent) {
        newItem.typeDescription = typeOfContent.descricao;
      }
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
      if (technologyOfContent) {
        newItem.technologyName = technologyOfContent.nome;
      }
      return item;
    });
    return result;
  }

  openFormModal(content, url, type, technology, workload, priority) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      html: <FormContent
        onSubmit={this.createNewContent.bind(this)}
        content={content}
        url={url}
        type={type}
        technology={technology}
        workload={workload}
        priority={priority}
      />,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
    });
  }

  async createNewContent(content, url, workload, technology, type, priority) {
    const resp = await axios.post('http://localhost:3000/conteudos', {
      conteudo: content,
      url,
      carga_horaria: workload,
      tecnologiaId: technology,
      tipoConteudoId: type,
      prioridadeId: priority,
    });

    const items = this.state.contents;

    items.push(resp.data);
    this.setState({ contents: items });
  }

  async deleteCard(id) {
    await axios.delete(`http://localhost:3000/conteudos/${id}`);

    const items = this.state.contents;
    const result = items.filter((contents) => contents.id !== id);
    this.setState({ contents: result });
  }

  editCard(id) {
    const items = this.state.contents;
    const result = items.find((contents) => contents.id === id);
    console.log(result);
    this.openFormModal(
      result.conteudo,
      result.url,
      result.tipoConteudoId,
      result.tecnologiaId,
      result.carga_horaria,
      result.prioridadeId,

    );
  }

  render() {
    return (
      <div className="App">
        <Header />

        <div className="main-buttons">
          <div className="main-button-action">
            <PrimaryButton>
              <MdFilterList className="button-content" />
              <span className="button-content">Filtrar</span>
            </PrimaryButton>
          </div>
          <div className="main-button-action">
            <PrimaryButton onClick={this.handleNewContentClick.bind(this)}>
              <MdAddCircleOutline className="button-content" />
              <span className="button-content">Adicionar Conteúdo</span>
            </PrimaryButton>
          </div>
        </div>
        <ListCardContent
          listContents={this.state.contents}
          deleteCard={this.deleteCard.bind(this)}
          editCard={this.editCard.bind(this)}
        />

      </div>
    );
  }
}

export default App;
