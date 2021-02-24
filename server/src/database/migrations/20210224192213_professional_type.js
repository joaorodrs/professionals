const tableName = 'professional_type'

export const up = async (knex) => {
  knex.schema.createTable(tableName, table => {
    table.increment('id').primary().unsigned()
    table.string('description').notNullable()
    table.string('phone_number')
    table.boolean('situation').notNullable()
    table.timestamps(false, true)
  })

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `)
}

export const down = (knex) => {
  knex.schema.dropTable(tableName)
}
