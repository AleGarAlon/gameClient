import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/Auth.context" 
import { useContext, useEffect , useState} from "react"

function Armory() {
  return (
    <>
    <div>Armory</div>
        <Link to= "/character">Return</Link>
    </>
  )
}

export default Armory