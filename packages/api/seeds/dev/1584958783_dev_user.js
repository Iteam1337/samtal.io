exports.seed = async knex => {
  await knex('agenda_items').del()
  await knex('rooms').del()
  await knex('users').del()

  return knex('users').insert({
    email: 'iteamadmin@iteam.se',
    name: 'Iteam',
    password: '0f713c2c82732d4279163d2333d7c684', //adminadmin
  })
}
