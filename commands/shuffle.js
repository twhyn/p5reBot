const Command = require("../util/Command");
const shuffle = require("shuffle-array");

module.exports = class Shuffle extends Command{
  constructor(client){
    super(client, {
      name: "shuffle",
      help: "rearrange order",
      helpArgs: "<arg1> <arg2> [*args]",
      category: "RNG",
      examples: "shuffle MakotoNijima Morgana AnnTakamaki HaruOkumura YusukeKitagawa RyujiSakamoto"
    });
  };

  async execute(message, args){
    // filter invalid inputs
    if(args.length === 1){
      return message.reply(`i see one argument only, please put space in between`);
    }
    if(args.length > 1000){
      return message.reply(`too many arguments`);
    }

    // console.log(`args: ${args}`);

    let shuffleTemp = shuffle(args);
    let shuffleResult = [];

    // shuffle details
    for (let i = 0; i < args.length; i++) {
      shuffleResult.push(`\n${i+1}. `);
      shuffleResult.push(shuffleTemp[i]);
    }

    // console.log(shuffleTemp);
    // console.log(shuffleResult);

    shuffleResult = shuffleResult.join("");

    return message.reply(`New shuffle: ${shuffleResult}`);
  };
}