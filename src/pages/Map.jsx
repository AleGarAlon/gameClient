
import { Link } from 'react-router-dom'

function Map() {
  return (
    <>
    <h1>Map</h1>

    <ul className="explore"> Explore
            <Link to="/explore/forest"><li>Forest</li></Link>
            <Link to="/explore/cave"><li>Cave</li></Link>
            <Link to="/explore/ruins"><li>Castle ruins</li></Link>
            <Link to="/explore/dungeons"><li>Dungeons</li></Link>
            <Link to="/explore/crypt"><li>Crypt</li></Link>
            <Link to="/explore/mausoleum"><li>Mausoleum</li></Link>
            <Link to="/explore/chambers"><li>The Chambers</li></Link>
        </ul>
    </>
  )
}

export default Map