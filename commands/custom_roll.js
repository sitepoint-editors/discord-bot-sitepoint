const Discord = require('discord.js');
require('dotenv').config();

module.exports = {


  name: '$d',
  description: 'Custom Roll',
  async execute(msg, args) {
    const client = process.env.CLIENT;


    const rollResultEmbed = new Discord.MessageEmbed();


    const dieMin = 1;
    const dieMax = args[0];
    let rollBonus = 0;

    if(dieMax <= 1) {
      msg.reply(`Please provide a die size larger than 1`);
      return;
    }

    let bonusRegex = /^[+-]/;

    // if(args[0] && !args[0].match(taskRange)) {msg.reply('First value must be a number.'); return};

    if(args[1] && args[1].match(bonusRegex)){
      rollBonus = parseInt(args[1]);
    }else if(args[1] && !args[1].match(bonusRegex)){
      msg.reply("Please indicate a + or - number for the bonus and try again");
      return;
    }

    let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin) + parseInt(rollBonus);

    rollResult = rollResult < 0 ? 1 : rollResult;

    let rollNotes = `Rolling 1d${dieMax}`;
    if(rollBonus != 0){
      rollNotes += rollBonus > 0 ? `+${rollBonus}` : `${rollBonus}`;
    }


    rollResultEmbed
      .setTitle(`Custom Roll`)
      .setDescription("")
      .setColor(`#0062ff`)
      .addFields(
        { name: `${rollNotes} => `, value: `${rollResult}!`}
      );

    let y = JSON.stringify(msg.guild.members.cache);
    let q = JSON.parse(y).find(ele => ele.userID == msg.author.id);
    let z = q.displayName;
    // console.log(z);

    rollResultEmbed
      .setFooter(`In response to ${z}`);

    let descriptorReg = /^#/;

    let descriptorStart = null;
    for(let x = 0; x < args.length; x++){
      if(args[x].match(descriptorReg)){
        descriptorStart = x;
      }
    }
    
    if(descriptorStart) description = args.slice(descriptorStart).join(' ').substr(1);

    rollResultEmbed
    .setDescription(description ? description : "");

    msg.channel.send(rollResultEmbed);

    return;
}
}