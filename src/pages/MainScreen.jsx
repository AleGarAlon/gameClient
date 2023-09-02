
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";


function MainScreen() {
const {user} = useContext(AuthContext)
const character = user.character
console.log("your current charater is" , user.character)
    return (
        <>
        <h1>{character.name}</h1>

        <ul className="explote"> Explore
            <Link to="/explore/forest"><li>Forest</li></Link>
            <Link to="/explore/cave"><li>Cave</li></Link>
            <Link to="/explore/ruins"><li>Ruins</li></Link>
            <Link to="/explore/crypt"><li>Crypt</li></Link>
        </ul>

        


        </>
    )
}
export default MainScreen;