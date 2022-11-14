const Student = require("../models/student");
const { handleErrors } = require("../utils/errorHandler")
const { createToken } = require("../utils/tokenCreate");
const Lab = require("../models/lab");
const Slot = require("../models/slot");
const College = require("../models/college");

//Booking controleers
module.exports.labs_get = async (req, res) => {
    const labs = await Lab.find({});

    res.render("student/lab", { labs });
};

module.exports.slots_get = async (req, res) => {
    const { id } = req.params;
    const slots = await Slot.find({ lab: id });

    res.render("lab/slot", { slots });
};
module.exports.slots_book = async (req, res) => {
    const { id } = req.params;
    const studentid = res.locals.student.id;
    const slot = await Slot.findById(id);
    const student = await Student.findById(studentid);

    student.bookings.push(id);
    slot.students.push(studentid);
    slot.capacityLeft = slot.capacityLeft - 1;

    await student.save();
    await slot.save();

    res.redirect("/student/labs");
};

module.exports.bookings_get = async (req, res) => {
    const completeData = await Promise.all(res.locals.student.bookings.map(async (booking) => {
        let slot = await Slot.findById(booking._id);
        let lab = await Lab.findById(slot.lab);
        let college = await College.findById(lab.college);
        return { slot, lab, college };
    }));
    console.log(completeData);
    res.render("student/booking", { completeData })
};
//Profile controllers
module.exports.profile = (req, res) => {
    res.render("student/profile")
};

//Student Auth Routes
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
        const errors = handleErrors("Student", error)
        res.json({ errors });
    }
}

module.exports.register_get = (req, res) => {
    res.render("student/register");
};

module.exports.register_post = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const newStudent = await Student.create({ email, password, name });
        const token = createToken(newStudent._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
        res.status(201).json({ newStudent });

    } catch (error) {
        const errors = handleErrors("Student", error);
        res.json({ errors });
    }
}