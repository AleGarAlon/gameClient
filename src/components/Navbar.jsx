
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./navBar.css"
import axios from "axios";
import { API_URL } from "../config/config.index";

function Navbar() {
    const {user} = useContext(AuthContext)
    
    


  return user.character ? (
    <nav className='navBar'>
     <div className= "navegations">   
    <Link className= "navLinks linkMap" to="/map">Map</Link>
    <Link className= "navLinks linkShop" to="/shop">Shop</Link>
    <Link className= "navLinks linkTrain" to="/train">Train</Link>
    <Link className= "navLinks linkPit" to="/pit">Hole</Link>
    {/* <Link className= "navLinks" to="/create">Create enemy form</Link> */}
    </div>
    <div className='navStats'>
        <p className= "navHealth">Health: {user.health}</p> 
        <div className= "navResources">
        <p className= "navGoldh">Gold: {user.character.gold}</p>
        <p className= "navExplorationPoints">Exploration points: {user.character.points}</p>
        </div>
    </div>
    </nav>
  ) : <h4>Loading...</h4>
}

export default Navbar