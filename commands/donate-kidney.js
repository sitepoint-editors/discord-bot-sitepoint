module.exports = {
  name: 'kt!donate-kidney',
  description: 'Donate kidney',
  execute(msg, args) {
    msg.channel.send( msg.author.username + ' has donated their kidney to Kidney God');
  },
};
