import React from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";

function Navbar() {
    const {user} = useContext(AuthContext)
    const character = user.character
    const health = character.health + (character.attributes.constitution * 5)
  return (
    <nav className='navBar'>
     <div className= "navegations">   
    <Link to="/map">Map</Link>
    <Link to="/shop">Shop</Link>
    <Link to="/train">Train</Link>
    <Link to="/pit">The pit</Link>
    <Link to="/create">Create enemy form</Link>
    </div>
    <div className='navStats'>
        <p>Health {health}</p>
        <p>Gold {character.gold}</p>
        <p>Exploration points {character.points}</p>
    </div>
    </nav>
  )
}

export default Navbar