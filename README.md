# Electric Bovine

Your Sassy Discord Cow Companion

## Table of Contents

* [Electric Bovine](#electric-bovine)
  * [Table of Contents](#table-of-contents)
  * [Features](#features)
    * [Current ⚡](#current-)
    * [Planned 🔌](#planned-)
  * [Install and Run](#install-and-run)
  * [Use](#use)
  * [Pull Request](#pull-request)
  * [License](#license)

## Features

Electric Bovine is a very small chat bot using [DiscordJS](https://github.com/discordjs/discord.js). Much like the creamer packets at iHop it is intended to be single-serve. The arbitrary list below reflects the whimsical thoughts of the cow.

### Current ⚡

* `!ping` Roundtrip time between bot and server.

### Planned 🔌

* Announces when the configured Twitch streams have gone live to the requested channel.
* `!help` Help/Commmands list
* `!roll` Rolls (1d6, 2d10, etc)
* `!kill` Disables bot restricted to Admin users.
* `!file` file request
* `!cow` or `!moo` posts a cow gif
* `!smut` Writes a 50shades adlib

## Install and Run

Electric Bovine requires a config.json. Click [here](config.json.example) to see an example. If you need a developer token you can get one at the [Discord Developer Portal](https://discordapp.com/developers/applications) or [Twitch Developers](https://dev.twitch.tv/).

Then clone and run the script.

```bash
git clone https://github.com/[USER]/electricbovine.git
cd electricbovine
mv ~/config.json config.json # or create it at this time.
yarn
node index.js >> electricbovine.log 2>&1 & # run in background and records to .log, assuming node is in $PATH.
```

Then add the bot to your server using the OAUTH2 URL GENERATOR on the Discord Developer Portal.

## Use

Use the `!` prefix to use a command. Use `!help` or `!command` to see a list of [all commands](#current).

## Pull Request

That really seems like a mistake, but if you insist all suggestions and bug fixes are welcome. This is a personal project so I'll only be adding what I'll use. Feel free to fork it your own use.

## License

This project is licensed under [GPL](LICENSE). Portions of this code may use compatible license as mentioned below.

Portions of this code is licensed under MIT ([GuideBot](https://github.com/AnIdiotsGuide/guidebot/blob/master/LICENSE))

Although not included in this repository, portions of dependencies used by this code may be license under Apache License 2.0 ([DiscordJS](https://github.com/discordjs/discord.js/blob/master/LICENSE)) and MIT ([MomentJS](https://github.com/moment/moment/blob/develop/LICENSE) and [Node-Fetch](https://github.com/bitinn/node-fetch/blob/master/LICENSE.md)).