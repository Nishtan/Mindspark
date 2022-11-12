const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const collegeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter valid email"]
        //checks validation,error message
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum Password length is 6 characters'],
    },
    name: {
        type: String,
        required: [true, 'Please enter College name']
    },
    state: {
        type: String,
        required: [true, 'Please enter State']
    },
    city: {
        type: String,
        required: [true, 'Please specify city']
    },
    pincode: {
        type: String,
        required: [true, 'Please enter a valid Pincode']
    },
    labs: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab"
    }],
});

//Add hashing before saving in db
collegeSchema.pre("save", async function (next) {
    if (this.__v == undefined) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

collegeSchema.statics.login = async function (email, password) {
    const User = await this.findOne({ email });
    if (User) {
        const auth = await bcrypt.compare(password, User.password);
        if (auth) {
            return User;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};

const College = mongoose.model("College", collegeSchema);
module.exports = College;