const { log } = require('beautify.log');
const { addBattleTagForUser } = require('../battlenet/discord-model');

module.exports = {

    name: 'add-battletag',
    aliases: ['ab'],
    description: 'Add BattleTag to your profile.',

    // Whether the command requires arguments
    reqArgs: true,
    // Arguments usage
    usage: '{ BattleNet }',
    // Example usage of the command
    exampleUsage: 'add-battletag Overwatch#0000',

    category: 'utility',

    // Command cooldown in milliseconds
    cooldown: 500,

    // eslint-disable-next-line no-unused-vars
    async run(ctx) {
        if (ctx.guild.available) {
            addBattleTagForUser(ctx.sender.id, ctx.)
            // ctx.sendText(`Getting user info for ${ctx}`);
        } else {
            log(
                `[ERROR] Failed to send message to: ${ctx.guild.id}.
                \nGuild: ${ctx.guild.name} unavailable.[/ERROR]`,
            );
        }
        // Code for the command goes here
        // Use the ctx for useful variables
    },
};
