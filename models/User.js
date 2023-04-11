const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    useremail: { type: String, required: true, unique: true },
    userpass: { type: String, required: true  },
    userrole: { type: String, required: true  },
    userimage: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    city: { type: String, required: false},
    postalcode: { type: String, required: false },
    phone: { type: String, required: false },
    userfeedbacks: [{ type: Object, required: true }],
    userproducts: [{ type: Object, required: true }],
    userorders: [{ type: Object, required: true }]
}); 

const modelSchema = model('User', schema);

module.exports = { User: modelSchema };