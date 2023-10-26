import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/Auth.context" 
import { useContext, useEffect , useState} from "react"
import { API_URL } from "../config/config.index"

function Armory() {
    const {user} = useContext(AuthContext)
    const [items, setItems] = useState([])

    const getItems = async () => {
        try {
            setItems([])
            const res = await axios.get(`${API_URL}/armory`)
            if(res.status === 200){
                const data = res.data
                console.log("Your random items array",data)
                setItems(data)
            }
        } catch (error) {
            console.log(error)
        }

    } 

    useEffect(()=> {
        getItems()
    },[])
  return user.character && items ? (
    <>
    <div>Armory</div>

        {items.map(item => (
                <img key={item._id} src={item.image} alt={item.name} />
        ))}

        <Link to= "/character">Return</Link>
    </>
  ) : <h4>Loading...</h4>
}

export default Armory