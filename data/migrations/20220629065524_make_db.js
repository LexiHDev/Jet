exports.up = async (knex) => {
    await knex.schema
        .createTable('players', (tbl) => {
            tbl
                .integer('discord_id')
                .unsigned()
                .notNullable()
                .unique();
            tbl.string('discord_name');
            tbl.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('battletags', (tbl) => {
            tbl.increments('id');
            tbl.string('battletag').unique().notNullable();
            tbl
                .integer('discord_id')
                .unsigned()
                .notNullable()
                .references('discord_id')
                .inTable('players');
        });
};

exports.down = async (knex) => {
    await knex.schema
        .dropTableIfExists('battletags')
        .dropTableIfExists('players');
};
