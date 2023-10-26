import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../config/config.index";

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

  useEffect(() => {
    getConsumables();
  }, []);

  return user.character && consumables ? (
    <>
      <div>Shop</div>

      {consumables.map(consumable => ( 
          <img key={consumable._id} src={consumable.image} alt={consumable.name} />
      ))}

      <Link to="/character">Return</Link>
    </>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Shop;
