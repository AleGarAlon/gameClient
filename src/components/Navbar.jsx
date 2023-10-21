
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./navBar.css"
import axios from "axios";
import { API_URL } from "../config/config.index";

function Navbar() {
    const {user} = useContext(AuthContext)
    const [character, setCharacter] = useState("")
    const characterId = user.character._id
    const health = character.health

    const getCharacter = async () => {
      try {
          const response = await axios.get(`${API_URL}/character/${characterId}`)       
      if  (response.status === 200) {
          const data = response.data;
          console.log(data)
          setCharacter(data)
      }
      } 
      catch (error) {
          console.log(error)
      }
  }

  useEffect (() => {
    getCharacter()
  }, [])



  return character ? (
    <nav className='navBar'>
     <div className= "navegations">   
    <Link className= "navLinks linkMap" to="/map">Map</Link>
    <Link className= "navLinks linkShop" to="/shop">Shop</Link>
    <Link className= "navLinks linkTrain" to="/train">Train</Link>
    <Link className= "navLinks linkPit" to="/pit">Hole</Link>
    {/* <Link className= "navLinks" to="/create">Create enemy form</Link> */}
    </div>
    <div className='navStats'>
        <p className= "navHealth">Health: {health}</p> 
        <div className= "navResources">
        <p className= "navGoldh">Gold: {character.gold}</p>
        <p className= "navExplorationPoints">Exploration points: {character.points}</p>
        </div>
    </div>
    </nav>
  ) : <h4>Loading...</h4>
}

export default Navbar