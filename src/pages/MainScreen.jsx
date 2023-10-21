
import axios from "axios";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";




function MainScreen() {
const {user} = useContext(AuthContext)
const characterId = user.character._id
const [character, setCharacter] = useState()

console.log("your current charater is" , user.character)

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
},[])

    return character ? (
        <>
        
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} style={{width: "10rem"}}/>

        <h4 >Inventory</h4>
    {character.inventory && character.inventory.length > 0 ? (
      character.inventory.map((item) => (
        <ul key={item._id}>
          <li>{item.name}</li>
          <li>{item.image}</li>
        </ul>
      ))
    ) : (
      <p>No items in inventory</p>
    )}

    <h4>Consumables</h4>
    {character.consumables && character.consumables.length > 0 ? (
      character.consumables.map((consumable) => (
        <ul key={consumable._id}>
          <li>{consumable.name}</li>
          <li>{consumable.image}</li>
        </ul>
      ))
    ) : (
      <p>No consumables available</p>
    )}
        </>
    ) : <h2>Loading...</h2>
}
export default MainScreen;