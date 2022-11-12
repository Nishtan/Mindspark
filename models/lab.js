const mongoose = require("mongoose");
const Slot = require("../models/slot");

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

labSchema.pre("save", async function (next) {
    if (this.__v == undefined) {
        let endOfWeek = new Date;
        //Just for testing purposes
        for (const key of Object.keys(this.availableSlots)) {
            if (this.availableSlots[key] == true) {
                const testslots = await Slot.create({ timings: key, lab: this._id, date: `${endOfWeek.getDate()}-${endOfWeek.getMonth()}-${endOfWeek.getFullYear()}`, capacityLeft: this.capacity });
            }
        }
        endOfWeek.setDate(endOfWeek.getDate() - endOfWeek.getDay() + 6);

        for (let day = new Date; day <= endOfWeek; day.setDate(day.getDate() + 1)) {
            for (const key of Object.keys(this.availableSlots)) {
                if (this.availableSlots[key] == true) {
                    const slot = await Slot.create({ timings: key, lab: this._id, date: `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`, capacityLeft: this.capacity });
                    console.log(slot);
                }
            }
        }
    }
    next();
});

const Lab = mongoose.model("Lab", labSchema);
module.exports = Lab;