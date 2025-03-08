import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Card } from './components/Card'

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState([]);

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
      setCurrentScore(currentScore +1);
      shuffleCards()
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


  //list 1-12 if possible, if not URLs for 12 images
  //a state starting empty, and adding an image or nr every time a card is clicked
  //when card is clicked if card img/nr is already in state above, game over, save high score. reset state to empty
  // else add card to state, increase current score by 1. does not need to be stored as state, just score variable?
  //when state changes, rerender cards in different order. maybe js method function to randomize 1-12
  //do I need to store images

  //maybe setClickedPokemon state outside the effect. effect would check if something changed since last time? how? based on clickedPokemon state probably
  //if no duplicates in state, rerender cards on screen, mapped based on each nr from clickedPokemon. or maybe check for duplicates before effect (to end or continue game)

  return (
    <div>
      <div>{currentScore}</div>

      {pokeList.map((pokemon) => (
        <Card key={pokemon.pokeIndex} imageURL={pokemon.icon} name={pokemon.name}
        executeOnClick={() => submitClickedPokemon(pokemon.pokeIndex)} ></Card>
      ))}
    </div>
  )
}

export default App
