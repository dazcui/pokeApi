import React from 'react'
import './style/pokeSearchType.css'

const SearchInput = ({setPokeSearch, setOptionType, setPage}) => {

  const handleSubmit = e => {
    e.preventDefault()
    setPokeSearch(e.target.searchText.value.trim().toLowerCase())
    setOptionType('All')
    setPage('')
    e.target.searchText.value = ""
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className='input__search' id='searchText' type="text" placeholder='enter name'/>
      <button className='button__search'>Search</button>
    </form>
  )
}

export default SearchInput