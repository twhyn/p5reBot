const Command = require("../util/Command");
const config = require("../config.json");

module.exports = class Help extends Command{
  constructor(client){
    super(client, {
      name: "help",
      help: "show list of commands and their usage",
      category: "general"
    });
  };

  async execute(message, args){
    let categories = new Map();
    let prefix;
    if (!message.guild){
      prefix = "";
    } else {
      // prefix = await client.fetchPrefix(message.guild.id);
      prefix = config.PREFIX; //test for now
    }
    await this.client.commands.forEach(async command => {
      if (command.category && command.help) {
        if (!categories.get(command.category)) {
          categories.set(command.category, {name: command.category, commandsList: []});
        }

        let example = '';
        if (command.examples !== ''){
          example = `\ne.g. ${command.examples}`;
        }

        categories.get(command.category).commandsList.push(`${prefix}${command.name}${command.helpArgs ? " " + command.helpArgs : ""} :: ${command.help} ${example}`);
      };
    });
    console.log(categories);

    let content = [];
    content.push("For all commands, `<>` denotes **required** parameters, while `[]` denotes **optional** parameters.");
    content.push("Please *omit* the `<>` and `[]` characters when executing commands.");

    content.push("```asciidoc");
    categories.forEach(category => {
      content.push(`= ${category.name} =`);
      category.commandsList.forEach(help => {
        content.push(help);
      });
      content.push("");
    });
    // content.splice(-1);
    content.push("```");

    return message.channel.send(content);
  };
};