exports.up = async (knex) => {
    await knex.schema
        .createTable('players', (tbl) => {
            tbl.integer('discord_id');
            tbl.string('discord_name');
            tbl.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('battletags', (tbl) => {
            tbl.increments('id');
            tbl.unique('battletag').string().signed().noDuplicates.notNullable();
            tbl
                .integer('discord_id')
                .unsigned()
                .notNullable()
                .references('discord_id')
                .inTable('players')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT');
        });
};

exports.down = async (knex) => {
    await knex.schema
        .dropTableIfExists('players')
        .dropTableIfExists('battletags');
};
