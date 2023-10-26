import axios from "axios";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";


function Character() {
  const {user} = useContext(AuthContext)

  return user.character ? (
    <>
    
    <h1>{user.character.name}</h1>
    <img src={user.character.image} alt={user.character.name} style={{width: "10rem"}}/>

    <h4 >Inventory</h4>
{user.character.inventory && user.character.inventory.length > 0 ? (
  user.character.inventory.map((item) => (
    <ul key={item._id}>
      <li>{item.name}</li>
      <li>{item.image}</li>
    </ul>
  ))
) : (
  <p>No items in inventory</p>
)}

<h4>Consumables</h4>
{user.character.consumables && user.character.consumables.length > 0 ? (
  user.character.consumables.map((consumable) => (
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

export default Character