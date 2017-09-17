module.exports = class Command{
  constructor(client, meta){
    if (!client)    { throw new Error("Cannot construct a Command without client instance.")};
    if (!meta)      { throw new Error("Cannot construct a Command without metadata.")};
    if (!meta.name) { throw new Error("Cannot construct a Command without a name.")};

    this.client = client;
    this.name = meta.name;
    this.category = meta.category;
    this.help = meta.help;
    this.permLevel = meta.permLevel || 0;
    this.helpArgs = meta.helpArgs;
    this.examples = meta.examples || '';
    this.guildChannelOnly = meta.guildChannelOnly || false;
  };

  /**
   * @abstract
   */
  async execute(message, args){
    throw new Error(`Abstract method 'execute' not implemented in command ${this.meta.name}`);
  };
};