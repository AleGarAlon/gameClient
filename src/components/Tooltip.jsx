import { useState, useRef, useEffect } from "react";
import "./tooltip.css";

function Tooltip({
  item,
  handleButton,
  buttomText,
  className,
  handleButtonX5,
  buttonTextX5,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={tooltipRef}>
      <img
        className={className}
        src={item.image}
        alt={item.name}
        onClick={toggleTooltip}
      />

      <div className={`tooltip ${isVisible ? "active" : ""}`}>
        <h4>{item.name}</h4>
        {item.damage && item.damage !== 0 ? (
          <p>Damage : {item.damage}</p>
        ) : (
          <p></p>
        )}

        {item.attributes ? (
          <ul>
            {Object.entries(item.attributes).map(
              ([attribute, value]) =>
                value !== 0 && (
                  <li key={attribute}>
                    {attribute}: {value}
                  </li>
                )
            )}
          </ul>
        ) : (
          <p></p>
        )}

        {item.power ? (
          <ul>
            {Object.entries(item.power).map(
              ([power, value]) =>
                value !== 0 && <li key={power}>Power: {value}</li>
            )}
          </ul>
        ) : (
          <p></p>
        )}

        {item.effect && item.effect === "heal" ? (
          <p>Recover {item.amount} points of health</p>
        ) : item.effect ? (
          <p>
            Increase {item.effect} by +{item.amount}
          </p>
        ) : (
          <></>
        )}
        <p>Price: {item.price}</p>
        <button onClick={() => handleButton(item._id)}>{buttomText}</button>
        {handleButtonX5 && buttonTextX5 && (
          <button onClick={() => handleButtonX5(item._id)}>
            {buttonTextX5}
          </button>
        )}
      </div>
    </div>
  );
}

export default Tooltip;
