import React from 'react'
import { AuthContext } from '../context/Auth.context'
import { useContext } from 'react'

function Character() {
    const {user} = useContext(AuthContext)
    const character = user.character

  return (
    <div>
        <h2>character profile</h2>

        <img src={character.image} alt={Character.name} />

        <ul> Items
        {character.items.map((item) => (
    <li key={item._id}>{item}</li>
  ))}

        </ul>
        
    </div>
  )
}

export default Character