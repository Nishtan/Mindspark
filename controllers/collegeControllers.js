const College = require("../models/college");
const { handleErrors } = require("../utils/errorHandler")
const { createToken } = require("../utils/tokenCreate");

module.exports.profile = (req, res) => {
    res.render("college/profile")
};

module.exports.login_get = (req, res) => {
    res.render("college/login");
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const college = await College.login(email, password);
        const token = createToken(college._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ college: college._id });

    } catch (error) {
        const errors = handleErrors("college", error)
        res.json({ errors });
    }
};

module.exports.register_get = (req, res) => {
    res.render("college/register");
};
module.exports.regsiter_post = async (req, res) => {
    const { name, email, password, pincode, state, city } = req.body;

    try {
        const newCollege = await College.create({ name, email, password, pincode, state, city });
        const token = createToken(newCollege._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
        res.status(201).json({ newCollege });

    } catch (error) {
        const errors = handleErrors("college", error);
        console.log("errors are ", errors);
        res.json({ errors });
    }
};