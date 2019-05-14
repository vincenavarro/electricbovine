module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`Moo. ${client.users.size} users. ${client.channels.size} channels. ${client.guilds.size} servers. Send complaints to ${client.config.ownerID}`, 'ready');

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
};
