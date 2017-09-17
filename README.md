# P5 Resonance Discord Bot
A tiny bot for discord chat, still under progress.


## Installation
prerequisites: Node.js >= 7.0.0
1. follow the examples in config.json.example and create a `config.json` file
2. run these commands in CLI
```bash
npm install
nodemon --harmony bot.js
```
## Deployment
prerequisites: heroku CLI installed
1. comment out `# config.json` in `.gitignore`
2. run these commands in CLI
```bash
heroku create your-app-name
git add .
git commit -m "deploy to heroku"
git push heroku master
```
3. go to Heroku Dashboard and navigate  ***Personal apps > your-app-name > Resources***
4. disable dyno `web` and enable dyno `bot`
5. invite your bot to your server if haven't. Change the client-id and go to this link
```
https://discordapp.com/oauth2/authorize?&client_id=<your-client-id>&scope=bot&permissions=0
```
6. Test your app and check logs
```
heroku ps
heroku logs -t
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