import db from '../../data/db-config';

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
    db('battletags')
        .insert({ battletag: battleTag, discord_id: discordId });
};

module.exports = { getBattleTagsByDiscordId, addBattleTagForUser };
