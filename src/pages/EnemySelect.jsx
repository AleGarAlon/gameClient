import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config.index";
import "./enemySelect.css";

function EnemySelect() {
  const { location } = useParams();
  const [enemies, setEnemies] = useState([]);

  const locationEnemies = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/explore/zone?location=${location}`
      );
      console.log(res.data);
      setEnemies(res.data);
      console.log(enemies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    locationEnemies();
  }, []);

  useEffect(() => {}, [enemies]);

  return (
    <div className="selectEnemyScreen">
      <h1 className="locationTitle">{location}</h1>

      {enemies.map((enemy) => {
        return (
          <Link
            className="enemyCard"
            key={enemy._id}
            to={`/explore/${enemy._id}`}
          >
            <h3>{enemy.name}</h3>
            <img className="enemyCardImg" src={enemy.image} alt="enemyImage" />
          </Link>
        );
      })}
    </div>
  );
}

export default EnemySelect;
