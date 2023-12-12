import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./train.css";

function Train() {
  const { user, setUser } = useContext(AuthContext);
  const [notGold, setNotGold] = useState("");
  const [stripCharacter, setStripCharacter] = useState({});

  console.log("Your user inside training", user);

  const findCharacter = async () => {
    try {
      const res = await axios.get(`${API_URL}/character/${user.character._id}`);
      console.log(res);
      const data = res.data;
      console.log(data);
      setStripCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };

  const upgradeAttribute = async (attributeName) => {
    setNotGold("");
    if (
      user.character.gold >=
      stripCharacter.attributes[attributeName] **
        (stripCharacter.attributes[attributeName] * 0.16) +
        stripCharacter.attributes[attributeName] *
          stripCharacter.attributes[attributeName]
    ) {
      try {
        const updatedCharacter = await axios.patch(
          `${API_URL}/character/${user.character._id}`,
          { updatedAttribute: attributeName }
        );
        console.log("Your character after the lvl up", updatedCharacter.data);

        setUser({ ...user, character: updatedCharacter.data });
      } catch (error) {
        console.log(error);
      }
    } else {
      setNotGold("Not enough gold");
    }
  };

  useEffect(() => {
    findCharacter();
  }, [user]);
  return user.character && stripCharacter.attributes ? (
    <div className="train">
      <h1 className="trainTitle">Train</h1>
      <img
        className="trainImg"
        src="https://res.cloudinary.com/dvml0gelc/image/upload/v1695039428/game/character%20portraits/f_09_zvq81y.png"
        alt="trainImg"
      />
      {notGold === "" ? <p></p> : <p className="notGold">{notGold}</p>}

      <div className="trainStats">
        <div className="stat">
          <p>
            Strength: {user.character.attributes.strength} (
            {stripCharacter.attributes.strength})
          </p>
          <div className="statCost">
            <img
              className="coinImg"
              onClick={() => upgradeAttribute("strength")}
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="coins"
            />
            <p>
              {Math.round(
                stripCharacter.attributes.strength **
                  (stripCharacter.attributes.strength * 0.11) +
                  stripCharacter.attributes.strength *
                    stripCharacter.attributes.strength
              )}
            </p>
          </div>
        </div>

        <div className="stat">
          <p>
            Dexterity: {user.character.attributes.dexterity} (
            {stripCharacter.attributes.dexterity})
          </p>
          <div className="statCost">
            <img
              className="coinImg"
              onClick={() => upgradeAttribute("dexterity")}
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="coins"
            />
            <p>
              {Math.round(
                stripCharacter.attributes.dexterity **
                  (stripCharacter.attributes.dexterity * 0.11) +
                  stripCharacter.attributes.dexterity *
                    stripCharacter.attributes.dexterity
              )}
            </p>
          </div>
        </div>
        <div className="stat">
          <p>
            Agility: {user.character.attributes.agility} (
            {stripCharacter.attributes.agility})
          </p>
          <div className="statCost">
            <img
              className="coinImg"
              onClick={() => upgradeAttribute("agility")}
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="coins"
            />
            <p>
              {Math.round(
                stripCharacter.attributes.agility **
                  (stripCharacter.attributes.agility * 0.11) +
                  stripCharacter.attributes.agility *
                    stripCharacter.attributes.agility
              )}
            </p>
          </div>
        </div>

        <div className="stat">
          <p>
            Constitution: {user.character.attributes.constitution} (
            {stripCharacter.attributes.constitution})
          </p>
          <div className="statCost">
            <img
              className="coinImg"
              onClick={() => upgradeAttribute("constitution")}
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="coins"
            />
            <p>
              {Math.round(
                stripCharacter.attributes.constitution **
                  (stripCharacter.attributes.constitution * 0.11) +
                  stripCharacter.attributes.constitution *
                    stripCharacter.attributes.constitution
              )}
            </p>
          </div>
        </div>

        <div className="stat">
          <p>
            Fate: {user.character.attributes.fate} (
            {stripCharacter.attributes.fate})
          </p>
          <div className="statCost">
            <img
              className="coinImg"
              onClick={() => upgradeAttribute("fate")}
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="coins"
            />
            <p>
              {Math.round(
                stripCharacter.attributes.fate **
                  (stripCharacter.attributes.fate * 0.11) +
                  stripCharacter.attributes.fate *
                    stripCharacter.attributes.fate
              )}
            </p>
          </div>
        </div>
      </div>

      <Link className="characterButton" to="/character">
        Return
      </Link>
    </div>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Train;
