module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args) {
    msg.reply('pong');
    // msg.channel.send('pong');
  },
};