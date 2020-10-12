const { Keystone } = require('@keystonejs/keystone');
const { Text, Float, Checkbox, Select, Url, Password } = require('@keystonejs/fields');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NuxtApp } = require('@keystonejs/app-nuxt');

require('dotenv').config();

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'FindMyWorkout';
const mongo_uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost/' + process.env.MONGODB;
const adapterConfig = { mongoUri: mongo_uri };


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  cookieSecret: process.env.COOKIE_SECRET
});

const fileAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'find-my-workout',
});


keystone.createList('Program', {
  schemaDoc: 'A collection of workout programs',
  fields: {
    // general
    name: { type: Text, schemaDoc: 'The name of the program', isRequired: true },
    link: { type: Url, schemaDoc: 'The link to the program'},
    image: { type: CloudinaryImage, adapter: fileAdapter, schemaDoc: 'The image of the program', },

    // price
    price: { type: Float, schemaDoc: 'How much does it cost?' },
    priceType: { type: Select, options: ['per day', 'per week', 'per month', 'per year', 'one time payment'], dataType: 'string', schemaDoc: 'What kind of price?' },
    currency: { type: Select, options: ['dollars', 'euros', 'pounds'], dataType: 'string', schemaDoc: 'Which currency?' },

    // payment
    paypal: { type: Checkbox, schemaDoc: 'Can you pay using Paypal?' },
    creditCard: { type: Checkbox, schemaDoc: 'Can you pay using credit card?' },
    klarna: { type: Checkbox, schemaDoc: 'Can you pay using klarna?' },
    stripe: { type: Checkbox, schemaDoc: 'Can you pay using Stripe?' },
    bankAccount: { type: Checkbox, schemaDoc: 'Can you pay using your bank account?' },
    applePay: { type: Checkbox, schemaDoc: 'Can you pay using Apple Pay?' },
    googlePay: { type: Checkbox, schemaDoc: 'Can you pay using Google Pay?' },

    // type
    weightlifting: { type: Checkbox, schemaDoc: 'Does it include weightlifting?' },
    gymnastics: { type: Checkbox, schemaDoc: 'Does it include gymnastics?' },
    metcon: { type: Checkbox, schemaDoc: 'Does it include metabolic conditioning?' },
    engineRunning: { type: Checkbox, schemaDoc: 'Does it include engine running?' },
    strongman: { type: Checkbox, schemaDoc: 'Does it include strongman training?' },
    powerLifting: { type: Checkbox, schemaDoc: 'Does it include power lifting?' },
    bodyBuilding: { type: Checkbox, schemaDoc: 'Does it include body building?' },
    crossfit: { type: Checkbox, schemaDoc: 'Does it include everything (crossfit)?' },
    athleticTraining: { type: Checkbox, schemaDoc: 'Does it include athletic training?' },

    // goal
    competitions: { type: Checkbox, schemaDoc: 'Can you train for competitions with it?' },
    opens: { type: Checkbox, schemaDoc: 'Can you train for the crossfit opens with it?' },
    games: { type: Checkbox, schemaDoc: 'Can you train for the crossfit games with it?' },
    fitness: { type: Checkbox, schemaDoc: 'Can you train for fitness with it?' },
    weightloss: { type: Checkbox, schemaDoc: 'Can you lose weight with it?' },
    musclegain: { type: Checkbox, schemaDoc: 'Can you gain muscle with it?' },

    level: { type: Select, options: ['Beginner', 'Intermediate', 'Advanced', 'Elite'], dataType: 'string', schemaDoc: 'What level is the program?' },

    // language
    english: { type: Checkbox, schemaDoc: 'Is it available in English?' },
    german: { type: Checkbox, schemaDoc: 'Is it available in German?' },
    spanish: { type: Checkbox, schemaDoc: 'Is it available in Spanish?' },

    // extras
    comesWithApp: { type: Checkbox, schemaDoc: 'Does it include an app?' },
    personalized: { type: Checkbox, schemaDoc: 'Is it personalized for the athlete?' },
    videoCoaching: { type: Checkbox, schemaDoc: 'Does it include video coaching?' },

    // age group
    teens: { type: Checkbox, schemaDoc: 'Is it made for teenagers?' },
    adults: { type: Checkbox, schemaDoc: 'Is it made for adults?' },
    masters: { type: Checkbox, schemaDoc: 'Is it made for masters?' },

    // time
    trainingDaysPerWeek: { type: Float, schemaDoc: 'How many training days per week?' },
    actRecDaysPerWeek: { type: Float, schemaDoc: 'How many active recovery days per week?' },
    hoursPerDay: { type: Float, schemaDoc: 'How many hours does a training take on average?' }
  },
});

keystone.createList('User', {
  fields: {
    username: { type: Text },
    password: { type: Password },
  }
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  }
});


module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: PROJECT_NAME }),
    new NuxtApp({
      srcDir: 'src',
      buildDir: 'dist',
      plugins: [
        '~/plugins/vue-formulate',
        '~/plugins/vue-click-outside'
      ]
    }),
  ],
};
