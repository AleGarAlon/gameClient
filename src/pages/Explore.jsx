import { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { API_URL } from "../config/config.index";

function Explore () {
    const [enemy, setEnemy] = useState(null)
    const {user} = useContext(AuthContext)
    const character = user.character
    const {location} = useParams()
    const [combat, setCombat] = useState("")
    // console.log("Your character",character)
    // console.log("Your enemy", enemy)
    // console.log("you location", location)


    const getEnemy = async () => {
        try {
            const response = await axios.get(`${API_URL}/explore/${location}`);
            if(response.status === 200) {
                const data = response.data
                // console.log("your info",data)
                setEnemy(data)
                setCombat("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const figth = () => {
        const turn = Math.random()
        const randomDex = parseInt(Math.random() * 100);
        const randomAgi = parseInt(Math.random() * 100);
        const randomFate = parseInt(Math.random() * 100);
        
        if (randomDex + character.attributes.dexterity > randomAgi + enemy.attributes.agility) {
            if (character.attributes.fate>= randomFate) {
                const dmg = (10 + character.attributes.strength) * 2;
                enemy.attributes.constitution - dmg;
                setCombat(`${enemy.name} recived a critical strike of ${dmg}`)
            }
            else {
                const dmg = 10 + character.attributes.strength
                enemy.attributes.constitution - dmg;
                setCombat(`${enemy.name} recived a strike of ${dmg}`)
            }
        }
        else {
            setCombat(`${character.name}, atack failed`)
        }
    }

    useEffect(()=> {
        getEnemy();
        
    }, []) 
    
    
    useEffect(() => {
        if (enemy) {
          figth();
        }
    }, [enemy]); 
    

    return enemy ? (
        <>
        <h1>Battle in the {location}</h1>

        <h3>Combat results</h3>
            <h4>{combat}</h4>
            <Link to = "/main">Return to the village</Link>
        <h2>{`Your enemy is a ${enemy.name}`}</h2> 
            <img src={enemy.image} alt={`${enemy.name} image`} />
            <ul>
                <li>Strength: {enemy.attributes.strength}</li>
                <li>Dexterity: {enemy.attributes.dexterity}</li>
                <li>Agility: {enemy.attributes.agility}</li>
                <li>Constitution: {enemy.attributes.constitution}</li>
                <li>Fate: {enemy.attributes.fate}</li>
                <li></li>
            </ul>

            <h2>{character.name}</h2> 
            <img src={character.image} alt={`${character.name} image`} />
            <ul>
                <li>Strength: {character.attributes.strength}</li>
                <li>Dexterity: {character.attributes.dexterity}</li>
                <li>Agility: {character.attributes.agility}</li>
                <li>Constitution: {character.attributes.constitution}</li>
                <li>Fate: {character.attributes.fate}</li>
                <li></li>
            </ul>
            
            
        </>
    ) : (
        <p>Loading...</p>
    )
}

export default Explore;
