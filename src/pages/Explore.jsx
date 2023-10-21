import { useState, useEffect, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { API_URL } from "../config/config.index";
import "./explore.css"



function Explore () {
    const [enemy, setEnemy] = useState(null)
    const {user} = useContext(AuthContext)
    const [character, setCharacter] = useState("")
    const characterId = user.character._id
    const {location} = useParams()
    const [combat1, setCombat1] = useState([])
    const [combat2, setCombat2] = useState([])
    const [turn, setTurn] = useState("")
    const [victory, setVictory] = useState("")
    console.log(characterId)
    
    


    const getEnemy = async () => {
        try {
            const response = await axios.get(`${API_URL}/explore/${location}`);
            if(response.status === 200) {
                const data = response.data
                setEnemy({...data})
                
                
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
            setCharacter({...data})
        }
        } 
        catch (error) {
            console.log(error)
        }
    }

    const updateCharacter = async ()=> {
        try {
            console.log("your character inside the update is",character)
             await axios.patch(`${API_URL}/character/${characterId}`, character)
        } catch (error) {
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
                    let combat1Result = `${enemy.name} recived a piercing strike of ${dmg}` 
                    console.log(combat1Result)
                    setCombat1((prevCombat1) => [...prevCombat1, combat1Result])
                    console.log("Your combat1 is", combat1)
                }
                //non fate attack
                else {
                    const dmg = (character.damage + character.attributes.strength) - enemy.attributes.armor
                    // console.log("Enemy health pre atack", enemy.health)
                    enemy.health -= dmg;
                    // console.log("Enemy health post atack", enemy.health)
                    let combat1Result = `${enemy.name} recived a strike of ${dmg}` 
                    console.log(combat1Result)
                    setCombat1((prevCombat1) => [...prevCombat1, combat1Result])
                    console.log("Your combat1 is", combat1)
                }
            }
            else {
                let combat1Result = `${character.name}, atack failed`
                console.log(combat1Result)
                setCombat1((prevCombat1) => [...prevCombat1, combat1Result])
                console.log("Your combat1 is", combat1)
                
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
                    // console.log("Character health pre attack", character.health)
                    const newHealth = character.health - dmg;
                    
                    // console.log(newHealth)
                    // console.log("Character health post attack", character.health)
                    setCharacter({...character, health: newHealth,});
                        let combat2Result = `${character.name} recived a piercing strike of ${dmg}`
                        console.log(combat2Result)
                        setCombat2((prevCombat2) => [...prevCombat2, combat2Result])
                        console.log("Your combat2 is", combat2)
                    }  
                //non fate attack

                else {
                    const dmg = (enemy.damage + enemy.attributes.strength) - character.attributes.armor
                    const newHealth = character.health - dmg;
                    character.health = newHealth
                    // console.log(newHealth)
                    // console.log("Character health post attack", character.health)
                    setCharacter({...character, health: newHealth,});
                      let combat2Result =`${character.name} recived a strike of ${dmg}`
                      console.log(combat2Result)
                      setCombat2((prevCombat2) => [...prevCombat2, combat2Result])
                        console.log("Your combat2 is", combat2)
                }
            }// if the attack failed on the dex vs agi
            else {
                let combat2Result =`${enemy.name}, atack failed`
                console.log(combat2Result)
                setCombat2((prevCombat2) => [...prevCombat2, combat2Result])
                console.log("Your combat2 is", combat2)
            }
            
        }
       
    

    

    useEffect(()=> {
        getEnemy();
        getCharacter();     
    }, []) 
    
    
    useEffect(() => {
        if (enemy && character) {
            const whosTurn = Math.random();
            
            if (whosTurn % 2 !== 0){
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
            if(whosTurn % 2 === 0) {
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
    
    useEffect (()=>{
        if(victory !== "")
        updateCharacter()
    },[victory])
    

    return enemy && character  ? (
        <>
        <h1>Battle in the {location}</h1>

         
        <div className="exploreCombatants">
            <div className="exploreCharacter">
            <h3>{character.name}</h3> 
            <img className= "exploreImg" src={character.image} alt={`${character.name} image`} style={{width: "10rem"}} />
            <ul>
                <li>Strength: {character.attributes.strength}</li>
                <li>Dexterity: {character.attributes.dexterity}</li>
                <li>Agility: {character.attributes.agility}</li>
                <li>Constitution: {character.attributes.constitution}</li>
                <li>Fate: {character.attributes.fate}</li>
                <li>Armor: {character.attributes.armor}</li>
            </ul>
            </div>
            <div className="exploreEnemy">
            <h3>{`${enemy.name}`}</h3>
            <img className= "exploreImg" src={enemy.image} alt={`${enemy.name} image`} style={{width: "10rem"}} />
            <ul>
                
                <li>Strength: {enemy.attributes.strength}</li>
                <li>Dexterity: {enemy.attributes.dexterity}</li>
                <li>Agility: {enemy.attributes.agility}</li>
                <li>Constitution: {enemy.attributes.constitution}</li>
                <li>Fate: {enemy.attributes.fate}</li>
                <li>Armor: {enemy.attributes.armor}</li>
            </ul>
            </div>
        </div>
        <h3>Combat results</h3>
            <h3>{victory}</h3>
            <h4>{turn}</h4>

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
            <Link to = "/main">Return to the village</Link>
            
            
        </>
    ) : (
        <p>Loading...</p>
    )
}

export default Explore;
