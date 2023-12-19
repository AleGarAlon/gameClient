import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { API_URL } from "../config/config.index";
import "./explore.css";

function Explore() {
  const [enemy, setEnemy] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [character, setCharacter] = useState("");
  const id = user.character._id;
  const { location } = useParams();
  const [combat1, setCombat1] = useState([]);
  const [combat2, setCombat2] = useState([]);
  const [victory, setVictory] = useState("");
  console.log(id);
  console.log(location);

  const exploreCombat = async () => {
    const response = await axios.get(
      `${API_URL}/explore/combat?id=${id}&location=${location}`
    );
    const data = response.data;
    setUser({ ...user, character: data.character });
    setCharacter(data.character);
    setEnemy(data.enemy);
    setCombat1(data.combat1);
    setCombat2(data.combat2);
    setVictory(data.victory);
    console.log(data);
  };

  useEffect(() => {
    exploreCombat();
  }, []);

  return enemy && character ? (
    <>
      <h1>Battle in the {location}</h1>

      <div className="exploreCombatants">
        <div className="exploreCharacter">
          <h3>{character.name}</h3>
          <img
            className="exploreImg"
            src={character.image}
            alt={`${character.name} image`}
          />
          <div className="characterStats">
            <h4>
              Damage:{" "}
              {Math.round(
                user.character.damage *
                  1.1 ** user.character.attributes.strength
              )}
            </h4>
            <h4>
              Armor:{" "}
              {Math.round(
                user.character.attributes.armor *
                  1.1 ** user.character.attributes.constitution
              )}
            </h4>
            <h4>Strength: {user.character.attributes.strength}</h4>
            <h4>Dexterity: {user.character.attributes.dexterity}</h4>
            <h4>Agility: {user.character.attributes.agility}</h4>
            <h4>Constitution: {user.character.attributes.constitution}</h4>
            <h4>Health: {user.character.health}</h4>
          </div>
        </div>
        <div className="exploreEnemy">
          <h3>{`${enemy.name}`}</h3>
          <img
            className="exploreImg"
            src={enemy.image}
            alt={`${enemy.name} image`}
          />
          <div className="enemyStats">
            <h4>
              Damage:{" "}
              {Math.round(enemy.damage * 1.1 ** enemy.attributes.strength)}
            </h4>
            <h4>
              Armor:{" "}
              {Math.round(
                enemy.attributes.armor * 1.1 ** enemy.attributes.constitution
              )}
            </h4>
            <h4>Strength: {enemy.attributes.strength}</h4>
            <h4>Dexterity: {enemy.attributes.dexterity}</h4>
            <h4>Agility: {enemy.attributes.agility}</h4>
            <h4>Constitution: {enemy.attributes.constitution}</h4>
            <h4>Health: {enemy.health}</h4>
          </div>
        </div>
      </div>
      <h3>Combat results</h3>
      <h3>{victory}</h3>

      <div className="combatLog">
        <div className="exploreAttacker">
          {combat1.map((combatLog, index) => {
            return <p key={index}>{combatLog}</p>;
          })}
        </div>

        <div className="exploreDefender">
          {combat2.map((combatLog, index) => {
            return <p key={index}>{combatLog}</p>;
          })}
        </div>
      </div>
      <Link className="characterButton" to="/character">
        Return
      </Link>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default Explore;
