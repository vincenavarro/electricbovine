exports.run = async (client, message, args, level) => {
  const content = await message.channel.send('Calculating...');
  content.edit(
    `Discord Chat ${content.createdTimestamp - message.createdTimestamp}ms. Discord API ${Math.round(client.ping)}ms.`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'ping',
  category: 'Utility',
  description: 'Returns message speed of Discord message cycle and API.',
  usage: 'ping',
};
