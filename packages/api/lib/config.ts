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
  AUTH0: config.get('AUTH0'),
  POSTGRES: config.get('POSTGRES'),
  JWT_SECRET: config.get('JWT_SECRET'),
  ALLOWED_REDIRECT_URLS: config.get('ALLOWED_REDIRECT_URLS'),
  ADDSEARCH: config.get('ADDSEARCH'),
}
