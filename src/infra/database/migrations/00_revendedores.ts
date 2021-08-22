import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('revendedores', table => {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('nome').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('revendedores')
}

