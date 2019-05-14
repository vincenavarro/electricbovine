/*
Logger class for easy and aesthetically pleasing console logging
*/
const moment = require('moment');

exports.log = (content, type = 'log') => {
  const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
  switch (type) {
    case 'log': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    }
    case 'warning': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    }
    case 'error': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    }
    case 'debug': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    }
    case 'command': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content}`);
    }
    case 'ready': {
      return console.log(`${timestamp} ${type.toUpperCase()} ${content}`);
    }
    default:
      throw new TypeError('Logger type must be either warning, debug, log, ready, command or error.');
  }
};

exports.error = (...args) => this.log(...args, 'error');

exports.warning = (...args) => this.log(...args, 'warning');

exports.debug = (...args) => this.log(...args, 'debug');

exports.command = (...args) => this.log(...args, 'command');
