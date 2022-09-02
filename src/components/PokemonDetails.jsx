import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/styles.css'

const PokemonDetails = () => {
  const [pokeInfo, setPokeInfo] = useState()

  const { name } = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
    axios.get(URL)
      .then(res => setPokeInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  console.log(pokeInfo)
  return (
    <div className='det' >
      <article className='detail'>
        <div className='detail__header'>
          <img className='detail__avatar' src={pokeInfo?.sprites.other['official-artwork'].front_default} alt="" />
        </div>

        <h1 className='detail__name'>{name}</h1>
        <div className='detail__nav' >
          <div>
            <p>weight</p>
            <h3>{pokeInfo?.weight}</h3>
          </div>
          <div>
            <p>height</p>
            <h3>{pokeInfo?.height}</h3>
          </div>
        </div>
        <div className='detail__type'>
          <div className='type__pri'>
            <h1>Type</h1>
            <h3 className='type__doc'>
              {
                pokeInfo?.types.map(slot => (
                  <li key={slot.type.url}>{slot.type.name}</li>
                ))
              }
            </h3>
          </div>
          <div className='abilities__pri'>
            <h1>abilities</h1>
            <h3 className='abilities__doc'>
              {
                pokeInfo?.abilities.map(slo => (
                  <li key={slo.ability.url}>{slo.ability.name}</li>
                ))
              }
            </h3>
          </div>
        </div>


        <div className='stats__pri'>
          <h1>Stats</h1>
          <h3 className='stats__doc'>
            {
              pokeInfo?.stats.map(lo => (
                <li key={lo.stat.url}>
                  <div>
                    <meter
                      high={70}
                      low={60}
                      optimum={75}

                      min={0}
                      max={150}
                      value={lo.base_stat} >
                    </meter>
                  </div>
                  <div className='states_j'>
                    <div>
                      {lo.stat.name}:
                    </div>
                    <div>
                      {lo.base_stat}/150
                    </div>
                  </div>
                </li>
              ))
            }
          </h3>
        </div>
        <div>
          <h2 className='mov__title'> Movements</h2>
          <h4 className="movements">
            {
              pokeInfo?.moves.map(move => (
                <li key={move.move.name}>  {move.move.name}  </li>
              ))
            }
          </h4>

        </div>
      </article>
    </div>

  )
}

export default PokemonDetails