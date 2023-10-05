const {model, Schema} = require('mongoose');

let testschema = new Schema({

    DiscordID: Number,
    Data: Object

})

module.exports = model('testschema', testschema)