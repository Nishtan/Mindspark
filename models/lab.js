const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deptName: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        rqeuired: true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College"
    },
    availableSlots: {
        '9am-10am': false,
        '10am-11am': false,
        '11am-12pm': false,
        '12pm-1pm': false,
        '1pm-2pm': false,
        '2pm-3pm': false,
        '3pm-4pm': false,
        '4pm-5pm': false
    },
    images: [{
        url: {
            type: String
        },
        filename: {
            type: String
        }
    }]
});

const Lab = mongoose.model("Lab", labSchema);
module.exports = Lab;