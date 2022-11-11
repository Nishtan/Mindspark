const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
    date: String,
    timings: String,
    lab: {
        type: Schema.Types.ObjectId,
        ref: "Lab"
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    capacityLeft: Number
})

module.exports = mongoose.model("Slot", slotSchema);