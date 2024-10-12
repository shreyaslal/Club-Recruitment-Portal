import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Position } from "../models/positionSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllPositions = catchAsyncError(async (req, res, next) => {
  const positions = await Position.find({ expired: false });
  res.status(200).json({
    success: true,
    positions,
  });
});

export const postPosition = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(new ErrorHandler("Student not allowed to access this resource.", 400));
  }

  const {
    clubName,
    category,
    shortDescription,
    longDescription,
    convenorEmail,
    convenorPhone,
    clubEmail,
    clubWebsite,
    socialMediaLinks,
    position,
    recruitmentType,
    recruitmentRounds,
    recruitmentProcessOverview,
    recruitmentSchedule,
    testLinks,
    maxApplicants,
    SIGName,
    SIGDescription,
    SIGConvenorContact,
  } = req.body;

  if (!clubName || !category || !shortDescription || !convenorEmail || !convenorPhone || !clubEmail || !recruitmentType || !recruitmentRounds || !recruitmentProcessOverview || !recruitmentSchedule || !position) {
    return next(new ErrorHandler("Please provide all required fields.", 400));
  }

  const postedBy = req.user._id;
  const newPosition = await Position.create({
    clubName,
    category,
    shortDescription,
    longDescription,
    convenorEmail,
    convenorPhone,
    clubEmail,
    clubWebsite,
    socialMediaLinks,
    position,
    recruitmentType,
    recruitmentRounds,
    recruitmentProcessOverview,
    recruitmentSchedule,
    testLinks,
    maxApplicants,
    SIGName,
    SIGDescription,
    SIGConvenorContact,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Recruitments Announced!",
    position: newPosition,
  });
});

export const getMyPositions = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(new ErrorHandler("Student not allowed to access this resource.", 400));
  }

  const myPositions = await Position.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myPositions,
  });
});

export const updatePosition = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(new ErrorHandler("Student not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  let position = await Position.findById(id);
  if (!position) {
    return next(new ErrorHandler("Position not found.", 404));
  }

  position = await Position.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Recruitment Details Updated!",
    position,
  });
});

export const deletePosition = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(new ErrorHandler("Student not allowed to access this resource.", 400));
  }

  const { id } = req.params;
  const position = await Position.findById(id);
  if (!position) {
    return next(new ErrorHandler("Position not found.", 404));
  }

  await position.deleteOne();
  res.status(200).json({
    success: true,
    message: "Recruitments Closed!",
  });
});

export const getSinglePosition = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const position = await Position.findById(id);
    if (!position) {
      return next(new ErrorHandler("Position not found.", 404));
    }
    res.status(200).json({
      success: true,
      position,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
