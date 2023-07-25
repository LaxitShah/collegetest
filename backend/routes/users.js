var express = require('express');
var router = express.Router();
var passport = require('passport');
var BodyParser = require('body-parser');
// const cors=require('cors');
const User = require('../models/user');
const authenticate = require('../authenticate');
// const  cors  = require('../cors');
const nodemailer = require('nodemailer');
// router.use(cors())

router.use(BodyParser.json())
/* GET users listing. */

// router.put('/', (req,res,next) => {

// })

router.get('/login', function (req, res, next) {
  res.send('respond with a resource');
});
router.put('/update-password', (req, res, next) => {
  // Find the user by their username
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Internal server error', err: err });
      return;
    }
    if (!user) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'User not found' });
      return;
    }

    // Update the password
    user.setPassword(req.body.newPassword, (err, updatedUser) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Internal server error', err: err });
        return;
      }

      // Save the updated user
      updatedUser.save((err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: false, status: 'Internal server error', err: err });
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Password updated successfully' });
      });
    });
  });
});



router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: "Log in Unsuccessfull", err: info })
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: "Log in Unsuccessfull", err: 'Could not log in user!' })
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, status: 'Login Successful!', user: user, token: token });
    })
  })(req, res, next)

})

router.get('/checkJWTtoken', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'jwt invalid!', success: false, err: info });
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'jwt valid!', success: true, user: user });

    }
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  console.log("***-->"+req.body.profile);
  User.register(new User({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastNam,profile:req.body.profile }),
    req.body.password, (err, user) => {

      if (err) {
        var error = new Error(err)
        console.log(error)
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.send({ success: false, status: 'Registration Unsuccessful!', err: err });
        return
      }
      else {

        user.save()
          .then(user => {


            passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: true, status: 'Registration Successful!' });
            })

          }
          )
      }
    })
})


router.post('/:userId/follow', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        if (user.followedColleges.indexOf(req.body.collegeId) === -1) {
          user.followedColleges.push(req.body.collegeId)
          user.save()
            .then((user) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(user);
            }, err => next(err))
        }
        else{
          user.followedColleges.pull(req.body.collegeId)
          user.save()
            .then((user) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(user);
            }, err => next(err))
        }
      }
    })
})

router.put('/:userId/unfollow', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {

        user.followedColleges.pull(req.body.collegeId)
        user.save()
          .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
          }, err => next(err))
      }
    })
})

router.get('/followedcolleges', authenticate.verifyUser, (req, res, next) => {

  User.findById(req.user._id)
    .then((user) => {
      res.statusCode = 200;
      res.json(user.followedColleges);

    }).catch((err) => next(err))
})

router.get('/createdcolleges', authenticate.verifyUser, (req, res, next) => {

  User.findById(req.user._id)
    .then((user) => {
      res.statusCode = 200;
      res.json(user.createdColleges);

    }).catch((err) => next(err))
})


router.post("/checkMail", (req, res, next) => {
  User.find({username: req.body.mail} )
    .then((user) => {
      if (user!="") {

        console.log(user)
        res.json(true);
      }
      else {
        res.json(false);
      }

    })
  
})

router.put("/editProfile", (req, res, next) => {

  const userId = req.body.id;
  const updates = {};
  
  if (req.body.firstName) {
    updates.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    updates.lastName = req.body.lastName;
  }
  if (req.body.profile) {
    updates.profile = req.body.profile;
  }
  console.log(req.body)
  console.log(req.body.username)
  User.findOneAndUpdate({username:req.body.username}, updates, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json({
          message: 'Profile updated successfully',
          user: updatedUser,
        });
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: 'Failed to update profile',
        error: error.message,
      });
    });
});
router.post("/sendMail", (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "collegeweb1@gmail.com",
      pass: "cbjcmruipixhncld"
    }
  });

  console.log(req.body.mail); // Corrected variable name

  const mailOptions = {
    from: req.body.mail,
    to: "collegeweb1@gmail.com",
    subject: "Contact Us Form Submission",
    text:   
  `From: ${req.body.name}
    Message:    
    ${req.body.Description}

    Please respond to the sender at their provided email address: ${req.body.mail}.
    Thank you for your attention to this matter.
    
    Best regards,
    CollegeWeb
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ message: "Error sending the email." });
    } else {
      res.status(200).json({ message: "Email sent successfully." });
    }
  });
});
router.post("/getOtp", (req, res, next) => {


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "collegeweb1@gmail.com",
      pass: "cbjcmruipixhncld"
    }
    
  })
  console.log(req.body.mail)
  const val = Math.floor(1000 + Math.random() * 9000);
  console.log(val)
  const option = {
    from: "sourcecodefor@gmail.com",
    to: req.body.mail,
    // to:"darshanparmar2002@gmail.com",
    subject: "CollegeWeb OTP",
    text: `Your login OTP is:

    ${val}
    
    This OTP is confidential. For security reasons, DO NOT share the OTP with anyone.    
    collegeWeb takes your account security very seriously. 
    collegeWeb will never email you and ask you to disclose or verify your CollegeWeb password, credit card, or banking account number. 
    If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to collegeWeb for investigation.
    
    We hope to see you again soon.
    Best Regards,
    Team CollegeWeb`,
  };

  transporter.sendMail(option, function (err, info) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      console.log(val)
      console.log("err")
      res.json(val)
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(val)
    }
  })


})

module.exports = router;
