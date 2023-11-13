import axios from "axios"
import { useContext,useState  } from "react"
import { API_URL } from "../config/config.index"
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";
import { useEffect } from "react";



function Train() {
  const {user, setUser} = useContext(AuthContext)
  const [notGold, setNotGold] = useState("")
  const [stripCharacter, setStripCharacter] = useState({})
  
  console.log("Your user inside training", user)
  
  
  const findCharacter = async () => {
    try {
      const res = await axios.get(`${API_URL}/character/${user.character._id}`)
      console.log(res)
      const data = res.data
      console.log(data)
      setStripCharacter(data)
      
    } catch (error) {
      console.log(error)
    }

  }

  const upgradeAttribute = async (attributeName) => {
    if(user.character.gold >= stripCharacter.attributes[attributeName] * 5){
      try {
      const updatedCharacter =await axios.patch(`${API_URL}/character/${user.character._id}`, {updatedAttribute: attributeName})
       console.log("Your character after the lvl up",updatedCharacter.data)

       setUser({ ...user, character: updatedCharacter.data });
   } catch (error) {
     console.log(error)
   }
    }else {
      setNotGold("Not enough gold")
    }
    
    
     }
    
     useEffect (()=>{
      findCharacter()

     },[user])
  return user.character && stripCharacter.attributes ? (
    <>
    <div>Train</div>

    {notGold === "" ? (<p></p>): (<p>{notGold}</p>)}

    <ul>
      <li>
        Strength: {user.character.attributes.strength} ({stripCharacter.attributes.strength})
        Upgrade cost: {Math.round(stripCharacter.attributes.strength * stripCharacter.attributes.strength)}
        <button onClick={() => upgradeAttribute('strength')}>Upgrade</button>
      </li>
      <li>
        Desterity: {user.character.attributes.dexterity} ({stripCharacter.attributes.dexterity})
        Upgrade cost: {Math.round(stripCharacter.attributes.dexterity * stripCharacter.attributes.dexterity **0.8)}
        <button onClick={() => upgradeAttribute('dexterity')}>Upgrade</button>
      </li>
      <li>
        Agility: {user.character.attributes.agility} ({stripCharacter.attributes.agility})
        Upgrade cost: {Math.round(stripCharacter.attributes.agility * stripCharacter.attributes.agility ** 0.8)}
        <button onClick={() => upgradeAttribute('agility')}>Upgrade</button>
      </li>
      <li>
        Constitution: {user.character.attributes.constitution} ({stripCharacter.attributes.constitution})
        Upgrade cost: {Math.round(stripCharacter.attributes.constitution * stripCharacter.attributes.constitution ** 0.9)}
        <button onClick={() => upgradeAttribute('constitution')}>Upgrade</button>
      </li>
      <li>
        Fate: {user.character.attributes.fate} ({stripCharacter.attributes.fate})
        Upgrade cost: {Math.round(stripCharacter.attributes.fate * stripCharacter.attributes.fate ** 0.6)}
        <button onClick={() => upgradeAttribute('fate')}>Upgrade</button>
      </li>
    </ul>

    <Link to= "/character">Return</Link>
  </>
    

    


  ): <h4>Loading...</h4>    
}

export default Train