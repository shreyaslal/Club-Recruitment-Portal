import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, "Please provide the club name."],
    minLength: [3, "Club name must contain at least 3 characters."],
    maxLength: [50, "Club name cannot exceed 50 characters."],
  },
  category: {
    type: String,
    enum: ["Technical", "Cultural", "Sports", "Social", "Literary", "Music", "Dance", "Art", "Other"],
    required: [true, "Please provide the category."],
  },
  shortDescription: {
    type: String,
    required: [true, "Please provide a short description."],
    minLength: [10, "Short description must contain at least 10 characters."],
    maxLength: [300, "Short description cannot exceed 300 characters."],
  },
  longDescription: {
    type: String,
    maxLength: [1000, "Long description cannot exceed 1000 characters."],
  },
  positions: [{
    positionName: {
      type: String,
      required: true,
      minLength: [3, "Position name must contain at least 3 characters."],
      maxLength: [50, "Position name cannot exceed 50 characters."],
    },

  }],
  convenorEmail: {
    type: String,
    required: [true, "Please provide the convenor's email."],
  },
  convenorPhone: {
    type: String,
    required: [true, "Please provide the convenor's phone number."],
  },
  clubEmail: {
    type: String,
    required: [true, "Please provide the club's official email."],
  },
  clubWebsite: {
    type: String,
  },
  socialMediaLinks: {
    type: [String],
  },
  recruitmentType: {
    type: String,
    enum: ["Open", "Exclusive"],
    required: [true, "Please specify the recruitment type (Open or Exclusive)."],
  },
  recruitmentRounds: {
    type: Number,
    required: [true, "Please specify the number of recruitment rounds."],
  },
  recruitmentProcessOverview: {
    type: String,
    required: [true, "Please provide an overview of the recruitment process."],
    minLength: [30, "Recruitment process overview must contain at least 30 characters."],
  },
  recruitmentSchedule: {
    type: String,
    required: [true, "Please provide the recruitment schedule."],
  },
  testLinks: {
    type: [String],
  },
  maxApplicants: {
    type: Number,
  },
  SIGName: {
    type: String,
  },
  SIGDescription: {
    type: String,
    maxLength: [500, "SIG description cannot exceed 500 characters."],
  },
  SIGConvenorContact: {
    type: String,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  positionPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Position = mongoose.model("Position", positionSchema);
