const axios = require('axios')
const FAUCETSECRET = process.env.FAUCETSECRET;

async function callFaucet(arg) {
  return axios.post('https://faucet.ethswarm.org/fund-gbzz', {
    token: FAUCETSECRET,
    receiver: arg
  }).then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res.data.success)
    return res.data.success
  }).catch(error => {
    console.error(error)
    return error
  })
}

module.exports = {
  name: 'sprinkle',
  description: 'Sprinkle',
  execute(msg, args) {
    msg.reply('hold on... dripping to ' + args[0]);
    callFaucet(args[0]).then((result) => {
      msg.channel.send(result.faucetAddress);
    })
  },
};

