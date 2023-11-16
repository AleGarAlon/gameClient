import { Link } from "react-router-dom";

function Map() {
  return (
    <>
      <h1>Map</h1>

      <ul className="explore">
        {" "}
        Explore
        <Link to="/explore/woods">
          <li>Wicked woods</li>
        </Link>
        <Link to="/explore/grove">
          <li>Corrupted grove</li>
        </Link>
        <Link to="/explore/spider">
          <li>Spider caves</li>
        </Link>
        <Link to="/explore/mine">
          <li>Dwarven mine</li>
        </Link>
        <Link to="/explore/cove">
          <li>The cove</li>
        </Link>
        <Link to="/explore/temple">
          <li>Sunken temple</li>
        </Link>
        <Link to="/explore/citadel">
          <li>Desolated citadel</li>
        </Link>
        <Link to="/explore/catacombs">
          <li>Catacombs</li>
        </Link>
        <Link to="/explore/shrine">
          <li>Forbiden shrine</li>
        </Link>
        <Link to="/explore/rift">
          <li>Demonic rift</li>
        </Link>
      </ul>
      <Link className="characterButton" to="/character">
        Return
      </Link>
    </>
  );
}

export default Map;
