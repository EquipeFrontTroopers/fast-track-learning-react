import React, { Component } from 'react';
import './reset.css';
import './FormContent.css';

class FormContent extends Component {
  render() {
    return (
      <div className="form-container">

        <form className="form-content">
          <h1 className="form-title">Inserir/Editar Conteúdo</h1>
          <label htmlFor="url" className="form-content-label">
            Conteúdo
            <textarea
              rows={4}
              placeholder="Descrição do conteúdo"
              className="form-content-item"
            />
          </label>
          <label htmlFor="url" className="form-content-label">
            URL
            <input type="url" id="furl" name="url" className="form-content-item" />
          </label>
          <label htmlFor="type" className="form-content-label">
            Tipo do Conteúdo
            <select id="type" className="form-content-item">
              <option value="none" disabled selected> </option>
              <option value="Podcast">Podcast</option>
              <option value="Post">Post</option>
              <option value="Curso">Curso</option>
              <input type="text" id="content" name="content" />
            </select>
            <label htmlFor="priority" className="form-content-label">
              Prioridade
              <select id="priority" className="form-content-item">
                <option value="none" disabled selected> </option>
                <option value="Obrigatorio">Obrigatório</option>
                <option value="Complementar">Complementar</option>
              </select>
              <label htmlFor="technology" className="form-content-label label-left">
                Tecnologia
                <select id="technology" name="technology" className="form-content-item">
                  <option value="none" disabled selected> </option>
                  <option value="Angular">Angular</option>
                  <option value="React">React</option>
                  <option value="Vue">Vue</option>
                </select>
              </label>

            </label>
            <label htmlFor="workload" className="form-content-label label-right">
              Carga Horária
              <input type="text" name="worload" className="form-content-item" />
            </label>

          </label>
          <button type="submit" className="form-button">Inserir/Editar</button>
        </form>
      </div>

    );
  }
}

export default FormContent;
