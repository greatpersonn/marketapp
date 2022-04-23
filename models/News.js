const { Schema, model } = require('mongoose');

const schema = new Schema({
    newsheader: { type: String, required: true, unique: true },
    newstitle: { type: String, required: true },
    newscontent: { type: String, required: true  },
    newsimage: { type: String, required: true  },
    newsauthor: { type: String, required: true },
    newsdate: { type: String, required: true }
});

const modelSchema = model('News', schema);

module.exports = { News: modelSchema };