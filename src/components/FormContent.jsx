import React, { Component } from 'react';
import './reset.css';
import './FormContent.css';

class FormContent extends Component {
  constructor() {
    super();
    this.workload = ' ';
    this.technology = ' ';
    this.content = '';
    this.type = '';
    this.url = '';
    this.priority = '';
  }

  handleChangeWorkload(event) {
    this.workload = parseInt(event.target.value, 10);
  }

  handleChangeTechnology(event) {
    this.technology = parseInt(event.target.value, 10);
  }

  handleChangeURL(event) {
    this.url = event.target.value;
  }

  handleChangeContent(event) {
    this.content = event.target.value;
  }

  handleChangePriority(event) {
    this.priority = parseInt(event.target.value, 10);
  }

  handleChangeTypeContent(event) {
    this.type = parseInt(event.target.value, 10);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      workload, url, priority, content, type, technology,
    } = this;
    this.props.onSubmit(content, url, workload, technology, type, priority);
  }

  render() {
    return (
      <div className="form-container">

        <form className="form-content" onSubmit={this.handleSubmit.bind(this)}>
          <h1 className="form-title">Inserir/Editar Conteúdo</h1>
          <label htmlFor="url" className="form-content-label">
            Conteúdo
            <textarea
              rows={4}
              onChange={this.handleChangeContent.bind(this)}
              placeholder="Descrição do conteúdo"
              className="form-content-item"
            />
          </label>
          <label htmlFor="url" className="form-content-label">
            URL
            <input type="url" onChange={this.handleChangeURL.bind(this)} id="furl" name="url" className="form-content-item" />
          </label>
          <label htmlFor="type" className="form-content-label">
            Tipo do Conteúdo
            <select id="type" onChange={this.handleChangeTypeContent.bind(this)} className="form-content-item">
              <option value="none" disabled selected> </option>
              <option value="1">Curso</option>
              <option value="2">Podcast</option>
              <option value="3">Post</option>
            </select>
          </label>
          <label htmlFor="priority" className="form-content-label">
            Prioridade
            <select id="priority" onChange={this.handleChangePriority.bind(this)} className="form-content-item">
              <option value="none" disabled selected> </option>
              <option value="1">Obrigatório</option>
              <option value="2">Complementar</option>
            </select>
            <label htmlFor="technology" className="form-content-label label-left">
              Tecnologia
              <select id="technology" onChange={this.handleChangeTechnology.bind(this)} name="technology" className="form-content-item">
                <option value="none" disabled selected> </option>
                <option value="1">Angular</option>
                <option value="2">React</option>
                <option value="3">Vue</option>
                <option value="4">ANGULAR VS REACT VS VUE</option>
              </select>
            </label>

          </label>
          <label htmlFor="workload" className="form-content-label label-right">
            Carga Horária
            <input type="text" onChange={this.handleChangeWorkload.bind(this)} name="worload" className="form-content-item" />
          </label>

          <button type="submit" value="Enviar" className="form-button">Inserir/Editar</button>
        </form>
      </div>

    );
  }
}

export default FormContent;
