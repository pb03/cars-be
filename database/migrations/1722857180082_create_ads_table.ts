import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ads'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('brand').notNullable()
      table.integer('price').notNullable()
      table.string('location').notNullable()
      table.string('owner_count').notNullable()
      table.integer('kms_driven').notNullable()
      table.enum('fuel_type', ['Petrol', 'Diesel', 'Hybrid', 'Electirc']).notNullable()
      table.string('registration').notNullable()
      table.string('registration_year').notNullable()
      table.enum('transmission', ['Manual', 'Automatic']).notNullable()
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
