const db = require('../../data/db-config');

const getBattleTagsByDiscordId = async (discordId) => {
    const battleTags = await db('battletags')
        .select('*')
        .leftJoin('players', 'battletags.discord_id', 'players.discord_id')
        .where({ 'battletags.discord_id': discordId })
        .orderBy('battletags.id');

    return {
        discord_id: Number(discordId),
        discord_name: String(battleTags[0].discord_name),
        created_at: battleTags[0].created_at,
        accounts: battleTags.map((battleTag) => battleTag.battletag),
    };
};

const addBattleTagForUser = async (discordId, battleTag) => {
    await db('battletags')
        .insert({ battletag: battleTag, discord_id: discordId });
};

const addDiscordUser = async (discordId, username) => {
    await db('players')
        .insert({ discord_name: username, discord_id: discordId });
};
const discordUserExists = async (discordId) => {
    const user = await db('players')
        .select('*')
        .where({ discord_id: discordId });
    return user;
};

const battleTagExists = async (battleTag) => {
    const ret = await db('battletags')
        .select('*')
        .leftJoin('players', 'battletags.discord_id', 'players.discord_id')
        .where({ battletag: battleTag });
    return ret;
};

module.exports = {
    addBattleTagForUser,
    addDiscordUser,
    getBattleTagsByDiscordId,
    discordUserExists,
    battleTagExists,
};
