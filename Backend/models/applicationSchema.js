import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    clubname: {
        type: String,
        required: [true, "Please enter the club name!"],
        minLength: [3, "Club name must contain at least 3 characters!"],
        maxLength: [30, "Club name cannot exceed 30 characters!"],
    },
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        minLength: [3, "Name must contain at least 3 characters!"],
        maxLength: [30, "Name cannot exceed 30 characters!"],
    },
    rollno: {
        type: String,
        required: [true, "Please enter your roll number!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    whatsapp: {
        type: String,
        required: [true, "Please enter your WhatsApp number!"],
        validate: {
            validator: v => /^\d{10}$/.test(v),
            message: "WhatsApp number must be a 10-digit number!"
        },
    },
    interest: {
        type: String,
        required: [true, "Please explain why you are interested in joining!"],
    },
    pastexperience: {
        type: String,
        required: [true, "Please describe your relevant past experience!"],
    },
    skillset: {
        type: String,
        required: [true, "Please specify your skillset!"],
    },
    studentID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Student"],
            required: true,
        },
    },
    convenorID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Club Convenor"],
            required: true,
        },
    },
    positions: {
        type: String,
        required: [true, "Please enter the position you want to apply to!"],
    },
}, {
    timestamps: true,
});

export const Application = mongoose.model("Application", applicationSchema);