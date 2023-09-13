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
    const [combat1, setCombat1] = useState("")
    const [combat2, setCombat2] = useState("")
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
                setCombat1("")
                setCombat2("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const figth = () => {
        const turn = Math.random()
        const randomDex1 = parseInt(Math.random() * 100);
        const randomAgi1 = parseInt(Math.random() * 100);
        const randomFate1 = parseInt(Math.random() * 100);
        const randomDex2 = parseInt(Math.random() * 100);
        const randomAgi2 = parseInt(Math.random() * 100);
        const randomFate2 = parseInt(Math.random() * 100);


        //player turn
        //Random C.dex vs random E.agi to deternine if the atack land
        if (randomDex1 + character.attributes.dexterity > randomAgi1 + enemy.attributes.agility) {
            //if land, determine if the fate attribute triggers 
            //fate triggers = ignore armor
            if (character.attributes.fate>= randomFate1) {
                //determine the damage, playerdamage + str atribute
                const dmg = (character.damage[1] + character.attributes.strength);
                enemy.health - dmg;
                setCombat1(`${enemy.name} recived a piercing strike of ${dmg}`)
            }
            //non fate attack
            else {
                const dmg = (character.damage[1] + character.attributes.strength) - enemy.attributes.armor
                enemy.health - dmg;
                setCombat1(`${enemy.name} recived a strike of ${dmg}`)
            }
        }
        else {
            setCombat1(`${character.name}, atack failed`)
        }

        //enemy turn
        //Random E.dex vs random C.agi to deternine if the atack land
        if (randomDex2 + enemy .attributes.dexterity > randomAgi2 + character.attributes.agility) {
            //if land, determine if the fate attribute triggers 
            //fate triggers = ignore armor
            if (enemy.attributes.fate>= randomFate2) {
                //determine the damage, enemydamage + str atribute
                const dmg = (enemy.damage[1] + enemy.attributes.strength);
                character.health - dmg;
                setCombat2(`${character.name} recived a piercing strike of ${dmg}`)
            }
            //non fate attack
            else {
                const dmg = (enemy.damage[1] + enemy.attributes.strength) - character.attributes.armor
                character.health - dmg;
                setCombat2(`${character.name} recived a strike of ${dmg}`)
            }
        }// if the attack failed on the dex vs agi
        else {
            setCombat2(`${enemy.name}, atack failed`)
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
            <h4>{combat1}</h4>
            <h4>{combat2}</h4>
            <Link to = "/main">Return to the village</Link>
        <h2>{`Your enemy is a ${enemy.name}`}</h2> 
            <img src={enemy.image} alt={`${enemy.name} image`} style={{width: "10rem"}} />
            <ul>
                <li>Strength: {enemy.attributes.strength}</li>
                <li>Dexterity: {enemy.attributes.dexterity}</li>
                <li>Agility: {enemy.attributes.agility}</li>
                <li>Constitution: {enemy.attributes.constitution}</li>
                <li>Fate: {enemy.attributes.fate}</li>
                <li>Armor: {enemy.attributes.armor}</li>
            </ul>

            <h2>{character.name}</h2> 
            <img src={character.image} alt={`${character.name} image`} style={{width: "10rem"}} />
            <ul>
                <li>Strength: {character.attributes.strength}</li>
                <li>Dexterity: {character.attributes.dexterity}</li>
                <li>Agility: {character.attributes.agility}</li>
                <li>Constitution: {character.attributes.constitution}</li>
                <li>Fate: {character.attributes.fate}</li>
                <li>Armor: {character.attributes.armor}</li>
            </ul>
            
            
        </>
    ) : (
        <p>Loading...</p>
    )
}

export default Explore;
