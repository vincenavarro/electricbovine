exports.run = async (client, message, args, level) => {
  const limits = {
    maxSets: 3,
    maxDicePerSet: 6,
    maxDiceSize: 100,
  };

  const rollExample = `\`${client.config.prefix}roll 5d20 d6 2d100\``;

  const rollMessage = {
    badFormat: `Invalid format. Use ${rollExample}.`,
    exceedMaxSets: `Sorry, you may only roll ${limits.maxSets} sets of dice at a time.`,
    exceedMaxDiceSize: `Sorry the maximum dice size is ${limits.maxDiceSize}.`,
    exceedMaxDicePerSet: `Sorry the maximum dice per set is ${limits.maxDicePerSet}.`,
  };

  const validRequest = (requests = args) => {


    if (requests.length > limits.maxSets) {
      message.channel.send(rollMessage.exceedMaxSets);
      return false;
    }

    let isValid = true;
    requests.forEach(request => {
      const [quantity, diceSize] = request.toLowerCase().split('d');

      if (
        request.toLowerCase().split('d').length != 2 ||
        isNaN(quantity) ||
        isNaN(diceSize) ||
        quantity < 1 ||
        diceSize < 1
      ) {
        message.channel.send(rollMessage.badFormat);
        isValid = false;
        return;
      }

      if (diceSize > limits.maxDiceSize) {
        message.channel.send(rollMessage.exceedMaxDiceSize);
        isValid = false;
        return;
      }

      if (quantity > limits.maxDicePerSet) {
        message.channel.send(rollMessage.exceedMaxDicePerSet);
        isValid = false;
        return;
      }
    });

    return isValid;
  };

  const rollDice = (qty = '1', size = '6', mod = 'false') => {
    // TODO: Exploding, piercing, advantage, disadvantage.

    const results = [];

    for (i = 0; i < qty; i++) {
      results.push(Math.floor(Math.random() * size + 1));
    }

    return results;
  };

  // Interpret input.
  // Assume a 1d6 if no arguments are given.
  // Add 1 if user starts with d.

  if (!args[0]) args = ['1d6'];
  args.forEach((arg, number) => {
    if (arg.toLowerCase().startsWith('d')) args[number] = 1 + args[number];
  });

  if (validRequest(args)) {
    const resultsMessage = args.map(arg => {
      // Rolls and returns array.
      const [quantity, diceSize] = arg.toLowerCase().split('d');
      const results = rollDice(quantity, diceSize);
      const resultsTotal = results.reduce((a, b) => a + b, 0);

      // Adds flair, enjoy the 🍝.
      const resultsTotalBonus =
        resultsTotal / (quantity * diceSize) >= 0.9
          ? ` <:matt:441663397629657089>`
          : resultsTotal / (quantity * diceSize) <= 0.1 || resultsTotal == 1
          ? ` <:shock:577835928186257466>`
          : ``;
      const resultsWithCrits = results.map(result => (result == diceSize ? `__${result}__` : result));

      // Returns message depending on if there were more than once dies or not.
      return args.length > 1 || quantity > 1
        ? `${args.length != 1 ? '\n' : ''}**${arg}:** ${resultsWithCrits.join(
            ', '
          )} - Total: **${resultsTotal}**${resultsTotalBonus}`
        : `**${resultsWithCrits}**${resultsTotalBonus}`;
    });

    message.channel.send(
      `***${
        message.channel.type !== 'dm' && message.member.nickname ? message.member.nickname : message.author.username
      } rolls*** :game_die: ${resultsMessage.join('')}`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 'User',
};

exports.help = {
  name: 'roll',
  category: 'Games',
  description: `Roll dice. Example: \`roll 2d6\` or \`roll 5d20 1d6\`.`,
  usage: 'roll',
};
