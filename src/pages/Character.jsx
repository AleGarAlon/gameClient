import axios from "axios";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./character.css"


function Character() {
  const {user} = useContext(AuthContext)

  return user.character.attributes && user.character ? (
    <div className="character">
      <div className="characterTop">
        <div className="characterInfo">
          <h1>{user.character.name}</h1>
          <img src={user.character.image} alt={user.character.name} style={{width: "10rem"}}/>
          <h4>Damage: {user.character.damage}</h4>
          <h4>Armor: {user.character.attributes.armor}</h4>
          <h4>Strength: {user.character.attributes.strength}</h4>
          <h4>Dexterity: {user.character.attributes.dexterity}</h4>
          <h4>Agility: {user.character.attributes.agility}</h4>
          <h4>Constitution: {user.character.attributes.constitution}</h4>
          <h4>Fate: {user.character.attributes.fate}</h4>
        </div>

        <div className="characterGear" >

        </div>
      </div>
        <h4 >Inventory</h4>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
        user.character.inventory.map((item, index) => (
        <div key={index}>
          {/* <p className="inventoryItemName">{item.name}</p> */}
          <img className="inventoryItemImg" src={item.image} alt={item.name} />
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
            <ul key={consumable._id}>
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