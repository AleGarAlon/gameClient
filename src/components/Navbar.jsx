
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./navBar.css"


function Navbar() {
    const {user} = useContext(AuthContext)
    
    


  return user.character ? (
    <nav className='navBar'>
     <div className= "navegations">   
    <Link className= "navLinks linkMap" to="/map">Map</Link>
    <Link className= "navLinks linkShop" to="/shop">Shop</Link>
    <Link className= "navLinks linkArmory" to="/armory">Armory</Link>
    <Link className= "navLinks linkTrain" to="/train">Train</Link>
    {/* <Link className= "navLinks linkPit" to="/pit">Pit</Link> */}
    {/* <Link className= "navLinks" to="/create">Create enemy form</Link> */}
    </div>
    <div className='navStats'>
        <p className= "navHealth">Health: {user.character.health}</p> 
        <div className= "navResources">
        <img className="navImg" src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699831092/game/UI%20elements/TradingIcons_111_t_l9eiky.png" alt="gold" />
        <p></p>
        <p className= "navGoldh"> {user.character.gold}</p>
        <img className="navImg" src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699831090/game/UI%20elements/TradingIcons_52_t_dpc69e.png" alt="Power" />
        <p></p>
        <p className= "navPower"> {user.character.power}</p>
        </div>
    </div>
    </nav>
  ) : <h4>Loading...</h4>
}

export default Navbar