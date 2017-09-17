# P5 Resonance Discord Bot
A tiny bot for discord chat, still under progress.


## Installation
1. create a `config.json` file
2. run these commands in CLI
```bash
npm install
npm start
```


## Commands List and Usage

| Command | Description |
| --- | --- |
| about | describe the bot information |
| help | show list of available commands |
| say | repeat the message said to the bot |
| roll | rolling dices with modifiers |
| shuffle | rearrange the order |

***roll*** example
```bash
roll 5d6 + 3d4 - 16
# output: rolled  11, (( 2 + 2 + 5 + 4 + 6 ) + ( 4 + 1 + 3 ) - 16 = 11)
```

***shuffle*** example
```bash
shuffle MakotoNijima Morgana AnnTakamaki HaruOkumura YusukeKitagawa RyujiSakamoto

# output:
# New shuffle:
# 1. RyujiSakamoto
# 2. HaruOkumura
# 3. YusukeKitagawa
# 4. AnnTakamaki
# 5. MakotoNijima
# 6. Morgana
```