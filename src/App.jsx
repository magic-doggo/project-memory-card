import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Card } from './components/Card'

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  let nrOfDesiredPokemon = 2;

  useEffect(() => {
    async function getPokemon(nrOfPokemon) {
      let tempPokeList = [];
      for (let i = 1; i < (nrOfPokemon +1) ; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonData = await response.json();
        let pokemonObject = { name: pokemonData.forms[0].name, icon: pokemonData.sprites.front_default, pokeIndex: i}
        tempPokeList.push(pokemonObject);
      };
      console.log("called the api loop")
      setPokeList(tempPokeList);
    }
    getPokemon(nrOfDesiredPokemon);
  }, []);

  function submitClickedPokemon(pokeNr) {
    if (clickedPokemon.includes(pokeNr)) {
      // youLost();
      gameFinished();
      console.log('you Lost')
    } else {
      setClickedPokemon([...clickedPokemon, pokeNr]);
      let tempScore = currentScore +1;
      setCurrentScore(currentScore +1);
      shuffleCards();
      if (tempScore > bestScore) setBestScore(tempScore);
      if (clickedPokemon.length === (nrOfDesiredPokemon -1)) {
        console.log('you won')
        // youWon();
        gameFinished();
      }
      
    }
  }

  // function youWon() {
  //   console.log('you won');
  //   setClickedPokemon([]); 
  //   setCurrentScore(0);   
  // }
  // function youLost() {
  //   console.log("you lost")
  //   setClickedPokemon([]);
  //   setCurrentScore(0);
  // }
  function gameFinished() {
    setClickedPokemon([]);
    setCurrentScore(0);
  }
  function shuffleCards() {
    console.log("shuffle cards")
  }


  //when state changes, rerender cards in different order. maybe js method function to randomize 1-12

  return (
    <div>
      <div>Current Score: {currentScore}</div>
      <div>Best Score: {bestScore}</div>

      {pokeList.map((pokemon) => (
        <Card key={pokemon.pokeIndex} imageURL={pokemon.icon} name={pokemon.name}
        executeOnClick={() => submitClickedPokemon(pokemon.pokeIndex)} ></Card>
      ))}
    </div>
  )
}

export default App
