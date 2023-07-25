const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const Course = require('../models/course');
const Colleges = require('../models/college');

var courseRouter = express.Router();

courseRouter.use(bodyParser.json());

courseRouter.route('/')
    .get((req, res, next) => {
        Course.find({}).then((course) => {  
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(course);
        }, (err) => next(err));
    })
    .post((req, res, next) => {

        Course.create(req.body)

            .then((course) => {
                console.log('Course Created ', course);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(course);
            })
            .catch((err) => {
                console.log(err);
                // next(err);
            })});
courseRouter.route('/:courseName')
            .get((req, res, next) => {
                Course.findOne({ courseName: req.params.courseName })
                .populate('college')
                .then((course) => {
                    if (course != null) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');

                        const college=course.college.map(col=>({"_id":col._id,"c_name":col.name,"c_city":col.city,"c_state":col.state}))

                        res.json({"couseName":course.courseName,college});
                    } else {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ error: 'Course not found' });
                    }
                })
                .catch((err) => next(err));
            })        
        .post((req, res, next) => {
        Course.findOne({courseName:req.params.courseName})
        .then((course)=>{
            if(course!=null){
                course.college.push(req.body._id);
                course.save()
                .then((course)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.json(course);
                })
            }
            else{
                res.statusCode=404;
                res.setHeader('Content-Type','application/json');
                res.json(course);
            }
        }
        )})

courseRouter.route('/:courseName/:collegeId')
.delete((req,res,next)=>{
  Course.findOne({ courseName: req.params.courseName })
    .then((course) => {
      if (course !== null) {
        const collegeIdToDelete = req.params.collegeId; // Assuming the collegeId is sent in the request body

        // Filter out the college from the course's college array
        course.college = course.college.filter((col) => col != collegeIdToDelete);

        course.save()
          .then((updatedCourse) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedCourse);
          })
          .catch((err) => next(err));
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Course not found' });
      }
    })
    .catch((err) => next(err));
});


module.exports=courseRouter;