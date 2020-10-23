const { Text, Float, Checkbox, Select, Url, Password, Relationship } = require('@keystonejs/fields');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');

require('dotenv').config();

const fileAdapter = new CloudinaryAdapter({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'find-my-workout',
});

exports.User = {
    fields: {
        username: { type: Text },
        password: { type: Password },
    }
};

exports.PaymentType = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the payment type', isRequired: true }
    }
};

exports.TrainingType = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the training type', isRequired: true }
    }
};

exports.Goal = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the goal', isRequired: true }
    }
};

exports.Level = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the level', isRequired: true }
    }
};

exports.Language = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the language', isRequired: true }
    }
};

exports.Extra = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the extra', isRequired: true }
    }
};

exports.Age = {
    fields: {
        name: { type: Text, schemaDoc: 'The name of the age group', isRequired: true }
    }
}

exports.Program = {
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

        // time
        trainingDaysPerWeek: { type: Float, schemaDoc: 'How many training days per week?' },
        actRecDaysPerWeek: { type: Float, schemaDoc: 'How many active recovery days per week?' },
        hoursPerDay: { type: Float, schemaDoc: 'How many hours does a training take on average?' },

        payment: {
            type: Relationship,
            ref: 'PaymentType',
            many: true
        },

        trainingTypes: {
            type: Relationship,
            ref: 'TrainingType',
            many: true
        },

        goal: {
            type: Relationship,
            ref: 'Goal',
            many: true
        },

        level: {
            type: Relationship,
            ref: 'Level',
            many: true
        },

        languages: {
            type: Relationship,
            ref: 'Language',
            many: true
        },

        extras: {
            type: Relationship,
            ref: 'Extra',
            many: true
        },

        ages: {
            type: Relationship,
            ref: 'Age',
            many: true
        }
    },
};