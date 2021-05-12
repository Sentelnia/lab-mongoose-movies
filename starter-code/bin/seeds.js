const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity')

mongoose.connect(`mongodb://localhost/starter-code`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
    {
        name: 'Evan Peters',
        occupation: 'Actor',
        catchPhrase: "I like to imagine, if I was in the 1930s and was rich and a psychopathic killer, I probably would be moving about very freely and having a lot of fun." 
    },
    {
        name: 'Thomas Pesquet',
        occupation: 'Astronaut',
        catchPhrase: 'Le plus grand obstacle à la réussite est l’autocensure'
    },
    {
        name: 'Clover',
        occupation: 'Spies',
        catchPhrase: 'Je ne peux pas croire que Jerry voulait transformer mon cerveau en micro-ondes'
    },
];

Celebrity.insertMany(celebrities)
.then(celebrityFromDB => console.log(`${celebrityFromDB.length} créés en base`))
.catch(err => console.log(err))