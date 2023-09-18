import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/config.index';

function CreateEnemy() {
  const [enemyData, setEnemyData] = useState({
    name: '',
    image: 'https://res.cloudinary.com/dvml0gelc/image/upload/v1691593037/Zen_z7ulvc.png',
    gold: 0,
    inventory: [],
    consumables: [],
    attributes: {
      strength: 0,
      dexterity: 0,
      agility: 0,
      constitution: 0,
      fate: 0,
      armor: 0,
    },
    damage: 0,
    health: 0,
    location: "",
    locationNumber: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(enemyData)
    try {
      
      await axios.post(`${API_URL}/create/enemy`, enemyData);

      
      setEnemyData({
        name: '',
        image: '',
        gold: 0,
        inventory: [],
        consumables: [],
        attributes: {
          strength: 10,
          dexterity: 10,
          agility: 10,
          constitution: 10,
          fate: 10,
          armor: 0,
        },
        damage: 0,
        health: 0,
        location: "",
        locationNumber: 0,
      });
    } catch (error) {
      console.error('Error al crear el enemigo', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnemyData({
      ...enemyData,
      [name]: value,
    });
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
  
    setEnemyData({
      ...enemyData,
      attributes: {
        ...enemyData.attributes,
        [name]: value
      },
    });
  };

  return (
    <>
      <div>Enemy creator</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={enemyData.name} onChange={handleInputChange} />
        </label>
        <label>
          Image:
          <input type="text" name="image" value={enemyData.image} onChange={handleInputChange} />
        </label>
        <label>
          Gold:
          <input type="number" name="gold" value={enemyData.gold} onChange={handleInputChange} />
        </label>
        <label>
          Inventory:
          <input type="text" name="inventory" value={enemyData.inventory} onChange={handleInputChange} />
        </label>
        <label>
          Consumables:
          <input type="text" name="consumables" value={enemyData.consumables} onChange={handleInputChange} />
        </label>
        <label>
          Strength:
          <input
            type="number"
            name="strength"
            value={enemyData.attributes.strength}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Dexterity:
          <input
            type="number"
            name="dexterity"
            value={enemyData.attributes.dexterity}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Agility:
          <input
            type="number"
            name="agility"
            value={enemyData.attributes.agility}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Constitution:
          <input
            type="number"
            name="constitution"
            value={enemyData.attributes.constitution}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Fate:
          <input
            type="number"
            name="fate"
            value={enemyData.attributes.fate}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Armor:
          <input
            type="number"
            name="armor"
            value={enemyData.attributes.armor}
            onChange={handleAttributeChange}
          />
        </label>
        <label>
          Damage:
          <input
            type="number"
            name="damage"
            value={enemyData.damage}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Health:
          <input
            type="number"
            name="health"
            value={enemyData.health}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={enemyData.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location Number:
          <input
            type="number"
            name="locationNumber"
            value={enemyData.locationNumber}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Enemy</button>
      </form>
    </>
  );
}

export default CreateEnemy;
