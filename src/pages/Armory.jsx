import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../config/config.index";
import "./armory.css";
import Tooltip from "../components/Tooltip";

function Armory() {
  const { user, setUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [notGold, setNotGold] = useState("");
  //ask the back for random items
  const getItems = async () => {
    try {
      setItems([]);
      const res = await axios.get(`${API_URL}/armory`);
      if (res.status === 200) {
        const data = res.data;
        setItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //handle the buy action
  const handleBuy = async (itemId, itemPrice) => {
    setNotGold("");
    if (user.character.gold >= itemPrice) {
      const res = await axios.get(
        `${API_URL}/armory/buy?characterId=${user.character._id}&itemId=${itemId}`
      );
      const data = res.data;
      setUser({ ...user, character: data });
    } else {
      setNotGold("Not enough gold");
    }
  };

  //handle the sell action
  const handleSell = async (itemId) => {
    const res = await axios.get(
      `${API_URL}/armory/sell?characterId=${user.character._id}&itemId=${itemId}`
    );
    const data = res.data;
    setUser({ ...user, character: data });
  };

  //handle the sell all action
  const handleSellAll = async () => {
    const res = await axios.get(
      `${API_URL}/armory/sellAll?characterId=${user.character._id}`
    );
    const data = res.data;
    setUser({ ...user, character: data });
  };

  useEffect(() => {
    getItems();
  }, []);
  return user.character && items ? (
    <div className="armory">
      <h1 className="armoryTitle">Armory</h1>
      <img
        className="armoryImg"
        src="https://res.cloudinary.com/dvml0gelc/image/upload/v1695039399/game/character%20portraits/m_02_mkthzt.png"
        alt="ArmoryImg"
      />
      <div className="armoryItems">
        {items.map((item) => (
          <Tooltip
            item={item}
            handleButton={() => handleBuy(item._id, item.price)}
            buttomText="Buy"
            className="armoryItemImg"
            key={item._id}
          />
        ))}
      </div>
      {notGold === "" ? <p></p> : <p className="notGold">{notGold}</p>}

      <h4>Inventory</h4>
      <button className="sellAllBtn" onClick={() => handleSellAll()}>
        Sell all items
      </button>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
          user.character.inventory.map((item) => (
            <Tooltip
              item={item}
              handleButton={handleSell}
              buttomText="Sell"
              className="inventoryItemImg"
              key={crypto.randomUUID()}
            />
          ))
        ) : (
          <p>No items in inventory</p>
        )}
      </div>
      <p>
        The blacksmith will give you 1/4 of the value for your pieces of gear
      </p>
      <Link className="characterButton" to="/character">
        Return
      </Link>
    </div>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Armory;
