const config = require('@iteam/config')({
  file: `${process.cwd()}/config.json`,
  defaults: {
    POSTGRES: {
      USER: 'iteamadmin',
      PASSWORD: 'adminadmin1337',
      HOST: 'localhost',
      PORT: 5432,
      DATABASE: 'samtalio',
    },
    JWT_SECRET: 'stuff',
  },
})

export default {
  POSTGRES: config.get('POSTGRES'),
  JWT_SECRET: config.get('JWT_SECRET'),
}
