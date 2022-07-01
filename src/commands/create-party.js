const { log } = require('beautify.log');

module.exports = {

    name: 'create party',
    aliases: ['youarentoantaiobklajmwltjalkwjnmk'],
    description: 'Create a party to start tracking stats.',

    // Whether the command requires arguments
    reqArgs: true,
    // Arguments usage
    usage: '{ @user, @user, @user, @user, @user, @user }',
    // Example usage of the command
    exampleUsage: 'commandName @LexicalDevil, @Prism',

    category: 'utility',

    // Command cooldown in milliseconds
    cooldown: 300,

    // eslint-disable-next-line no-unused-vars
    async run(ctx) {
        if (ctx.guild.available) {
            ctx.sendText(
                `Hello creator: <@210358609543036928>!\n
                We're still working on this command.`,
            );
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
