// Load main discord library and other core components.
const Discord = require('discord.js');

// Setup the base client, logger, and configuration.
// See README.md for config.json formatting information.
const client = new Discord.Client();
client.logger = require('./function/log');
client.config = require('./config.json');

// Add global functions like crash handling, event loading, etc.
require('./function/core.js')(client);

const startBot = async () => {
  client.logger.log(`Electric Bovine starting.`);

  client.loadAllCommands('./command/').then(results => {
    client.logger.log(`${results.loaded.length} commands loaded: ${results.loaded.join(', ')}`);
    if (results.error.length > 0) client.logger.error(`Error loading command(s): ${results.error.join(', ')}`);
  });

  client.loadAllEvents('./event/').then(results => {
    client.logger.log(`${results.loaded.length} events loaded: ${results.loaded.join(', ')}`);
    if (results.error.length > 0) client.logger.error(`Error loading event(s): ${results.error.join(', ')}`);
  });

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
    if (client.config.twitch.enabled) {
      require('./function/twitch.js')(client);
      client.twitchCheck(client.config.twitch.token, client.config.twitch.channels);
    }
  });
};

startBot();
