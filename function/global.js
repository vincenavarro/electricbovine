module.exports = client => {
  client.commands = {};
  client.aliases = {};

  client.loadCommand = commandFile => {
    try {
      const newCommand = require(`../command/${commandFile}`);

      // If the command needs to be initialized do so.
      if (newCommand.init) newCommand.init(client);

      // Add command help to the help menu.
      client.commands[newCommand.help.name] = newCommand;
      newCommand.conf.aliases.forEach(alias => (client.aliases[alias] = newCommand.help.name));
      return false;
    } catch (error) {
      return ` ${commandFile}: ${error}`;
    }
  };

  client.loadEvent = eventFile => {
    try {
      const newEvent = eventFile.split('.')[0];
      const event = require(`../event/${eventFile}`);
      // Bind the client to any event before existing arguments from discord.js.
      client.on(newEvent, event.bind(null, client));
    } catch (error) {
      return ` ${commandName}: ${error}`;
    }
  };
};
