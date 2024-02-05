import { Link } from "react-router-dom";
import "./map.css";
function Map() {
  return (
    <>
      <div className="explore">
        <h1 className="mapTitle">Map</h1>
        <Link className="zoneLinks" to="/explore/woods">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259179/game/map%20icons/prickly_root_t_wsnbhy.png"
            alt="Wicked woods"
          />
          <p className="zoneTitle">Wicked woods</p>
        </Link>
        <Link className="zoneLinks" to="/explore/grove">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259185/game/map%20icons/BlueLootBox_25_t_ywzd6l.png"
            alt="Corrupted grove"
          />
          <p className="zoneTitle">Corrupted grove</p>
        </Link>
        <Link className="zoneLinks" to="/explore/spider">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259997/game/map%20icons/outgrowth_01_t_ybckqt.png"
            alt="Spider caves"
          />
          <p className="zoneTitle">Spider caves</p>
        </Link>
        <Link className="zoneLinks" to="/explore/mine">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259230/game/map%20icons/artifact_14_t_xybinr.png"
            alt="Dwarven mine"
          />
          <p className="zoneTitle">Dwarven mine</p>
        </Link>
        <Link className="zoneLinks" to="/explore/cove">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259317/game/map%20icons/shell_t_01_vbmndo.png"
            alt="The cove"
          />
          <p className="zoneTitle">The cove</p>
        </Link>
        <Link className="zoneLinks" to="/explore/temple">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700259310/game/map%20icons/runestone_t_06_demjpo.png"
            alt="Sunken temple"
          />
          <p className="zoneTitle">Sunken temple</p>
        </Link>
        <Link className="zoneLinks" to="/explore/citadel">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700260459/game/map%20icons/broken_sword_t_01_uknjau.png"
            alt="Desolated citadel"
          />
          <p className="zoneTitle">Desolated citadel</p>
        </Link>
        <Link className="zoneLinks" to="/explore/catacombs">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1702335287/game/map%20icons/artifact_09_t_kt0niq.png"
            alt="Catacombs"
          />
          <p className="zoneTitle">Catacombs</p>
        </Link>
        <Link className="zoneLinks" to="/explore/shrine">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700260457/game/map%20icons/artifact_11_t_mfql2i.png"
            alt="Forbiden shrine"
          />
          <p className="zoneTitle">Forbiden shrine</p>
        </Link>
        <Link className="zoneLinks" to="/explore/rift">
          <img
            className="exploreImg"
            src="https://res.cloudinary.com/dvml0gelc/image/upload/v1700261102/game/map%20icons/orb_02_t_jttxhs.png"
            alt="Demonic rift"
          />
          <p className="zoneTitle">Demonic rift</p>
        </Link>
      </div>
      <Link className="characterButton" to="/character">
        Return
      </Link>
    </>
  );
}

export default Map;
