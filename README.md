## Links

-Deploy version: https://glittering-croissant-459f10.netlify.app/

-Server repository: https://github.com/AleGarAlon/gameServer

-Client repository: https://github.com/AleGarAlon/gameClient

-Figma sketch: https://www.figma.com/file/DOhlEevelCKWfEdLTrqKNh/Game-Proyect?type=design&node-id=0-1&mode=design&t=QnbtIM7AclIDjayB-0

## Description

-"In this project, I'm creating a nostalgic browser-based RPG reminiscent of the games I enjoyed in my teens. In the game, players control a character and explore various locations on a map. These locations are populated by different types of enemies, and players can engage in battles to earn rewards.

-Character development is a key feature of the game, with players gaining equipment and leveling up. They can allocate points to upgrade their character's attributes, making them stronger and more capable in combat.

-Exploration is an essential aspect, with each location offering unique challenges and opportunities. Players may encounter NPCs, complete quests, or discover hidden treasures as they traverse the map.

-A robust in-game economy allows players to earn money through battles and other activities. This currency can be spent on equipment, consumables, or traded with other players\*. The game features a competitive ranking system where players can engage in PvP battles to climb the leaderboards, earning recognition and rewards for their achievements.

-The game aims to capture a retro aesthetic and will be accessible through web browsers, ensuring that players can relive the browser game experience of the past."

## Core mechanics

### Character

-The character is created at the same moment the account is created. Every character starts with a random character picture and the same attributes. The attributes are as follows:

·Strength: Improves raw damage.

·Agility: Raises the chance to hit your enemy.

·Dexterity: Increases the chance to evade an incoming attack.

·Constitution: Increase the armor value.

•Armor: Decreases the damage received when an attack lands on you.

·Fate: Raises the probability of performing a piercing strike (ignores enemy constitution). Fate also increases the chance of obtaining loot from defeated enemies.(Not implemented yet)

-In addition, the character can equip different pieces of equipment to increase their power (the character's power is the sum of all their stats + gear). The character can equip the following:
·Helmet
·Chestplate
·Gloves
·Pants
·Boots
·Weapon
·Shield
·Trinket (Not implemented yet)

## Combat

-The combat involves a comparison of the stats of the two combatants. Initially, the order of turns will be assigned randomly. The first attacker will be known as the "Attacker," and the second will be the "Defender."

-First, the Attacker's Agility is compared to the Defender's Dexterity in a calculattion that adds randomnes to the calculation in order to give the chance to win even if you are an underdog

-When the Attacker's hit lands,the damage from a normal hit is calculated based on the Attacker's weapon damage, their Strength, and subtracting the Defender's Constitution.


## Pages

### Character page

-On this page, you can view the character's stats, gear, and inventory

### Map page

-On this pague all the locations aviable to explore are shown in the game map.

### Exploration page

-Here, you can see the results of the exploration combat, including your enemy's image, stats, and a log of all the rounds of the combat.

### Armory page

-Here you can sell and buy armor pieces and weapons

### Shop page

Here you can sell and buy consumables

### Circle (Not implemented yet)

-On this page, you can see the 9 characters ranked above you in the circle and challenge them to a duel.

### Duel (Not implemented yet)

-Here, you can view the results of the duel, which include your opponent's image, stats, and a log of all the combat rounds.

## Features

-You can explore different locations with four different monsters in each location, 2 normal 1 chammpion 1 boss. Each zone has an full armor set, 2 weapons and a boss weapon.
-You can level up your stats by paying with gold.
-You can buy and sell equipment in the Armory.
-You can buy and sell consumables in the Shop.

## Future features


-Health regeneration sistem (Heal regeneration in time to prevent the game over if you have no food and no money)
-Exploration points(The goal is to slow the pace of the game, making it slower to advance, you will have exploration point that will be recharge gradually, and you can spend those to explore a fight)
-Power system (Your gear will give you an amount on power, the sum of all will be the character power. power will be use as a level to allow you buy/see specific items in the shop, go into higer lvl zones, determine who can you duel in the circle...) 
-You can challenge other players to a duel.
-A trade post to sell your gear to other players.
-Dungeons (consecutive combats in a row, the farther you reach, the better the loot).
-More locations.
-More gear.
-Donation screen (If someone enjoy the game and feel generous)
-Player-to-player chat.
-A way to enchant equipment.
-Reagents and crafting potions.
-Legacy Zone (Unlockable zones attained after meeting specific in-game achievements or milestones, providing players with new challenges and exclusive rewards).

## Technmologies used

-React for the client
-Node.js + Express for the server
-MongoDB
