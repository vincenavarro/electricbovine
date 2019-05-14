// Load main discord library.
const Discord = require('discord.js');

// Load other useful components.
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

// Setup the base client, logger, and configuration.
const client = new Discord.Client();
client.logger = require('./function/log');
client.config = require('./config.json');
// See README.md for log formatting information.

// Add global functions like crash handling, logging, etc.
require('./function/global.js')(client);

const startBot = async () => {
  client.logger.log(`Loading bot components.`);

  // Commands...
  const commandFiles = await readdir('./command/');
  client.logger.log(`${commandFiles.length} commands found.`);
  commandFiles.forEach(commandFile => {
    if (!commandFile.endsWith('.js')) return;
    const response = client.loadCommand(commandFile);
    if (response) console.log(response);
  });

  // Events...
  const eventFiles = await readdir('./event/');
  client.logger.log(`${eventFiles.length} events found.`);
  eventFiles.forEach(eventFile => {
    if (!eventFile.endsWith('.js')) return;
    const response = client.loadEvent(eventFile);
    if (response) console.log(response);
  });

  // Make it so...
  client.login(client.config.discordToken);
};

startBot();
