// Runs when a message is received.

module.exports = async (client, message) => {
  // A little shorthand.
  let prefix = client.config.prefix;

  // Ignore if message is from a bot or doesn't start with the prefix.
  if (message.author.bot || message.content.indexOf(prefix) !== 0) return;

  // Split command into command and arguments.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Find the command in the list.
  const cmd = client.commands[command] || client.commands[client.aliases[command]];

  // If the command is not listed ignore.
  if (!cmd) return;

  // The gauntlet is passed, proceed.
  client.logger.command(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args); // Can add level or auth here later, if needed.
};
