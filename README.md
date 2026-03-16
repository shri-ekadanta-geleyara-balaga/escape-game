# Escape Game

**Escape Game** is a simple browser-based game where the player must avoid threats and survive as long as possible. The game uses images for the player and threats and plays background, victory, and defeat music.

---

## Files

- `index.html` – Main HTML file containing the game structure.
- `style.css` – CSS file for styling the game area, player, and threats.
- `script.js` – JavaScript file handling movement, collisions, score, and music.
- `images/` – Folder containing:
  - `player.jpg` – Player character image
  - `threat1.jpg` – Threat 1 image
  - `threat2.jpg` – Threat 2 image
- `sounds/` – Folder containing:
  - `bgmusic.mp3` – Background music
  - `defeat.mp3` – Music played on defeat
  - `victory.mp3` – Music played on victory

---

## How to Play

1. Open `index.html` in your browser.
2. Move the player using **Arrow Keys**.
3. Avoid threats (red enemies).
4. Survive as long as possible.
5. If a threat touches the player, defeat music plays and the game ends.
6. If you survive until the timer/score goal, victory music plays.

---

## Features

- Player movement with keyboard
- Multiple threats with images
- Collision detection
- Score display
- Background, victory, and defeat music

---

## Setup Instructions

1. Clone or download the repository:

```bash
git clone https://github.com/yourusername/escape-game.git
