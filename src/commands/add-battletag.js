const oversmash = require('oversmash');
const discordModel = require('../battlenet/discord-model');
const logger = require('../core/utils/logger');

const ow = oversmash.default();

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
            const user = await discordModel.discordUserExists(ctx.user.id);
            const battlenet = await ow.player(ctx.args[0]);
            if (battlenet.accounts.length === 0) {
                ctx.sendText(`Invalid battletag: ${ctx.args[0]}`);
                return;
            }
            
            if (user.length === 0) {
                await discordModel.addDiscordUser(ctx.user.id, `${ctx.user.username}#${ctx.user.discriminator}`);
            }
            const battleTag = await discordModel.battleTagExists(ctx.args[0]);
            if (battleTag.length === 0) {
                await discordModel.addBattleTagForUser(ctx.user.id, ctx.args[0]);
            } else {
                ctx.sendText(`BattleTag already in use by: ${battleTag[0].discord_name}`);
                logger.info(`BattleTag already in use: ${JSON.stringify(battleTag)}`);
                return;
            }
            const { accounts } = await discordModel.getBattleTagsByDiscordId(ctx.user.id);
            ctx.sendText(`Success! You have added the BattleTag ${ctx.args[0]} to your account.` 
                            + '\n\nYou have linked the BattleTags: ```js\n'
                            + `["${accounts.join('",\n"')}"]\n\`\`\``);
        } 
        logger.error(
            `Failed to send message to: ${ctx.guild.id}.`,
            `Guild: ${ctx.guild.name} unavailable.[/ERROR]`,
        );
        
        // Code for the command goes here
        // Use the ctx for useful variables
    },
};
