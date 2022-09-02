import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from './Pokedex/PokemonCard'
import SearchInput from './Pokedex/SearchInput'
import SelectType from './Pokedex/SelectType'
import HeaderPoke from './shared/HeaderPoke'
import './styles/pokedex.css'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [optionType, setOptionType] = useState('All')
  const [page, setPage] = useState(0)
  

  useEffect(() => {
    if(optionType !== 'All'){
      // Aquí se hace la lógica de cuando el usuario quieres filtrar por tipo
      const URL = `https://pokeapi.co/api/v2/type/${optionType}/`
      axios.get(URL)
        .then(res => {
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results: arr})
        })
        .catch(err => console.log(err))
    } else if(pokeSearch){
      // Aquí se hace la lógica cuando el usuario busca por el input
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`

      const obj = {
        results: [{url}]
      }
      setPokemons(obj)
    } else {
      // Aquí se hace la lógica cuando el usuario quiere todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon'
      axios.get(URL)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))
    }
  }, [pokeSearch, optionType])

  const nameTrainer = useSelector(state => state.nameTrainer)

  const maxItem = 10
  const totalItems = pokemons?.results.length
  const maxPage=Math.ceil(totalItems/maxItem)

  const onNextPage = ()=>{
    setPage((page+1)%maxPage)
  }
  const onPrevPage = ()=>{
    setPage((page-1)%maxPage)
  }

  return (
    <div>
      <HeaderPoke />
      <h2 >Welcome {nameTrainer}, Catch them all.</h2>
      <div className='pokedex__consola'>
        <SearchInput setPokeSearch={setPokeSearch} setOptionType={setOptionType} setPage={setPage} />
      <SelectType 
        optionType={optionType} 
        setOptionType={setOptionType} 
        setPokeSearch={setPokeSearch}
        setPage={setPage}
      />
      </div>
      
      <div className='cards-container'>
        {
          pokemons?.results.slice(page*maxItem, maxItem*(page+1)).map(pokemon => (
            <PokemonCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
      <div className='pokedex__pagination'>
        <button onClick={onPrevPage} disabled={!page}>Prev</button>
        <p>{page+1} of {maxPage}</p>
        <button onClick={onNextPage} disabled={page === Math.ceil(totalItems/maxItem)-1}>Next</button>
      </div>
      
    </div>
  )
}

export default Pokedex