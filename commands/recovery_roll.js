const Discord = require('discord.js');
require('dotenv').config();

module.exports = {


  name: '$r',
  description: 'Recovery Roll',
  async execute(msg, args) {
    const client = process.env.CLIENT;

    const rollResultEmbed = new Discord.MessageEmbed();


    const dieMin = 1;
    const dieMax = 6;
    let rollBonus = 0;

    let bonusRegex = /^[+-]/;

    // if(args[0] && !args[0].match(taskRange)) {msg.reply('First value must be a number.'); return};

    if(args[0] && args[0].match(bonusRegex)){
      rollBonus = parseInt(args[0]);
    }else if(args[0] && !args[0].match(bonusRegex)){
      msg.reply("Please indicate a + or - number for the bonus and try again");
      return;
    }

    let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin) + parseInt(rollBonus);

    rollResult = rollResult < 0 ? 1 : rollResult;

    let rollNotes = `Rolling 1d6`;
    if(rollBonus != 0){
      rollNotes += rollBonus > 0 ? `+${rollBonus}` : `${rollBonus}`;
    }


    rollResultEmbed
      .setTitle(`Recovery Roll`)
      .setDescription("")
      .setColor(`#0062ff`)
      .addFields(
        { name: `${rollNotes} => `, value: `${rollResult} pool regained!`}
      );

    let y = JSON.stringify(msg.guild.members.cache);
    let q = JSON.parse(y).find(ele => ele.userID = msg.author.id);
    let z = q.displayName;
    // console.log(z);

    rollResultEmbed
      .setFooter(`In response to ${z}`);


    msg.channel.send(rollResultEmbed);

    return;
}
}
