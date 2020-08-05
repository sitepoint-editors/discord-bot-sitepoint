const Discord = require('discord.js');
require('dotenv').config();

module.exports = {


  name: '$t',
  description: 'Task Roll',
  async execute(msg, args) {
    const client = process.env.CLIENT;

    const rollResultEmbed = new Discord.MessageEmbed();

    const successColor = `#0dff00`;
    const failColor = `#ff0000`;
    const color17 = `#0062ff`;
    const color18 = `#0091ff`;
    const color19 = `#00b3ff`;
    const color20 = `#00eeff`;


    const dieMax = 20;
    const dieMin = 1;
    
    let rollBonus = 0;
    
    let taskLevel = args[0];

    let success;
    let taskRange = /[1-9]|10/i;
    let bonusRegex = /^[+-]/;
    let targetNumber = args[0] * 3;
    let description = null;
    
    if(!args[0].match(taskRange)) {msg.reply('First value must be a number between 1 and 10'); return};

    
    if(args[1] && args[1].match(bonusRegex)){
      rollBonus = parseInt(args[1]);
    }

    let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin) + parseInt(rollBonus);
    
    let descriptorReg = /^#/;

    let descriptorStart = null;
    for(let x = 0; x < args.length; x++){
      if(args[x].match(descriptorReg)){
        descriptorStart = x;
      }
    }
    
    if(descriptorStart) description = args.slice(descriptorStart).join(' ').substr(1);
    
    
    // task high level
    rollResultEmbed
      .setTitle(`Task Level: ${taskLevel}`)
    

    let rollBreakdown = `1d${dieMax}`;
    if(rollBonus != 0){
      rollBreakdown += rollBonus > 0 ? `+${rollBonus}` : `${rollBonus}`;
    }
    rollBreakdown += ` => ${rollResult} vs TN ${targetNumber} => `;

    success = rollResult>=targetNumber ? true : false;

    let outcome = success ? `Success!` : `Fail!`;
    
    rollResultEmbed
    .setDescription(description ? description : "")
    .addFields(
        { name: rollBreakdown, value: outcome },
    )
    .setColor(success ? successColor : failColor);

    switch(rollResult){
      case 1:{
        rollResultEmbed
        .addFields(
          { name: `Nat 1!`, value:`GM Intrusion`}
        )
        .setColor(`ffff00`)
        break;
      }
      case 17:{
        rollResultEmbed.addFields(
          { name: `Nat 17!`, value: `+1 Damage Bonus on attack!`}
        )
        .setColor(color17);
        break;
      }
      case 18:{
        rollResultEmbed.addFields(
          { name: `Nat 18!`, value: `+2 Damage Bonus on attack!`}
        )
        .setColor(color18);
        break;
      }
      case 19:{
        rollResultEmbed.addFields(
          { name: `Nat 19!`, value: `+3 Damage Bonus on attack or Minor Effect!`}
        )
        .setColor(color19);
        break;
      }
      case 20:{
        rollResultEmbed.addFields(
          { name: `Nat 20!`, value: `+5 Damage Bonus on attack or Major Effect!`}
        )
        .setColor(color20);
        break;
      }  
    }
    
    let y = JSON.stringify(msg.guild.members.cache);
    let q = JSON.parse(y).find(ele => ele.userID = msg.author.id);
    let z = q.displayName;
    console.log(z);

    rollResultEmbed
      .setFooter(`In response to ${z}`);

    msg.channel.send(rollResultEmbed);
    
    return;

    
  },
};