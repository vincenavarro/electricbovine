const { RichEmbed } = require('discord.js');

exports.run = (client, message, args, level) => {
  let theList = '';
  for (let key in client.commands) {
    theList += `\`${client.config.prefix}${client.commands[key].help.name}\` ${client.commands[key].help.description}` + '\n';
  }

  theList += '\n\nI also announce streams of interest in their respective channels :)';

  const embed = new RichEmbed()
    // Set the title of the field
    .setTitle(`List of Commands`)
    // Set the color of the embed
    .setColor(0xffff00)
    .attachFiles(['./image/help.png'])
    .setThumbnail(`attachment://help.png`)
    // Set the main content of the embed
    .setDescription(theList);
  //.setFooter(`Moo.`, `attachment://bomb.png`);

  //console.log(message);
  message.author.send(embed);
  if (message.channel.type !== 'dm') message.channel.send(`I sent you a message ${message.channel.type !== 'dm' && message.member.nickname ? message.member.nickname : message.author.username}! Slide into the DMs! 💕😘💋💕`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'wtf'],
  permLevel: 'User',
};

exports.help = {
  name: 'help',
  category: 'System',
  description: 'Displays all the commands available to you.',
  usage: 'help [command]',
};
