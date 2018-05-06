import React, { Component } from 'react';
import axios                from 'axios';
import { getPokemonNames }  from './pokemonApiController';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Pokemon Team Maker',
      textFieldValue: '',
      pokeName: '',
      pokedexNum: '',
      type: '',
      sprite: '',
      team: []
    }
  }

  handleTextFieldValueChange = (e) => {
    this.setState({
      textFieldValue: e.target.value,
    });
  }

  handlePopulatePokemonDropdown = () => {
    console.log('Selected!')
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

  // Handler for adding a pokemon to our team
  handleTeamAdd = () => {
    const { pokeName, pokedexNum, type, sprite, team } = this.state; 
    // Check to see if our team is full
    if (team.length === 6) {
      alert("You have too many pokemon!  Please remove one before adding to your team");
    }
    // create object to store in the team array
    const pokemonObj = { name: pokeName, pokedexNum, type, sprite }

    // Deep clone of our previous list...
    const deepCloneList = [];
    team.forEach((obj, index) => {
      deepCloneList.push(Object.assign({}, obj));
    })
    deepCloneList.push(pokemonObj)
    
    // update the state by resetting the search data, and add update the team state
    this.setState({
      team: deepCloneList, 
      textFieldValue: '',
      pokeName: '',
      pokedexNum: '',
      type: '',
      sprite: '' 
    });
  }

  render() {
    const { title, textFieldValue, pokeName,
            pokedexNum, type, sprite, team
          } = this.state;


    return (
      <div className="container-fluid app-container">
        <div className="row app-title-row"> 
            <div className="col-12 app-title-col">
                <h2 className="app-title"> {title} </h2>
            </div>
        </div>
        
        <div className="row pokemon-search-row">
          <div className="col pokemon-search-col">
            <input className="text pokemon-search-box" value={textFieldValue} onSelect={() => this.handlePopulatePokemonDropdown} onChange={(e) => { this.handleTextFieldValueChange(e) }}/> <br/>
            <button 
              className="btn btn-primary pokemon-search-button" 
              onClick={this.handleGetPokemon}> 
                Catch! 
            </button>
            
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            { sprite && <img src={sprite} height="300" width="300" />}
            { pokeName && <h3>{pokeName}</h3>}
            { pokedexNum && <h3>#{pokedexNum}</h3>}
            { type && <h3>Type: {type}</h3>}
            {sprite && <button className="btn btn primary" onClick={this.handleTeamAdd}> Add to team </button> }
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <h2> Current Team </h2>
            { team.map((pokemon, index) => {
                return (  <div>
                            <img src={pokemon.sprite} height="100" width="100" /> 
                  
                          </div>
              )})}
          </div>
        </div>
        
  
      </div>
    );
  }
}

export default App;
