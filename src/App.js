import React, { Component } from 'react';
import axios from 'axios';
import ListCardContent from './components/ListCardContent';

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

  getContent() {
    axios.get('http://localhost:3000/conteudos').then((res) => {
      this.setState({
        contents: res.data,
      });
    })
      .catch((err) => {
        console.error(`ops! an error has occurred${err}`);
      });
  }

  deleteCard(id) {
    axios.delete(`http://localhost:3000/conteudos/${id}`).then(() => {
      const items = this.state.contents;
      const result = items.filter((contents) => contents.id !== id);
      this.setState({ contents: result });
    });
  }

  render() {
    return (
      <div className="App">
        <ListCardContent
          listContents={this.state.contents}
          deleteCard={this.deleteCard.bind(this)}
        />
      </div>
    );
  }
}

export default App;
