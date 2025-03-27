# Last Path

## Links  

- **Deploy version**: [Last Path](https://lastpath.netlify.app/)  
- **Server repository**: [GitHub - gameServer](https://github.com/AleGarAlon/gameServer)  
- **Client repository**: [GitHub - gameClient](https://github.com/AleGarAlon/gameClient)  
- **Figma sketch**: [Figma - Game Project](https://www.figma.com/file/DOhlEevelCKWfEdLTrqKNh/Game-Proyect?type=design&node-id=0-1&mode=design&t=QnbtIM7AclIDjayB-0)  

## Description  

In this project, I'm creating a nostalgic browser-based RPG reminiscent of the games I enjoyed in my teens.  

Players control a character and explore various locations on a map. These locations are populated by different types of enemies, and players can engage in battles to earn rewards.  

### **Core features:**  
- **Character development**: Players gain equipment, level up, and allocate attribute points to improve their stats.  
- **Exploration**: Each location offers unique challenges, NPCs, quests, and hidden treasures.  
- **Economy system**: Players earn money through battles and can spend it on equipment and consumables or trade with others.  
- **PvP ranking**: Players can engage in duels to climb the leaderboard and earn rewards.  
- **Retro aesthetic**: The game is designed to recreate the experience of old-school browser RPGs.  

---

## Core Mechanics  

### **Character System**  

Characters are created automatically upon account registration. Every character starts with a random portrait and base stats:  

- **Strength** – Increases raw damage.  
- **Agility** – Improves hit chance.  
- **Dexterity** – Boosts evasion rate.  
- **Constitution** – Enhances armor value.  
- **Armor** – Reduces received damage.  
- **Fate** – Increases the chance of landing a piercing hit (ignoring armor) and enhances loot drop rates. *(Not implemented yet)*  

#### **Equipment slots**:  
- Helmet  
- Chestplate  
- Gloves  
- Pants  
- Boots  
- Weapon  
- Shield  
- Trinket *(Not implemented yet)*  

### **Combat System**  

Combat is turn-based and stat-dependent:  

1. **Turn order** is randomly assigned. The first attacker is the **"Attacker"**, while the second is the **"Defender."**  
2. **Hit chance** is determined by comparing the Attacker's **Agility** to the Defender's **Dexterity**. A randomness factor ensures underdogs have a chance to win.  
3. **Damage calculation** considers the Attacker's **Strength** and weapon damage while reducing damage based on the Defender’s **Constitution**.  

---

## Pages  

### **Character Page**  
Displays character stats, gear, and inventory.  

### **Map Page**  
Shows available locations for exploration.  

### **Exploration Page**  
Shows the combat log, including enemy stats and battle rounds.  

### **Armory Page**  
Allows players to buy and sell weapons and armor.  

### **Shop Page**  
Enables the purchase and sale of consumables.  

### **Circle *(Not implemented yet)***  
Displays the 9 ranked players above you, allowing for PvP challenges.  

### **Duel *(Not implemented yet)***  
Shows the results of player duels, including combat logs.  

---

## Features  

- **Exploration**: Each location contains four different monsters:  
  - 2 normal enemies  
  - 1 champion  
  - 1 boss  
- **Loot system**: Each zone has a **full armor set, two weapons, and a boss weapon**.  
- **Leveling system**: Players can spend gold to improve stats.  
- **Economy**:  
  - Buy and sell **gear** in the **Armory**.  
  - Buy and sell **consumables** in the **Shop**.  

---

## Future Features  

- **Health regeneration system** – Passive healing over time to prevent players from being stuck if they have no food or money.  
- **Exploration points** – Limits exploration with a gradually recharging stamina system.  
- **Power system** – Gear contributes to a **Power Score**, determining access to high-level zones, PvP matchmaking, and special items.  
- **Player duels** – Challenge other players in ranked battles.  
- **Trading system** – Sell gear to other players via a marketplace.  
- **Dungeons** – Consecutive battles that offer better loot the further you progress.  
- **More locations and gear**.  
- **Donation screen** – Allows players to support development.  
- **Player-to-player chat**.  
- **Equipment enchantments** – Enhance gear with magical properties.  
- **Crafting system** – Create potions using reagents.  
- **Legacy Zones** – Unlockable areas with exclusive rewards based on player achievements.  

---

## Technologies Used  

- **Frontend**: React.js  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB  
