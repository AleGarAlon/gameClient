import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../config/config.index";
import "./shop.css"

function Shop() {
  const { user, setUser } = useContext(AuthContext);
  const [consumables, setConsumables] = useState([]);

  const getConsumables = async () => {
    setConsumables([])
    const res = await axios.get(`${API_URL}/shop`);
    const data = res.data;
    console.log(data);
    setConsumables(data);
  };

 const handleBuy = async (consumableId) => {
  const res = await axios.get(`${API_URL}/shop/buy?characterId=${user.character._id}&consumableId=${consumableId}`)
  const data = res.data
  setUser({...user, character: data})
}

const handleSell = async (consumableId) => {
  const res = await axios.get(`${API_URL}/shop/sell?characterId=${user.character._id}&consumableId=${consumableId}`)
  const data = res.data
  setUser({...user, character: data})
}

  useEffect(() => {
    getConsumables();
  }, []);

  return user.character && consumables ? (
    <>
      <h1>Shop</h1>
        <div className="shopItems">
        {consumables.map(consumable => ( 
            <img className="shopItemImg" key={consumable._id} src={consumable.image} alt={consumable.name} onClick={() => handleBuy(consumable._id)}/>
        ))}
        </div>

        <h4 >Consumables</h4>
      <div className="characterConsumables">
        {user.character.consumables && user.character.consumables.length > 0 ? (
          user.character.consumables.map((consumable) => (
            <ul key={crypto.randomUUID()}>
              <img className="consumablesItemImg" src={consumable.image} alt={consumable.name} onClick={() => handleSell(consumable._id)}/>
            </ul>
          ))
        ) : (
          <p> </p>
        )}
      </div>
      <Link to="/character">Return</Link>
    </>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Shop;
