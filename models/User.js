const {
    model,
    Schema,
    Types: { ObjectId },
} = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    links: {
        default: [],
        type: [ObjectId],
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = model("User", userSchema);
