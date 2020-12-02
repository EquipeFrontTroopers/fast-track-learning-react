import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MdAddCircleOutline, MdFilterList } from 'react-icons/md';
import { getDecodedUser } from './token';
import Header from './components/Header';
import api from './api';
import config from './config';
import { isAdmin } from './user';

import FormContent from './components/FormContent';
import ListCardContent from './components/ListCardContent';

import PrimaryButton from './components/PrimaryButton';

import Footer from './components/Footer';

import './HomePage.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      contents: [],
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
    // console.log(result);
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
      console.log('userLogged', userLogged);

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

  render() {
    return (
      <div className="App">

        <Header username={this.state.userLogged && this.state.userLogged.nickname} />

        <h1 className="main-title">Lista de Conteúdos</h1>
        <div className="main-buttons">
          <div className="main-button-action">
            <PrimaryButton>
              <MdFilterList className="button-content" />
              <span className="button-content">Filtrar</span>
            </PrimaryButton>
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
