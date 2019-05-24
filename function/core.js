const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

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

  client.loadAllCommands = async commandDirectory => {
    const commandFiles = await readdir(commandDirectory);

    const results = {
      loaded: [],
      error: [],
    };

    commandFiles.forEach(commandFile => {
      if (!commandFile.endsWith('.js')) return;
      const response = client.loadCommand(commandFile);
      // If an error is reported add it to the error list, otherwise loaded.
      response ? results.error.push(response) : results.loaded.push(commandFile.split('.')[0]);
    });
    return results;
  };

  client.loadAllEvents = async eventsDirectory => {
    const eventFiles = await readdir(eventsDirectory);

    const results = {
      loaded: [],
      error: [],
    };

    eventFiles.forEach(eventFile => {
      if (!eventFile.endsWith('.js')) return;
      const response = client.loadEvent(eventFile);
      // If an error is reported add it to the error list, otherwise loaded.
      response ? results.error.push(response) : results.loaded.push(eventFile.split('.')[0]);
    });
    return results;
  };
};
