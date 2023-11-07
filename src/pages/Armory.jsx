import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/Auth.context" 
import { useContext, useEffect , useState} from "react"
import { API_URL } from "../config/config.index"
import "./armory.css"

function Armory() {
    const {user, setUser} = useContext(AuthContext)
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

    const handleBuy = async (itemId) => {
      const res = await axios.get(`${API_URL}/armory/buy?characterId=${user.character._id}&itemId=${itemId}`)
      const data = res.data
      setUser({...user, character: data})
    }
    
    const handleSell = async (itemId) => {
      const res = await axios.get(`${API_URL}/armory/sell?characterId=${user.character._id}&itemId=${itemId}`)
      const data = res.data
      setUser({...user, character: data})
    }

    useEffect(()=> {
        getItems()
    },[])
  return user.character && items ? (
    <>
    <div>Armory</div>
        <div className="armoryItems">
        {items.map(item => (
                <img className="armoryItemImg" key={item._id} src={item.image} alt={item.name} onClick={() => handleBuy(item._id)} />
        ))}
        </div>

        <h4 >Inventory</h4>
      <div className="characterInventory">
        {user.character.inventory && user.character.inventory.length > 0 ? (
        user.character.inventory.map((item) => (
        <div key={crypto.randomUUID()}>
          {/* <p className="inventoryItemName">{item.name}</p> */}
          <img className="inventoryItemImg" src={item.image} alt={item.name} onClick={() => handleSell(item._id)}/>
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