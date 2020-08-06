const Discord = require('discord.js');
require('dotenv').config();

module.exports = {


  name: '$help',
  description: 'info',
  async execute(msg, args) {
    const client = process.env.CLIENT;

    const rollResultEmbed = new Discord.MessageEmbed()
      .setColor(`#3b782e`)
      .setTitle(`Commands for dice roller`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
      )
      .addFields(
        { name: `Recovery Roll`, value: `$r bonus`},
        { name: `$r`, value:`optional: +/- bonus value`, inline:true},
        { name: '\u200B', value: '\u200B' },
      )
      
      .addFields(
        { name: `Task Roll`, value: `$t task bonus #description`},
        { name: `task`, value:`required: number between 1 and 10 for challenge level`, inline:true},
        { name: `bonus`, value:`optinoal: + or - a number value`, inline:true},
        { name: `#description`, value:`optional: # followed by descritive text of the action`, inline:true},
        { name: '\u200B', value: '\u200B' },
        )

      .addFields(
        { name: `Custom Roll`, value: `$d size bonus #description`},
        { name: `size`, value:`required: a positive number to denote the maximum value for the roll, ie. 1d20, 1d100, 1d3`, inline: true},
        { name: `bonus`, value: `optional: +/- a bonus to modify the roll`, inline:true},
        { name: `#description`, value:`optional: # followed by descriptive text of the action`, inline:true},
        { name: '\u200B', value: '\u200B' },
      )


    msg.reply(rollResultEmbed);

  }
}