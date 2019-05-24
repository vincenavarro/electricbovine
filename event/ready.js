module.exports = async client => {
  // Log that the bot is online.
  client.fetchUser(client.config.ownerID)
  .then( result =>
    client.logger.ready(`Electric Bovine online. ${client.users.size} users. ${client.channels.size} channels. ${client.guilds.size} servers. Send complaints to ${result.username}#${result.discriminator}.`)
  );
};
