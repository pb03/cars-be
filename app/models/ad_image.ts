import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AdImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare adId: number

  @column()
  declare imageSrc: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
