import vine from '@vinejs/vine'

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

export const createAdValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    brand: vine.string().trim(),
    price: vine.number(),
    location: vine.string().trim(),
    ownerCount: vine.string().trim(),
    kmsDriven: vine.number(),
    fuelType: vine.enum(FuelType),
    registration: vine.string(),
    registrationYear: vine.string(),
    transmission: vine.enum(Transmission),
  })
)
