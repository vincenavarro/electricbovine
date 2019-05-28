const fetch = require('node-fetch');

module.exports = client => {
  // Twitch Configuration
  const timerFast = 1000 * 60 * 10; // 10 Minutes
  const timerSlow = 1000 * 60 * 60 * 12; // 12 Hours
  const rateLimitMessage = `Speeding timer.`;

  client.twitchCheck = (token, channels) => {
    /*
    Spawn a monitor for each enabled channel provided.
    Settings found in config.json
    token = client.config.twitch.token;
    channels = client.config.twitch.channels;
    */

    let channelsWatched = '';

    channels.forEach(channel => {
      const { enabled, channelName } = channel;
      if (!enabled) return;
      channelsWatched += `${channelName} `;
      client.twitchCheckTimer(token, channel);

      // DEBUG ONLY
      // client.emit('announce', channel);
    });

    client.logger.log(`TwitchCheck monitoring: ${channelsWatched}`);
  };

  client.twitchCheckTimer = (token, channel) => {
    // Spawns a timer for each channel to be watched and checks them periodically.

    const nextTimer = rate => setTimeout(client.twitchCheckTimer, rate, token, channel);

    client
      .twitchGetStream(token, channel.channelName)
      .then(response => {
        if (response) {
          channel.stream = response;
          client.emit('announce', channel);
          client.logger.log(`TwitchCheck found ${channel.channelName} live, announcing.`);
          nextTimer(timerSlow);
        } else if (response == rateLimitMessage) {
          nextTimer(timerSlow * 4);
          client.logger.warn(`TwitchCheck is being rate limited. Increasing wait time by 4X.`);
        } else {
          nextTimer(timerFast);
          //client.logger.log(`TwitchCheck did not find ${channel.channelName} live, will continue search.`);
        }
      })
      .catch(error =>
        client.logger.error(
          `Error ocurred while monitoring ${channel.channelName}. Timer will be halted until reboot. Status: ${error}`
        )
      );
  };

  client.twitchGetStream = async (token, channel) => {
    // Check Twitch API for live streaming, return boolean.
    return await fetch(`https://api.twitch.tv/kraken/streams/${channel}?client_id=${token}`)
      .then(streamInfo => streamInfo.json())
      .then(streamInfo => (streamInfo.stream.stream_type == 'live' ? streamInfo.stream : false))
      .catch(error => {
        // When offline API will return all kinds of oddities, this covers any alternatives.
        return false;
      });
  };
};
