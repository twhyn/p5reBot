const Command = require("../util/Command");
const DiceEvaluator = require("roll");

module.exports = class Roll extends Command{
  constructor(client){
    super(client, {
      name: "roll",
      help: "dice roller",
      helpArgs: "[dice number]d<dice side> <math operators> [modifier]",
      category: "RNG",
      examples: "roll 5d6 + 3d4 - 16"
    });
  };

  async execute(message, args){
    const anyNum = /(\d+)/g;
    const diceNum = /(\d+)(?=d)/g;
    const invalidInput = /[^-d+/*%\d+]/g;
    const nonModifier = /(d|[-+/*%])/g;
    const operators = /([-+*/%])/g;
    const limitNum = 1000;
    const showWhenLessThanNum = 100;

    let diceNumArray = [];
    let diceNumIndex = [];
    let modArray = [];
    let modIndex = [];

    if(args.length === 0){ return message.reply(`please put the dice and modifier`)};

    const input = args.join("");

    // filter invalid inputs then separate dice and modifier to separate arrays
    for (let i = 0; i < args.length; i++) {
      if (args[i].match(invalidInput)){
        return message.reply(`invalid input`);
      }
      if (!args[0].match(/d/)){
        return message.reply(`do not put modifier or math operators first`);
      }
      if (args[i].match(operators) && args[i].match(anyNum)){
        return message.reply(`please put space in between`);
      }
      if (parseInt(args[i].match(anyNum)) > limitNum){
        return message.reply(`STAHP please try with number below ${limitNum}`);
      }

      if (parseInt(args[i].match(diceNum))) {
        diceNumIndex.push(i);
        diceNumArray.push(parseInt(args[i].match(diceNum)));
      }

      if (!args[i].match(nonModifier)) {
        modIndex.push(i);
        modArray.push(args[i]);
      }
    };

    if((diceNumArray.reduce((x,y) => x + y, 0)) > limitNum){
      return message.reply(`why r u trying to roll more than ${limitNum} dices STHAP`);
    }

    // console.log(`args: ${args}`);
    // console.log(`input: ${input}`);
    // console.log(`diceNumIndex: [${diceNumIndex}]. diceNumArray: [${diceNumArray}]`);
    // console.log(`modIndex: [${modIndex}]. modArray: [${modArray}]`);

    try{
      const dice = new DiceEvaluator();
      const rollResult = dice.roll(input);
      let rollTemp = rollResult.rolled;
      let rollDetails = [];

      // console.log(rollTemp);

      // if rollTemp output only have one array
      if(!Array.isArray(rollTemp[0])){
        let temp = [];
        temp.push(rollTemp);
        rollTemp = temp;
      }

      // show the roll details
      for(let i = 0; i < rollTemp.length; i++){
        rollDetails.push("(");
        for(let j = 0; j < rollTemp[i].length; j++){
          rollDetails.push(rollTemp[i][j]);
          if(j !== rollTemp[i].length - 1){
            rollDetails.push("+");
          }
        }
        rollDetails.push(")");

        rollTemp[i] = rollDetails;
        rollDetails = [];
      };

      for(let i = 0; i < args.length; i++){
        if(args[i].match(/(d)/g)){
          rollDetails.push(rollTemp[i]);
        } else {
          rollTemp.splice(i,0,0);
          rollDetails.push(args[i]);
        }
      };

      rollDetails = [].concat.apply([], rollDetails).join(' ');

      // console.log("roll details:");
      // console.log(rollDetails);

      if((diceNumArray.reduce((x,y) => x + y, 0)) <= showWhenLessThanNum){
        // console.log((diceNumArray.reduce((x,y) => x + y, 0)));
        return message.reply(`rolled  **${rollResult.result}**, (${rollDetails} = ${rollResult.result})`);
      } else {
        return message.reply(`rolled  **${rollResult.result}**`);
      };

    } catch(err){
      return message.reply(`smth wrong`);
      console.error(`ERROR on [ROLL] command: ${err}`);
    };
  };
};