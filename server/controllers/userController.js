const User = require("../models/userModel");
const path = require('path');
const fs = require('fs');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const authController = require("./authController")

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).send(users)

});

exports.becomePerformer = catchAsync(async (req, res) => {
  const userId = await authController.decodeToken(req.body.jwt);
  const object = {
    ...req.body.formObject,
    role: "performer"
  }

  const user = await User.findByIdAndUpdate(userId, object, { new: true });

  res.status(201).json({
    status: "success"
  });
});

exports.getLoggedInUser = catchAsync(async(req, res) => {
    const userId = await authController.decodeToken(req.params.token);
    const user = await User.findById(userId);

  res.status(200).json({
    status: "success",
    user
  });
});


exports.uploadPicture = catchAsync(async (req, res, next) => {

  // Update user document with the new profile picture URL
  const user = await User.findByIdAndUpdate(
    req.params.uid,
    {
      img: {
        data: fs.readFileSync(path.join(__dirname, '../../client/public/images/profile', req.file.filename)),
        contentType: 'image/png'

      }
    }
  );
  res.status(200).json({
    status: 'success',
    user
  });
});

// Get profile picture
exports.getUserPicture = catchAsync(async (req, res, next) => {

  const userId = req.params.uid;
  const user = await User.findById(userId);
  if (!user || !user.img || !user.img.data) {
    return res.status(404).json({ error: 'User image not found' });
  }
  res.set('Content-Type', user.img.contentType);
  res.send(user.img.data);

});



  exports.getNotVerifiedUsers = catchAsync(async (req, res) => {
    const users = await User.find({ verified: false });

    res.status(200).send(users)
  });

  exports.verifyUser = catchAsync(async (req, res, next) => {

    const id = req.params.uid;
    const verify = req.body.verify;

    const updatedUser = await User.updateOne({ _id: id }, { 'verified' : verify});

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      updatedUser
    });
  });


  



