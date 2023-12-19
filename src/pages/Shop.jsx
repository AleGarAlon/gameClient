import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../config/config.index";
import "./shop.css";
import Tooltip from "../components/Tooltip";

function Shop() {
  const { user, setUser } = useContext(AuthContext);
  const [consumables, setConsumables] = useState([]);
  const [notGold, setNotGold] = useState("");

  const getConsumables = async () => {
    setConsumables([]);
    const res = await axios.get(`${API_URL}/shop`);
    const data = res.data;
    console.log(data);
    setConsumables(data);
  };

  const handleBuy = async (consumableId, consumablePrice) => {
    setNotGold("");
    if (user.character.gold >= consumablePrice) {
      const res = await axios.get(
        `${API_URL}/shop/buy?characterId=${user.character._id}&consumableId=${consumableId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } else {
      setNotGold("Not enough gold");
    }
  };
  const handleBuyX5 = async (consumableId, consumablePrice) => {
    setNotGold("");
    if (user.character.gold >= consumablePrice) {
      const res = await axios.get(
        `${API_URL}/shop/buyX5?characterId=${user.character._id}&consumableId=${consumableId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } else {
      setNotGold("Not enough gold");
    }
  };

  const handleSell = async (consumableId) => {
    const res = await axios.get(
      `${API_URL}/shop/sell?characterId=${user.character._id}&consumableId=${consumableId}`
    );
    const data = res.data;
    setUser({ ...user, character: data });
  };

  useEffect(() => {
    getConsumables();
  }, []);

  return user.character && consumables ? (
    <div className="shop">
      <h1 className="shopTitle">Shop</h1>
      <img
        className="merchantImg"
        src="https://res.cloudinary.com/dvml0gelc/image/upload/v1695039409/game/character%20portraits/f_04_ehks9z.png"
        alt="MerchantImg"
      />
      <div className="shopItems">
        {consumables.map((consumable) => (
          <Tooltip
            item={consumable}
            handleButton={() => handleBuy(consumable._id, consumable.price)}
            handleButtonX5={() => handleBuyX5(consumable._id, consumable.price)}
            buttomText="Buy"
            buttonTextX5="Buy 5"
            className="shopItemImg"
            key={consumable._id}
          />
        ))}
      </div>

      {notGold === "" ? <p></p> : <p className="notGold">{notGold}</p>}

      <h4>Consumables</h4>
      <div className="characterConsumables">
        {user.character.consumables && user.character.consumables.length > 0 ? (
          user.character.consumables.map((consumable) => (
            <Tooltip
              item={consumable}
              handleButton={handleSell}
              buttomText="Sell"
              className="consumablesItemImg"
              key={crypto.randomUUID()}
            />
          ))
        ) : (
          <p> </p>
        )}
      </div>
      <p>The merchant will give you 1/4 of the value for your consumables</p>
      <Link className="characterButton" to="/character">
        Return
      </Link>
    </div>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Shop;
