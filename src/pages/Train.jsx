import axios from "axios"
import { useContext,useState  } from "react"
import { API_URL } from "../config/config.index"
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";



function Train() {
  const {user, setUser} = useContext(AuthContext)
  
  console.log("Your user inside training", user)
  
  
  

  const upgradeAttribute = async (attributeName) => {
    
    try {
      const updatedCharacter =await axios.patch(`${API_URL}/character/${user.character._id}`, {updatedAttribute: attributeName})
       console.log(updatedCharacter.data)

       setUser({ ...user, character: updatedCharacter.data });
   } catch (error) {
     console.log(error)
   }
    
     }
    
  return user.character ? (
    <>
    <div>Train</div>

    

    <ul>
      <li>
        Strength: {user.character.attributes.strength}
        Upgrade cost: {user.character.attributes.strength * 5}
        <button onClick={() => upgradeAttribute('strength')}>Upgrade</button>
      </li>
      <li>
        Desterity: {user.character.attributes.dexterity}
        Upgrade cost: {user.character.attributes.dexterity *5}
        <button onClick={() => upgradeAttribute('dexterity')}>Upgrade</button>
      </li>
      <li>
        Agility: {user.character.attributes.agility}
        Upgrade cost: {user.character.attributes.agility * 5}
        <button onClick={() => upgradeAttribute('agility')}>Upgrade</button>
      </li>
      <li>
        Constitution: {user.character.attributes.constitution}
        Upgrade cost: {user.character.attributes.constitution * 5}
        <button onClick={() => upgradeAttribute('constitution')}>Upgrade</button>
      </li>
      <li>
        Fate: {user.character.attributes.fate}
        Upgrade cost: {user.character.attributes.fate * 5}
        <button onClick={() => upgradeAttribute('fate')}>Upgrade</button>
      </li>
    </ul>

    <Link to= "/character">Return</Link>
  </>
    

    


  ): <h4>Loading...</h4>
}

export default Train