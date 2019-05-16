const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = (client, channel) => {
  const { enabled, channelName, category, message, stream = '' } = channel;
  const discordChannel = client.config.announce[category];

  //console.log(channel.stream);

  //https://discord.js.org/#/docs/main/stable/class/RichEmbed
  const embed = new RichEmbed()
    // Set the title of the field
    .setTitle(`${stream.channel.display_name} is streaming ${stream.channel.status}!`)
    // Set the color of the embed
    .setColor(0xff0000)
    .setURL(stream.channel.url)
    .setThumbnail(stream.channel.logo)
    // Set the main content of the embed
    .setDescription(`Watch here ${stream.channel.url}! ${message}`)
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
