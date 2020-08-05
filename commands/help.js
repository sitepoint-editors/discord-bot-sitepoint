const Discord = require('discord.js');
require('dotenv').config();

module.exports = {


  name: '$help',
  description: 'info',
  async execute(msg, args) {
    const client = process.env.CLIENT;

    msg.reply(`\n$r bonus -> Recovery Roll +/- a number. Minimum value of 1` +
              `\n$t taskLevel bonus #description -> Task Roll followed by task level, optional: roll bonus, optional: '#description of action preceded by a hashtag'`)

  }
}