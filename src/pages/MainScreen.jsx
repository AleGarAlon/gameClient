
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
import Navbar from "../components/Navbar";


function MainScreen() {
const {user} = useContext(AuthContext)
const character = user.character
console.log("your current charater is" , user.character)



    return (
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
    )
}
export default MainScreen;