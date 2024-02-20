import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import axios from "axios";
import { API_URL } from "../config/config.index";
import "./enemySelect.css";

function EnemySelect() {
  const { user } = useContext(AuthContext);
  const character = user.character;
  const { location } = useParams();
  const [enemies, setEnemies] = useState([]);

  const locationEnemies = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/explore/zone?location=${location}`
      );
      console.log(res.data);
      const sortedEnemies = res.data.sort((a, b) => a.power - b.power);
      setEnemies(sortedEnemies);
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
        return character.power >= enemy.power ? (
          <Link
            className="enemyCard"
            key={enemy._id}
            to={`/explore/${enemy._id}`}
          >
            <h3>{enemy.name}</h3>
            <img className="enemyCardImg" src={enemy.image} alt="enemyImage" />
            <div className="enemyPower">
              <img
                className="navImg"
                src="https://res.cloudinary.com/dvml0gelc/image/upload/v1707175426/game/UI%20elements/CasualUI_9_2_oqwc7y.png"
                alt="Power"
              />
              <p className="navPower"> {enemy.power}</p>
            </div>
          </Link>
        ) : (
          <div
            className="enemyCard"
            key={enemy._id}
            to={`/explore/${enemy._id}`}
          >
            <h3>{enemy.name}</h3>
            <img
              className="enemyCardImg"
              src={enemy.image}
              style={{ filter: "grayscale(100%)" }}
              alt="enemyImage"
            />
            <div className="enemyPower">
              <img
                className="navImg"
                src="https://res.cloudinary.com/dvml0gelc/image/upload/v1707175426/game/UI%20elements/CasualUI_9_2_oqwc7y.png"
                alt="Power"
              />
              <p className="navPower"> {enemy.power}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EnemySelect;
