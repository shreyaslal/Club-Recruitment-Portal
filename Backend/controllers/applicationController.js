import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Position } from "../models/positionSchema.js";

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Club Convenor") {
        return next(new ErrorHandler("Club Convenor not allowed to access this resource.", 400));
    }

    const { name, rollno, email, whatsapp, interest, pastexperience, skillset, positions, clubname, positionId } = req.body;

    if (!positionId) {
        return next(new ErrorHandler("Recruitment Closed!", 404));
    }

    const positionDetails = await Position.findById(positionId);
    if (!positionDetails) {
        return next(new ErrorHandler("Position not found!", 404));
    }

    const studentID = {
        user: req.user._id,
        role: "Student",
    };

    const convenorID = {
        user: positionDetails.postedBy,
        role: "Club Convenor",
    };

    if (!clubname || !name || !rollno || !email || !whatsapp || !interest || !pastexperience || !skillset || !positions) {
        return next(new ErrorHandler("Please fill all fields.", 400));
    }

    const application = await Application.create({
        clubname,
        name,
        rollno,
        email,
        whatsapp,
        interest,
        pastexperience,
        skillset,
        positions,
        studentID,
        convenorID,
    });

    res.status(201).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});

export const convenorGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role !== "Club Convenor") {
        return next(new ErrorHandler("Only Club Convenors can access this resource.", 400));
    }

    const applications = await Application.find({ "convenorID.user": req.user._id });

    res.status(200).json({
        success: true,
        applications,
    });
});

export const studentGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role !== "Student") {
        return next(new ErrorHandler("Only Students can access this resource.", 400));
    }

    const applications = await Application.find({ "studentID.user": req.user._id });

    res.status(200).json({
        success: true,
        applications,
    });
});

export const studentDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Club Convenor") {
        return next(new ErrorHandler("Club Convenor not allowed to access this resource.", 400));
    }

    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
        return next(new ErrorHandler("Application not found!", 404));
    }

    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted!",
    });
});
