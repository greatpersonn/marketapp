const { Schema, model } = require('mongoose');

const schema = new Schema({
    productname: { type: String, required: true, unique: true },
    productkey: { type: String, required: true, unique: true },
    productprice: { type: String, required: true  },
    productdesc: { type: String, required: true  },
    productimage: { type: String, required: true },
    productfeedback: { type: String, required: true },
    added: { type: String, required: true },
});

const modelSchema = model('Product', schema);

module.exports = { Product: modelSchema };