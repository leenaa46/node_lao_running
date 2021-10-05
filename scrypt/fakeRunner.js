import db from '../models'
import faker, { random } from 'faker'
import bcrypt from 'bcrypt'

const packages = await db.Package.findAll()
packages.array.forEach(package => {
  const user = await db.User.create({
    name: faker.name.firstName,
    enail: faker.internet.email,
    phone: faker.random.number({ min: 20000000, max: 99999999 }),
    is_active: 1,
    password: bcrypt('11111111')
  })

  const profile = await user.createProfile({
    name: user.name,
    surname: faker.name.lastName,
    gender: faker.random.arrayElement(['male', 'female']),
    dob: faker.date.past(20),
    national_id: 126,
    profile_image: faker.image.avatar,
  })

  const user_package = await user.addPackages({
    total: 3,
    status: 'success',
    invoice_id: '964e7f7a25',
    transaction_id: '007110268a',
    terminal_id: '2fa384dbd6',
    ticket_id: 'F5DNQ7F065BB'
  })
});