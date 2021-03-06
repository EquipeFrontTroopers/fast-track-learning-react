import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MdAddCircleOutline, MdFilterList } from 'react-icons/md';

import { getDecodedUser } from './services/token';
import Header from './components/Header/Header';
import api from './services/api';
import config from './config/config';
import isAdmin from './services/user';
import FormContent from './components/FormContent/FormContent';
import ListCardContent from './components/ListCardContent/ListCardContent';
import PrimaryButton from './components/PrimaryButton/PrimaryButton';
import Footer from './components/Footer/Footer';
import './style/mainApp.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contents: [],
      allContents: [],
      technologies: [],
      isAdmin: false,
    };
  }

  componentDidMount() {
    this.MySwal = withReactContent(Swal);

    this.user = getDecodedUser();
    this.checkUser();
    this.getContent();
  }

  handleNewContentClick() {
    this.openFormModal(null, null, null, null, null, null, null, null, null, this.createNewContent);
  }

  async getContent() {
    const contentResponse = await api.get(`${config.urlApi}conteudos`);
    const contents = contentResponse.data;

    this.addContentInfo(contents);
  }

  async addContentInfo(contents) {
    const prioritiesResponse = await api.get(`${config.urlApi}prioridades`);
    const priorities = prioritiesResponse.data;

    const typeResponse = await api.get(`${config.urlApi}tipoConteudos`);
    const type = typeResponse.data;

    const technologyResponse = await api.get(`${config.urlApi}tecnologias`);
    const technology = technologyResponse.data;

    const priorityOfContent = this.addPriorityDescription(contents, priorities);
    const typeOfContent = this.addTypeDescription(priorityOfContent, type);
    const technologyOfContent = this.addTechnologyName(typeOfContent, technology);

    this.setState({
      contents: technologyOfContent,
      allContents: technologyOfContent,
      technologies: technology,
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

  addTypeDescriptionToContent(item, type) {
    const typeOfContent = type.find(
      (typeItem) => item.tipoConteudoId === typeItem.id,
    );
    const newItem = item;
    if (typeOfContent) {
      newItem.typeDescription = typeOfContent.descricao;
    }
    return item;
  }

  addTypeDescription(contents, type) {
    const result = contents.map((item) => this.addTypeDescriptionToContent(item, type));
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

  openFormModal(content,
    url,
    type,
    technology,
    workload,
    priority,
    priorityDescription,
    typeDescription,
    technologyName,
    onSubmit, id) {
    this.MySwal = withReactContent(Swal);
    this.MySwal.fire({
      html: <FormContent
        onSubmit={onSubmit.bind(this)}
        content={content}
        url={url}
        type={type}
        technology={technology}
        workload={workload}
        priority={priority}
        id={id}
      />,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
    }).then((param) => {
      if (param.dismiss) return;
      this.MySwal.fire({
        icon: 'success',
        title: 'Salvo!',
        text: 'O conteúdo foi salvo com sucesso!',
        footer: '<p>Fast Track Learning</p>',
        confirmButtonColor: '#f7b718',

      });
    });
  }

  async createNewContent(content, url, workload, technology, type, priority) {
    const resp = await api.post(`${config.urlApi}conteudos`, {
      conteudo: content,
      url,
      carga_horaria: workload,
      tecnologiaId: technology,
      tipoConteudoId: type,
      prioridadeId: priority,
    });
    this.MySwal.close();
    const items = this.state.contents;
    items.push(resp.data);
    this.addContentInfo(items);
  }

  async patchContent(content, url, workload, technology, type, priority, id) {
    const resp = await api.patch(`${config.urlApi}conteudos/${id}`, {
      conteudo: content,
      url,
      carga_horaria: workload,
      tecnologiaId: technology,
      tipoConteudoId: type,
      prioridadeId: priority,
    });
    this.MySwal.close();
    const index = this.state.contents.findIndex((item) => item.id === id);
    this.state.contents[index] = resp.data;
    this.addContentInfo(this.state.contents);
  }

  async deleteCard(id) {
    await api.delete(`${config.urlApi}conteudos/${id}`);

    const items = this.state.contents;
    const result = items.filter((contents) => contents.id !== id);
    this.setState({ contents: result });
  }

  editCard(id) {
    const items = this.state.contents;
    const result = items.find((contents) => contents.id === id);
    if (result) {
      this.openFormModal(
        result.conteudo,
        result.url,
        result.tipoConteudoId,
        result.tecnologiaId,
        result.carga_horaria,
        result.prioridadeId,
        result.priorityDescription,
        result.typeDescription,
        result.technologyName,
        this.patchContent,
        id,
      );
    }
  }

  async checkUser() {
    if (this.user) {
      const usersResponse = await api.get(`${config.urlApi}usuarios`);
      const users = usersResponse.data;
      const userLogged = users.find((item) => item.email === this.user.email);

      if (userLogged) {
        this.setState({ userLogged, isAdmin: isAdmin(userLogged.tipoUsuarioId) });
      } else {
        this.redirectToLogin();
      }
    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    this.MySwal.fire({
      icon: 'warning',
      title: 'Login Inválido',
      text: 'Tente acessar novamente',
      footer: '<p>Fast Track Learning</p>',
      confirmButtonColor: '#f7b718',

    }).then(() => {
      window.location.href = config.urlLogin;
    });
  }

  filtrar(event) {
    const filterValue = event.target.value;
    const contentFiltered = filterValue ? this.state.allContents
      .filter((content) => content.tecnologiaId === Number(filterValue))
      : this.state.allContents;
    this.setState({ contents: contentFiltered });
  }

  render() {
    return (
      <div className="App">

        <Header username={this.state.userLogged && this.state.userLogged.nome} />

        <h1 className="main-title">Lista de Conteúdos</h1>
        <div className="main-buttons">
          <div className="main-button-action">
            <div className="filter-container">
              <span className="filter-label">
                <MdFilterList className="button-content" />
                Filtrar
              </span>
              <select
                id="filter"
                onChange={this.filtrar.bind(this)}
                className="select-filter"
              >
                <option value="" selected>Todas Tecnologias</option>
                {this.state.technologies.map((technology) => (
                  <option value={technology.id}>{technology.nome}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="main-button-action">
            <PrimaryButton
              onClick={this.handleNewContentClick.bind(this)}
              disable={!this.state.isAdmin}
            >
              <MdAddCircleOutline className="button-content" />
              <span className="button-content">Adicionar Conteúdo</span>
            </PrimaryButton>
          </div>
        </div>
        <ListCardContent
          listContents={this.state.contents}
          deleteCard={this.deleteCard.bind(this)}
          editCard={this.editCard.bind(this)}
          disableActions={!this.state.isAdmin}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
