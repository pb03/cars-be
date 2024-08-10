import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import AdImage from './ad_image.js'
import User from './user.js'

enum FuelType {
  Petrol,
  Diesel,
  Hybrid,
  Electirc,
}

enum Transmission {
  Manual,
  Automatic,
}

export default class Ad extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare brand: string

  @column()
  declare price: number

  @column()
  declare location: string

  @column()
  declare ownerCount: string

  @column()
  declare kmsDriven: number

  @column()
  declare fuelType: FuelType

  @column()
  declare registration: string

  @column()
  declare registrationYear: string

  @column()
  declare transmission: Transmission

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => AdImage)
  declare images: HasMany<typeof AdImage>

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>
}
