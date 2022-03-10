const {
    model,
    Schema,
    Types: { ObjectId },
} = require("mongoose");

const linkSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: ObjectId,
        required: true,
    },
});

module.exports = model("Link", linkSchema);
