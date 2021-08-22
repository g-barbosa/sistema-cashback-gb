import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('compras', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.dateTime('data').notNullable();
        table.string('codigo').notNullable();
        table.float('valor').notNullable();
        table.string('status').notNullable();
        table.string('revendedorId').references('id').inTable('revendedores')
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('compras')
}

