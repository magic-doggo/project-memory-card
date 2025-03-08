import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Card } from './components/Card'

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function getPokemon(nrOfDesiredPokemon) {
      let tempPokeList = [];
      for (let i = 1; i < (nrOfDesiredPokemon +1) ; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonData = await response.json();
        let pokemonObject = { name: pokemonData.forms[0].name, icon: pokemonData.sprites.front_default, pokeIndex: i}
        tempPokeList.push(pokemonObject);
      };
      console.log("called the api loop")
      setPokeList(tempPokeList);
    }
    getPokemon(2);
  }, []);

  function submitClickedPokemon(pokeNr) {
    if (clickedPokemon.includes(pokeNr)) {
      youLost();
    } else {
      setClickedPokemon([...clickedPokemon, pokeNr]);
      let tempScore = currentScore +1;
      setCurrentScore(currentScore +1);
      shuffleCards();
      if (tempScore > bestScore) setBestScore(tempScore);
    }
    console.log(currentScore);
  }

  function youLost() {
    console.log("you lost")
    //highscore stuff
    setClickedPokemon([]);
    setCurrentScore(0);
  }
  function shuffleCards() {
    console.log("shuffle cards")
  }


  //when state changes, rerender cards in different order. maybe js method function to randomize 1-12
  //do I need to store images

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
