/**
 * MODULE DEPENDENCIES
 */
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const dir = "./commands/";

/**
 * EVENTS
 */
client.commands = new Map();

client.once("ready", () => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(0);
    } else {
      files.forEach(file => {
        let inst = require(`./commands/${/(.*)\.js/.exec(file)[1]}`);
        let cmd = new inst(client);
        console.log(`Loaded command ${cmd.name}`);
        client.commands.set(cmd.name, cmd);
      })
    };
  });

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("disconnect", () => {
  console.log("disconnected");
  process.exit(0);
});

client.on("error", e => console.error(e));

client.on("guildCreate", guild => {});
client.on("guildDelete", guild => {});

client.on("message", async message => {
  if (message.author.bot) return;

  let prefix;
  if (message.guild){
    // prefix = await client.fetchPrefix(message.guild.id);
    prefix = config.PREFIX; //test for now
  } else {
    prefix = "";
  }

  let offset;
  if (message.content.startsWith(prefix)) {
    offset = prefix.length;
  } else if (message.content.startsWith(client.user.toString())) {
    offset = client.user.toString().length + 1;
  } else {
    return;
  }

  let commandString = message.content.substring(offset).split(" ")[0].toLowerCase();
  let command = client.commands.get(commandString);
  if (!command) return;
  try {
    let args = message.content.substring(offset + commandString.length).trim();
    if (args) { args = args.split(" ") };
    if (command) {
      // let hasPerm = await command.checkPermission(message.member || message.author);
      // if(!hasPerm) {
      //   return msg.reply("you don't have permission to execute that command, or this command can only be executed in a Guild channel.");
      // };
      command.execute(message, args);
    };
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }

});

/**
 * UTILITIES
 */
// client.fetchPrefix = async function(id){};


client.login(config.TOKEN);
