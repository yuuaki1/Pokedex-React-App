import { useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState("bulbasaur")
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType1, setPokemonType1] = useState([])
  const [pokemonType2, setPokemonType2] = useState([])
  const [pokeability1, setAbility1] = useState([])
  const [pokeability2, setAbility2] = useState([])
  const [pokeability3, setAbility3] = useState([])

  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      const res = await axios.get(url)
      toArray.push(res.data)
      setPokemonType1(res.data.types[0].type.name)
      if (res.data.types.length > 1 || res.data.types[1].type.name === "undefined") {
        setPokemonType2(res.data.types[1].type.name)
      }
      setPokemonData(toArray)
      setAbility1(res.data.abilities[0].ability.name)
      setAbility2(res.data.abilities[1].ability.name)
      setAbility3(res.data.abilities[2].ability.name)

      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='text' onChange={handleChange} placeholder='Enter Pokemon name' />
        </label>
      </form>
      {pokemonData.map((data) => { // Add "index" parameter
        return (
          <div className='container'>
            <img src = {data.sprites["front_default"]}/>
            <div className='divTable'>
              <div className='divTableBody'></div>
                <div className='divTableRow'>
                  <div className='divTableCell'>Type</div>
                  <div className='divTableCell'>{pokemonType1}  {pokemonType2}</div>
                </div>
                <div className='divTableRow'>
                  <div className='divTableCell'>Height</div>
                  <div className='divTableCell'>{" "}{Math.round(data.height * 3.9)}"</div>
                </div>
                <div className='divTableRow'>
                  <div className='divTableCell'>Weight</div>
                  <div className='divTableCell'>{" "}{Math.round(data.weight / 4.3)}lbs</div>
                </div>
                <div className='divTableRow'>
                  <div className='divTableCell'>Abilities</div>
                  <div className='divTableCell'>{pokeability1}  {pokeability2}  {pokeability3} (hidden) </div>
                </div>
              </div>
            </div>
        )
      })}
    </div>
  )
}

export default App
