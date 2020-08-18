const findBonusAndDescription = (args, bonusRegex, descRegex, dieMax, dieMin) => {

  let errorMsg;

  let bnsInd = args.findIndex(arg => arg.match(bonusRegex)) || null;
  let descInd = args.findIndex(arg => arg.match(descRegex)) || null;

  bnsInd = bnsInd < 0 ? undefined : bnsInd;
  descInd = descInd < 0 ? undefined : descInd;
  
  if(bnsInd && descInd && bnsInd < descInd){
    rollBonus = parseInt(args[bnsInd]);
    rollBonus = isNaN(rollBonus) ? 0 : rollBonus;
  }

  if(bnsInd && descInd && descInd < bnsInd){
    errorMsg = "1 Declare any bonus to the roll prior to descriptive text.";
    return;
  }

  let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin) + rollBonus;

  if(descInd) description = args.slice(descInd).join(' ').substr(1);

  let output = {};
  output.rollResult = rollResult;
  output.description = description;

  if(errorMsg){
    output.errorMsg = errorMsg;
  }
  
  console.log('output', output);

  return output;
}

module.exports = findBonusAndDescription;