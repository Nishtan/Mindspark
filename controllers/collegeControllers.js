const College = require("../models/college");
const Lab = require("../models/lab");
const Slot = require("../models/slot");
const { handleErrors } = require("../utils/errorHandler")
const { createToken } = require("../utils/tokenCreate");
const { availableSlots } = require("../utils/slotsCreate")


//Booking controllers
module.exports.bookings_get = async (req, res) => {
    const { id } = req.params;
    const slots = await Slot.find({ lab: id }).populate("lab").populate("students").exec();
    res.render("lab/booking", slots);
};
//Lab controllers
module.exports.labs_get = async (req, res) => {
    const college = await College.findById(res.locals.college).populate("labs");

    res.render("lab/index", { labs: college.labs });
};
module.exports.labs_new = (req, res) => {
    res.render("lab/new");
};

module.exports.labs_post = async (req, res) => {
    const images = req.files.map(e => ({ url: e.path.replace("/upload", "/upload/w_241,h_164,c_scale"), filename: e.filename }));
    const { name, deptName, capacity, slots } = req.body;
    const college = await College.findById(res.locals.college);
    for (slot of slots) {
        availableSlots[slot] = true;
    }
    const lab = await Lab.create({ name, deptName, images, capacity: parseInt(capacity), college: res.locals.college, availableSlots });

    college.labs.push(lab);

    await college.save();

    res.redirect("/college/labs");
};

// Profile Controllers

module.exports.profile = (req, res) => {
    res.render("college/profile")
};

// Authentication Controllers

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
        const errors = handleErrors("College", error)
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
        const errors = handleErrors("College", error);
        res.json({ errors });
    }
};