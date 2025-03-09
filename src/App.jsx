import { useEffect, useState } from 'react'
import "./styles/App.css";
import { Card } from './components/Card'
import shuffle from './utils/shuffleArray';

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonStartingIndex, setPokemonStartingIndex] = useState(10);
  const [nrOfDesiredPokemon, setNrOfDesiredPokemon] = useState(0);
  //set wantEvolutions to 1 if you want to see multiple evos of same pokemon. Set to 3+ to skip most evolutions. 1025 max pokemon
  const [toggleWantEvolutions, setToggleWantEvolutions] = useState(1); 
  function handleToggleWantEvolutions () {
    console.log(toggleWantEvolutions);
    if (toggleWantEvolutions === 1) setToggleWantEvolutions(3)
    else setToggleWantEvolutions(1);
  }

  useEffect(() => {
    async function getPokemon(nrOfPokemon) {
      let tempPokeList = [];
      //go back to pokemon 1 if current operation would go past pokemon 1025 (last pokemon in api)
      if (pokemonStartingIndex + (nrOfPokemon * toggleWantEvolutions) > 1025) {
        setPokemonStartingIndex(1);
      }
      let tempIndex = pokemonStartingIndex;
      for (tempIndex; tempIndex < ((nrOfPokemon * toggleWantEvolutions) + pokemonStartingIndex); tempIndex += toggleWantEvolutions) {
        console.log(tempIndex);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${tempIndex}`);
        const pokemonData = await response.json();
        let pokemonObject = { name: pokemonData.forms[0].name, icon: pokemonData.sprites.front_default, pokeIndex: tempIndex }
        tempPokeList.push(pokemonObject);
      };
      console.log("called the api loop")
      setPokeList(tempPokeList);
    }
    getPokemon(nrOfDesiredPokemon);
  }, [pokemonStartingIndex, toggleWantEvolutions, nrOfDesiredPokemon]);


  function submitClickedPokemon(pokeNr) {
    
    const tempArray = [...pokeList];
    shuffle(tempArray);
    setPokeList(tempArray);

    if (clickedPokemon.includes(pokeNr)) {
      gameFinished();
      console.log('you Lost')
    } else {
      setClickedPokemon([...clickedPokemon, pokeNr]);
      let tempScore = currentScore + 1;
      setCurrentScore(currentScore + 1);
      shuffleCards();
      if (tempScore > bestScore) setBestScore(tempScore);
      if (clickedPokemon.length === (nrOfDesiredPokemon - 1)) {
        console.log('you won')
        gameFinished();
      }

    }
  }

  function gameFinished() {
    setClickedPokemon([]);
    setCurrentScore(0);
  }
  function shuffleCards() {
    console.log("shuffle cards")
  }

  return (
    <div className='app'>
      <header>
        <h1>Pokemon Memory Game</h1>
        <div className="score-table">
          <div>Current Score: {currentScore}</div>
          <div>Best Score: {bestScore}</div>
        </div>
      </header>

      <div className="buttons-container">
        <div className="pokemon-options-container">
          <h2>Pokemon options:</h2>
          <button onClick={() => setPokemonStartingIndex(pokemonStartingIndex + (toggleWantEvolutions * nrOfDesiredPokemon))}>New Pokemon</button>
          <button onClick={() => handleToggleWantEvolutions()}>Toggle Evolutions</button>
        </div>
        <div className='difficulty-container'>
          <h2>Game Difficulty:</h2>
          <button onClick={() => setNrOfDesiredPokemon(6)}>Easy</button>
          <button onClick={() => setNrOfDesiredPokemon(10)}>Medium</button>
          <button onClick={() => setNrOfDesiredPokemon(15)}>Hard</button>
        </div>
      </div>

      <div className="cards-container">
        {pokeList.map((pokemon) => (
          <Card key={pokemon.pokeIndex} imageURL={pokemon.icon} name={pokemon.name}
            executeOnClick={() => submitClickedPokemon(pokemon.pokeIndex)} ></Card>
        ))}
      </div>
    </div>
  )
}

export default App
//to do: make toggle button actually look toggled