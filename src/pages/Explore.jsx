import { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { API_URL } from "../config/config.index";



function Explore () {
    const [enemy, setEnemy] = useState(null)
    const {user, setUser} = useContext(AuthContext)
    const [character, setCharacter] = useState("")
    const characterId = user.character._id
    const {location} = useParams()
    const [combat1, setCombat1] = useState("")
    const [combat2, setCombat2] = useState("")
    const [turn, setTurn] = useState("")
    const [victory, setVictory] = useState("")
    console.log(characterId)


    const getEnemy = async () => {
        try {
            const response = await axios.get(`${API_URL}/explore/${location}`);
            if(response.status === 200) {
                const data = response.data
                // console.log("your info",data)
                setEnemy({...data})
                setCombat1("")
                setCombat2("")
                setTurn("")
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    
        const characterTurn = () => {

            const randomDex1 = parseInt(Math.random() * 100);
            const randomAgi1 = parseInt(Math.random() * 100);
            const randomFate1 = parseInt(Math.random() * 100);
            //player turn
            //Random C.dex vs random E.agi to deternine if the atack land
            if (randomDex1 + character.attributes.dexterity > randomAgi1 + enemy.attributes.agility) {
                //if land, determine if the fate attribute triggers 
                //fate triggers = ignore armor
                if (character.attributes.fate>= randomFate1) {
                    //determine the damage, playerdamage + str atribute
                    const dmg = (character.damage + character.attributes.strength);
                    enemy.health - dmg;
                    setCombat1(`${enemy.name} recived a piercing strike of ${dmg}`)
                }
                //non fate attack
                else {
                    const dmg = (character.damage + character.attributes.strength) - enemy.attributes.armor
                    console.log("Enemy health pre atack", enemy.health)
                    enemy.health -= dmg;
                    console.log("Enemy health post atack", enemy.health)
                    setCombat1(`${enemy.name} recived a strike of ${dmg}`)
                }
            }
            else {
                setCombat1(`${character.name}, atack failed`)
            }
        }

        const enemyTurn = ()=> {
            const randomDex2 = parseInt(Math.random() * 100);
            const randomAgi2 = parseInt(Math.random() * 100);
            const randomFate2 = parseInt(Math.random() * 100);
            //enemy turn
            //Random E.dex vs random C.agi to deternine if the atack land
            if (randomDex2 + enemy .attributes.dexterity > randomAgi2 + character.attributes.agility) {
                //if land, determine if the fate attribute triggers 
                //fate triggers = ignore armor
                if (enemy.attributes.fate>= randomFate2) {
                    //determine the damage, enemydamage + str atribute
                    const dmg = (enemy.damage + enemy.attributes.strength);
                    console.log("Character health pre attack", character.health)
                    const newHealth = character.health - dmg;
                    character.health = newHealth
                    console.log(newHealth)
                    console.log("Character health post attack", character.health)
                    setUser({
                        ...user,
                        character: {
                          ...user.character,
                          health: newHealth,
                        },
                      });
                    setCombat2(`${character.name} recived a piercing strike of ${dmg}`)
                }
                //non fate attack
                else {
                    const dmg = (enemy.damage + enemy.attributes.strength) - character.attributes.armor
                    const newHealth = character.health - dmg;
                    character.health = newHealth
                    console.log(newHealth)
                    console.log("Character health post attack", character.health)
                    setUser({
                        ...user,
                        character: {
                          ...user.character,
                          health: newHealth,
                        },
                      });
                    setCombat2(`${character.name} recived a strike of ${dmg}`)
                }
            }// if the attack failed on the dex vs agi
            else {
                setCombat2(`${enemy.name}, atack failed`)
            }
        }
       
    

    

    useEffect(()=> {
        getEnemy();
        getCharacter();
        
    }, []) 
    
    
    useEffect(() => {
        if (enemy && character) {
            const turn = Math.random();
            console.log(turn)
            if (turn % 2 !== 0){
                setTurn(`${character.name} attack first`)
            while (character.health > 0 && enemy.health > 0) {
                characterTurn();
                if (enemy.health <= 0) {
                    setVictory(`${character.name} wins`)
                    break
                }
                enemyTurn();
                if (character.health <= 0){
                    setVictory(`${enemy.name} wins`)
                    break
                }
            }
            }
            if(turn % 2 === 0) {
                setTurn(`${enemy.name} attack first`)
                while (character.health > 0 && enemy.health > 0) {
                    enemyTurn();
                    if (character.health <= 0){
                        setVictory(`${enemy.name} wins`)
                        break
                    }
                    characterTurn();
                    if (enemy.health <= 0) {
                        setVictory(`${character.name} wins`)
                        break
                    }
                }  
            }
        }

    }, [enemy]); 
    

    return enemy && character ? (
        <>
        <h1>Battle in the {location}</h1>

        <h3>Combat results</h3>
            <h3>{victory}</h3>
            <h4>{turn}</h4>
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
