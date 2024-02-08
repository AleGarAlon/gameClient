import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext, useEffect, useState } from "react";
import "./navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [healthPercentage, setHealthPercentage] = useState("");
  useEffect(() => {
    if (user.character.health) {
      const health = user.character.health.toString();
      const percentage = health.slice(0, -1) + "." + health.slice(-1);
      setHealthPercentage(percentage);
    }
  }, [user.character]);

  return user.character ? (
    <nav className="navBar">
      <div className="navegations">
        <Link className="navLinks linkMap" to="/map">
          Map
        </Link>
        <Link className="navLinks linkShop" to="/shop">
          Shop
        </Link>
        <Link className="navLinks linkArmory" to="/armory">
          Armory
        </Link>
        <Link className="navLinks linkTrain" to="/train">
          Training
        </Link>
        {/* <Link className= "navLinks linkPit" to="/pit">Pit</Link> */}
        {/* <Link className= "navLinks" to="/create">Create enemy form</Link> */}
      </div>
      <Link className="characterLink" to="character">
        <div className="navStats">
          <p
            className="navHealth"
            style={{ width: `${parseFloat(healthPercentage)}rem` }}
          >
            {user.character.health}
          </p>
          <div className="navResources">
            <img
              className="navImg"
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1699917171/game/UI%20elements/TradingIcons_112_t_zfbxi0.png"
              alt="gold"
            />
            <p></p>
            <p className="navGold"> {user.character.gold}</p>
            <img
              className="navImg"
              src="https://res.cloudinary.com/dvml0gelc/image/upload/v1707175426/game/UI%20elements/CasualUI_9_2_oqwc7y.png"
              alt="Power"
            />
            <p></p>
            <p className="navPower"> {user.character.power}</p>
          </div>
        </div>
      </Link>
    </nav>
  ) : (
    <h4>Loading...</h4>
  );
}

export default Navbar;
