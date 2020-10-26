const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NuxtApp } = require('@keystonejs/app-nuxt');

require('dotenv').config();

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'FindMyWorkout';
const mongo_uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/' + process.env.MONGODB;
const adapterConfig = { mongoUri: mongo_uri };

const {
  User,
  Program,
  PaymentType,
  TrainingType,
  Goal,
  Level,
  Language,
  Extra,
  Age
} = require('./schema');


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookie: {
    secure: false, //process.env.NODE_ENV === 'production', // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  cookieSecret: process.env.COOKIE_SECRET
});



keystone.createList('PaymentType', PaymentType);

keystone.createList('TrainingType', TrainingType);

keystone.createList('Goal', Goal);

keystone.createList('Level', Level);

keystone.createList('Language', Language);

keystone.createList('Extra', Extra);

keystone.createList('Age', Age);

keystone.createList('Program', Program);

keystone.createList('User', User);


const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username',
    secretField: 'password',
  }
});


module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      authStrategy
    }),
    new NuxtApp({
      srcDir: 'src',
      buildDir: 'dist',
      plugins: [
        '~/plugins/vue-formulate',
        '~/plugins/vue-click-outside'
      ],
      env: {
        baseUrl: process.env.BASE_URL,
      }
    }),
  ],
};
