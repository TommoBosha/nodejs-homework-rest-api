const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
        minlength: 5,
        maxength: 30,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
},
    { versionKey: false, timestamps: true }
);

const ContactModel = mongoose.model("contact", contactSchema);

module.exports = {
    ContactModel,
};
