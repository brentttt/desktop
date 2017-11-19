import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PhotoshopPicker } from 'react-color';

class App extends Component {
  state = {
    color: '#fff'
  }
  handleChange = (color) => {
    this.setState({ color: color.hex });
  };
  render() {
    return(
      <PhotoshopPicker color={this.state.color} onChangeComplete={this.handleChange}/>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
