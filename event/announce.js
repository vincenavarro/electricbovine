const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = (client, channel) => {
  const { enabled, channelName, category, message, stream = '' } = channel;
  const discordChannel = client.config.announce[category];

  //https://discord.js.org/#/docs/main/stable/class/RichEmbed
  const embed = new RichEmbed()
    // Set the title of the field
    .setTitle(`${stream.channel.display_name} - ${stream.channel.status}`)
    // Set the color of the embed
    .setColor(0xff0000)
    .setURL(stream.channel.url)
    .setThumbnail(stream.channel.logo)
    // Set the main content of the embed
    .setDescription(`@here! Click above to watch! ${message}`)
    .attachFiles(['./image/bomb.png'])
    .setFooter(
      `This message will self-destruct ${moment()
        .add(12, 'hours')
        .calendar()
        .toLowerCase()}.`,
      `attachment://bomb.png`
    );

  client.channels
    .get(discordChannel)
    .send(embed)
    .then(msg => msg.delete(1000 * 60 * 60 * 12));
};
