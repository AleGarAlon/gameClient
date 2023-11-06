import axios from "axios";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./character.css"


function Character() {
  const {user, setUser} = useContext(AuthContext)
  const gearOrder = ["trinket","helmet","gloves","chest","boots","pants","weapon","shield"]

  const handleEquip = async (itemId) => {
    try {
      const res = await axios.get(`${API_URL}/equip/${itemId}`)
      const data = res.data
      console.log(data)
      setUser({ ...user, character: data });
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnequip = async (itemId) => {
    try {
      const res = await axios.get(`${API_URL}/unequip/${itemId}`)
      const data = res.data
      console.log(data)
      setUser({ ...user, character: data });
    } catch (error) {
      console.log(error)
    }
  }

  return user.character.attributes && user.character ? (
    <div className="character">
      <div className="characterTop">
        <div className="characterInfo">
          <h1 className="characterName">{user.character.name}</h1>
          <img className="characterImg" src={user.character.image} alt={user.character.name} style={{width: "10rem"}}/>
          <h4>Damage: {user.character.damage}</h4>
          <h4>Armor: {user.character.attributes.armor}</h4>
          <h4>Strength: {user.character.attributes.strength}</h4>
          <h4>Dexterity: {user.character.attributes.dexterity}</h4>
          <h4>Agility: {user.character.attributes.agility}</h4>
          <h4>Constitution: {user.character.attributes.constitution}</h4>
          <h4>Fate: {user.character.attributes.fate}</h4>
        </div>

        <div className="characterGear" >
        {gearOrder.map((type) => {
        const gearItems = user.character.gear.find((item) => item.type === type);
        return (
          <div key={type}>
            {gearItems ? ( 
              <img className= "gearImg" src={gearItems.image} alt={type} onClick={() => handleUnequip(gearItems._id)}/>
            ) : (
              <img className= "gearImg" src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699305604/game/UI%20elements/CasualUI_15_5_xohkuj.png" alt={type} />
            )}
          </div>
        );
      })}

        </div>
      </div>
        <h4 >Inventory</h4>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
        user.character.inventory.map((item, index) => (
        <div key={crypto.randomUUID()}>
    
          <img className="inventoryItemImg" src={item.image} alt={item.name} onClick={() => handleEquip(item._id)}/>
        </div>
        ))
        ) : (
          <p>No items in inventory</p>
        )}
      </div>

        <h4 >Consumables</h4>
      <div className="characterConsumables">
        {user.character.consumables && user.character.consumables.length > 0 ? (
          user.character.consumables.map((consumable) => (
            <ul key={crypto.randomUUID()}>
              <img className="consumablesItemImg" src={consumable.image} alt={consumable.name} />
            </ul>
          ))
        ) : (
          <p>No consumables available</p>
        )}
      </div>

      </div>  
      ) : <h2>Loading...</h2>
    
}

export default Character