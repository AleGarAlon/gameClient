import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/Auth.context" 
import { useContext, useEffect , useState} from "react"
import { API_URL } from "../config/config.index"
import "./armory.css"

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
        <div className="armoryItems">
        {items.map(item => (
                <img className="armoryItemImg" key={item._id} src={item.image} alt={item.name} />
        ))}
        </div>

        <h4 >Inventory</h4>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
        user.character.inventory.map((item, index) => (
        <div key={index}>
          {/* <p className="inventoryItemName">{item.name}</p> */}
          <img className="inventoryItemImg" src={item.image} alt={item.name} />
        </div>
        ))
        ) : (
          <p>No items in inventory</p>
        )}
      </div>
        <Link to= "/character">Return</Link>
    </>
  ) : <h4>Loading...</h4>
}

export default Armory