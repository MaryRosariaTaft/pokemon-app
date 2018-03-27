import React, { Component } from 'react';
import axios                from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'PokeInfo',
      textFieldValue: '',
      pokeName: 'None',
      pokedexNum: 'None',
      type: 'None',
      sprite: ''
    }
  }

  handleTextFieldValueChange = (e) => {
    this.setState({
      textFieldValue: e.target.value,
    });
  }

  handleGetPokemon = async () => {
    const { textFieldValue } = this.state;
    const lowerCaseName = textFieldValue.toLowerCase();
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseName}`);
    console.log(response);
    // Make sure to check for a second type!
    this.setState({
      pokeName: response.data.name,
      pokedexNum: response.data.id,
      type: response.data.types[0].type.name,
      sprite: response.data.sprites.front_default,
    });
  }

  render() {
    const { title, textFieldValue, pokeName,
            pokedexNum, type, sprite,
          } = this.state;


    return (
      <div className="container-fluid">
        <h2> { title } </h2>
        <input value={textFieldValue} onChange={(e) => { this.handleTextFieldValueChange(e) }}/> <br/>
        <button className="btn btn-primary" onClick={this.handleGetPokemon}> Test </button>
        
        <h3>Pokemon Name: { pokeName }</h3>
        <h3>Pokedex Number: { pokedexNum }</h3>
        { sprite && <img src={sprite} height="300" width="300" /> }
        <h3>Pokemon Type: { type }</h3>
      </div>
    );
  }
}

export default App;
