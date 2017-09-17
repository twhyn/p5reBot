const Command = require("../util/Command");
const Discord = require('discord.js');
const config = require("../config.json");

module.exports = class About extends Command{
  constructor(client){
    super(client, {
      name: "about",
      help: "who am I???",
      category: "general",
      elevation: 0
    });
  };

  async execute(message, args){
    let greetings = [
      `Hi, nice to meet you!!`,
      `please type **\`\nhelp\`** to show list of available commands`,
      `for any issue/suggestions, feel free to PM my creator`
    ];
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription(greetings)
      .setFooter('©2017 lazyshibe#8427 | v0.0.0');

    return message.reply({embed});
  };
};