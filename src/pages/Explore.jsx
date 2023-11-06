import { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { API_URL } from "../config/config.index";
import "./explore.css"



function Explore () {
    const [enemy, setEnemy] = useState(null)
    const {user, setUser} = useContext(AuthContext)
    const [character, setCharacter] = useState("")
    const id = user.character._id
    const {location} = useParams()
    const [combat1, setCombat1] = useState([])
    const [combat2, setCombat2] = useState([])
    const [victory, setVictory] = useState("")
    console.log(id)
    console.log(location)
    
    const exploreCombat = async () => {
        const response = await axios.get(`${API_URL}/explore/combat?id=${id}&location=${location}`)
        const data = response.data
        setUser({ ...user, character: data.character });
        setCharacter(data.character)
        setEnemy(data.enemy)
        setCombat1(data.combat1)
        setCombat2(data.combat2)
        setVictory(data.victory)
        console.log(data)

    }

    useEffect(()=>{
        exploreCombat()
    },[])

    return enemy && character  ? (
        <>
        <h1>Battle in the {location}</h1>

         
        <div className="exploreCombatants">
            <div className="exploreCharacter">
            <h3>{character.name}</h3> 
            <img className= "exploreImg" src={character.image} alt={`${character.name} image`} style={{width: "10rem"}} />
            <ul>
                <li>Damage: {character.damage}</li>
                <li>Strength: {character.attributes.strength}</li>
                <li>Dexterity: {character.attributes.dexterity}</li>
                <li>Agility: {character.attributes.agility}</li>
                <li>Constitution: {character.attributes.constitution}</li>
                <li>Fate: {character.attributes.fate}</li>
                <li>Armor: {character.attributes.armor}</li>
                <li>Health: {character.health}</li>
            </ul>
            </div>
            <div className="exploreEnemy">
            <h3>{`${enemy.name}`}</h3>
            <img className= "exploreImg" src={enemy.image} alt={`${enemy.name} image`} style={{width: "10rem"}} />
            <ul>
                <li>Damage: {enemy.damage}</li>
                <li>Strength: {enemy.attributes.strength}</li>
                <li>Dexterity: {enemy.attributes.dexterity}</li>
                <li>Agility: {enemy.attributes.agility}</li>
                <li>Constitution: {enemy.attributes.constitution}</li>
                <li>Fate: {enemy.attributes.fate}</li>
                <li>Armor: {enemy.attributes.armor}</li>
                <li>Health: {enemy.health}</li>
            </ul>
            </div>
        </div>
        <h3>Combat results</h3>
            <h3>{victory}</h3>
            

            <h4 className="exploreAttacker">{combat1.map((combatLog, index) => {
                return(
                    <p key = {index}>{combatLog}</p>
                )
            })}</h4>

            <h4 className="exploreDefender">{combat2.map((combatLog, index) => {
                return(
                    <p key = {index}>{combatLog}</p>
                )
            })}</h4>
            <Link to = "/character">Return to the village</Link>
            
            
        </>
    ) : (
        <p>Loading...</p>
    )
}

export default Explore;
