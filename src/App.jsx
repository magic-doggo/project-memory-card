import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Card } from './components/Card'

function App() {
  // let imageList = ["https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FpYjQ4ZXg4ZHJ5MmVtMjNuaG9renF1YWx4cXdhNXJmcnl3YjdkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n2aqrebzEn6WgDE2Hu/giphy.gif",
  //   "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3JidjAxcjJncmhhZ3IyYW8xenJuamF4MTFraHU1dDQ1YTlsOGl0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaMwwM91UCxstRfvA3/giphy.gif"]

  // let currentScore = 0;
  // const [clickedPokemon, setClickedPokemon] = useState([]);
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      let tempPokeList = [];
      for (let i = 1; i < 3; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonData = await response.json();
        let pokemonObject = { name: pokemonData.forms[0].name, icon: pokemonData.sprites.front_default }
        tempPokeList.push(pokemonObject);
      };
      setPokeList(tempPokeList);
    }
    getPokemon();
  }, []);

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
      {/* {imageList.map(image => (
      <Card imageURL={image}></Card>
    ))} */}
      {pokeList.map((pokemon) => (
        <Card key={pokemon.name} imageURL={pokemon.icon} name={pokemon.name}></Card>
      ))}
    </div>
  )
}

export default App
