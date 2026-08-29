# PvP 2D Shooter Game 🎮

A fast-paced top-down multiplayer shooter game built with Phaser 3 and JavaScript.

## Features

✨ **Gameplay**
- Player vs Player (PvP) mode
- Top-down action shooter mechanics
- Real-time multiplayer gameplay
- Smooth movement and shooting

🎯 **Progression System**
- 5 Rank Tiers: Rookie → Soldier → Captain → Major → Commander
- Each rank increases weapon damage and fire rate
- Score-based ranking progression

🔫 **Weapons & Upgrades**
- Dynamic weapon system with adjustable fire rates
- Weapon upgrades for improved performance
- Increasing damage per rank tier
- Projectile-based shooting mechanics

🏗️ **Level Design**
- Multiple obstacle types: boxes and houses
- Strategic map layout with cover
- Dynamic environmental interactions

🎮 **Controls**

**Player 1:**
- Movement: WASD
- Aim: Mouse pointer
- Shoot: Mouse click

**Player 2:**
- Movement: Arrow Keys
- Aim: Mouse pointer
- Shoot: Mouse click

## Game Mechanics

### Health System
- Each player starts with 100 HP
- Taking damage reduces health
- First to 0 HP loses

### Rank System
- 5 Ranks with unique titles and colors
- Rank 1 (Rookie): 10 damage, 300ms cooldown
- Rank 5 (Commander): 35 damage, 100ms cooldown
- Gain ranks by accumulating score

### Obstacles
- **Boxes**: Small destructible cover (60x60)
- **Houses**: Large buildings for strategic cover (100x80)
- Projectiles are blocked by obstacles
- Players can hide behind obstacles

## Project Structure

```
pvp-2d-shooter-game/
├── index.html                 # Main HTML file
├── styles.css                 # Game UI styling
├── js/
│   ├── config.js             # Game configuration
│   ├── main.js               # Game initialization
│   ├── scenes/
│   │   ├── bootScene.js      # Asset loading
│   │   ├── menuScene.js      # Menu screen
│   │   └── gameScene.js      # Main gameplay
│   ├── entities/
│   │   ├── player.js         # Player class
│   │   ├── weapon.js         # Weapon system
│   │   ├── projectile.js     # Bullet class
│   │   └── obstacle.js       # Environmental objects
│   └── managers/
│       ├── rankSystem.js     # Rank progression
│       └── weaponUpgrade.js  # Upgrade system
└── README.md
```

## How to Play

1. Open `index.html` in a web browser
2. Click "START GAME" on the menu
3. Use WASD (Player 1) or Arrow Keys (Player 2) to move
4. Move mouse to aim
5. Click to shoot
6. Defeat your opponent!

## Rank Progression

| Rank | Name | Color | Damage | Fire Rate |
|------|------|-------|--------|----------|
| 1 | Rookie | Gray | 10 | 300ms |
| 2 | Soldier | Green | 15 | 250ms |
| 3 | Captain | Blue | 20 | 200ms |
| 4 | Major | Orange | 25 | 150ms |
| 5 | Commander | Red | 35 | 100ms |

## Technologies Used

- **Phaser 3.55** - Game framework
- **JavaScript (ES6)** - Programming language
- **HTML5** - Markup
- **CSS3** - Styling

## Future Enhancements

- [ ] Network multiplayer support
- [ ] More weapon types (laser, rockets, etc.)
- [ ] Power-ups and special abilities
- [ ] Multiple maps
- [ ] Sound effects and music
- [ ] Particle effects
- [ ] Leaderboard system

## Installation

```bash
# Clone the repository
git clone https://github.com/Blackzombie2026/pvp-2d-shooter-game.git

# Navigate to the directory
cd pvp-2d-shooter-game

# Open in browser (no server required for local play)
# Simply open index.html in your web browser
```

## License

MIT License - Feel free to use and modify this game!

## Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

---

Made with ❤️ by Blackzombie2026