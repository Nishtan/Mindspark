const Student = require("../models/student");
const { handleErrors } = require("../utils/errorHandler")
const { createToken } = require("../utils/tokenCreate");

module.exports.profile = (req, res) => {
    res.render("student/profile")
};

module.exports.login_get = (req, res) => {
    res.render("student/login");
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.login(email, password);
        const token = createToken(student._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ student: student._id });

    } catch (error) {
        const errors = handleErrors("student", error)
        res.json({ errors });
    }
}

module.exports.register_get = (req, res) => {
    res.render("student/register");
};
module.exports.register_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newStudent = await Student.create({ email, password });
        const token = createToken(newStudent._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
        res.status(201).json({ newStudent });

    } catch (error) {
        const errors = handleErrors("student", error);
        res.json({ errors });
    }
}