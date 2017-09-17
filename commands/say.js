const Command = require("../util/Command");

module.exports = class Say extends Command{
  constructor(client){
    super(client, {
      name: "say",
      help: "repeat what you wrote to Bot",
      helpArgs: "<sentence>",
      category: "test",
      examples: "say something"
    });
  };

  async execute(message, args){
    const sayMessage = args.join(" ");
    return message.reply(sayMessage);
  };
}