const Discord = require('discord.js');
require('dotenv').config();
const findBonusAndDescription = require('../lib/findBnsAndDesc.js');

module.exports = {


  name: '$d',
  description: 'Custom Roll',
  async execute(msg, args) {

    console.log('args', args);

    const client = process.env.CLIENT;


    const rollResultEmbed = new Discord.MessageEmbed();


    const dieMin = 1;
    const dieMax = args[0];
    let rollBonus = 0;
    // let description = null;

    if(dieMax <= 1) {
      msg.reply(`Please provide a die size larger than 1`);
      return;
    }

    //below section handles bonus and descriptor info

    let bonusRegex = /^[+-]\d*/;
    let descRegex = /^[#]/;

    let bnsInd = args.findIndex(arg => arg.match(bonusRegex)) || null;
    let descInd = args.findIndex(arg => arg.match(descRegex)) || null;

    bnsInd = bnsInd < 0 ? undefined : bnsInd;
    descInd = descInd < 0 ? undefined : descInd;


    if(bnsInd && descInd && bnsInd < descInd){
      rollBonus = parseInt(args[bnsInd]);
      rollBonus = isNaN(rollBonus) ? 0 : rollBonus;
    }

    

    console.log('rollBonus', rollBonus);

    let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin) + rollBonus ;
    // let {rollResult, description, errorMsg} = findBonusAndDescription(args, bonusRegex, descRegex, dieMax, dieMin);

    rollResult = rollResult <= 0 ? 1 : rollResult;

    let rollNotes = `Rolling 1d${dieMax}`;
    if(rollBonus != 0){
      rollNotes += rollBonus > 0 ? `+${rollBonus}` : `${rollBonus}`;
    }

    // if(errorMsg){
    //   msg.reply(errorMsg);
    //   return;
    // }

    if(bnsInd && descInd && descInd < bnsInd){
      msg.reply("Declare any bonus to the roll prior to descriptive text.");
      return;
    }


    if(descInd) description = args.slice(descInd).join(' ').substr(1);

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
    
    

    rollResultEmbed
    .setDescription(description ? description : "");

    msg.channel.send(rollResultEmbed);

    return;
}
}