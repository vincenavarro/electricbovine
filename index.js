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
require('./function/twitch.js')(client);

const startBot = async () => {
  client.logger.log(`Electric Bovine starting.`);

  // Commands...
  const commandFiles = await readdir('./command/');
  let commandsLoaded = '', commandsError = '';
  commandFiles.forEach(commandFile => {
    if (!commandFile.endsWith('.js')) return;
    const response = client.loadCommand(commandFile);
    // If an error is reported add it to the error list, otherwise loaded.
    response ? commandsError += ` ${response}` : commandsLoaded += ` ${commandFile}`;
  });
  client.logger.log(`${commandFiles.length} commands loaded:${commandsLoaded}`);
  if (commandsError !== '') client.logger.error(`Error loading:${commandsError}`);

  // Events...
  const eventFiles = await readdir('./event/');
  let eventsLoaded = '', eventsError = '';
  eventFiles.forEach(eventFile => {
    if (!eventFile.endsWith('.js')) return;
    const response = client.loadEvent(eventFile);
    response ? eventsError += ` ${response}` : eventsLoaded += ` ${eventFile}`;
  });
  client.logger.log(`${eventFiles.length} events loaded:${eventsLoaded}`);
  if (eventsError !== '') client.logger.error(`Error loading:${eventsError}`);

  // Make it so...
  client.login(client.config.discordToken).then(() => {

    // Set bot status.
      // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`Milk`);
  client.user.setStatus('online');
  client.user.setPresence({
    game: {
      name: 'Milk',
      type: 'STREAMING', // PLAYING, STREAMING, LISTENING, WATCHING
      url: 'https://twitch.tv/overwatchleague',
    },
    status: 'idle',
  });

  // Start TwitchCHeck
    if (client.config.twitch.enabled) client.twitchCheck(client.config.twitch.token, client.config.twitch.channels);
  });
};

startBot();
