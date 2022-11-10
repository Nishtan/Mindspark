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
    slots: [{
        type: Schema.Types.ObjectId,
        ref: "Slot"
    }],
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