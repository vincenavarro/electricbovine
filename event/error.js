module.exports = async (client, error) => {
  client.logger.log(`Discord.js Error: \n${JSON.stringify(error)}`, 'error');
};
