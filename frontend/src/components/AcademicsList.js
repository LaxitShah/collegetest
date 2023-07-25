import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import axios from 'axios';
import { headers, url } from './MainComponent';
import Academics from './Academics';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

const AcademicsList = ({ isAdmin }) => {
  const [Course, setCourse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newImg, setNewImg] = useState("");
  const { collegeId } = useParams();
  const [imgErr, setImgErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [feeErr, setFeeErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [durationErr, setDurationErr] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);

  // Fetch course options and update the dropdown only on mount
  useEffect(() => {
    axios.get(`${url}course/`)
      .then((res) => {
        setCourseOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Course]);

  // Fetch college courses and update the dropdown after deleting a course
  useEffect(() => {
    axios.get(url + "college/" + collegeId + "/academics")
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const delComp = (id,courseName) => {
    axios
      .delete(`${url}college/${collegeId}/academics/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
      axios.delete(`${url}course/${courseName}/${collegeId}`)
      .then((res)=>{
        console.log(res);
      })
  };

  const checkData = (Name, Desc, fees, imageUrl, duration, cb) => {
    checkTItle(Name);
    checkFees(fees);
    checkDescription(Desc);
    checkDuration(duration);
    checkImg(imageUrl);
    if (titleErr || descriptionErr || feeErr || durationErr || imgErr) cb(true);
    else cb(false);
  };

  const checkTItle = (val) => {
    if (val === "" || val === null) setTitleErr("Course Name is required");
    else setTitleErr("");
  };

  const checkFees = (val) => {
    const regex = new RegExp(/[^0-9]/, 'g');
    if (val === "") setFeeErr("Fee is required");
    else if (isNaN(val)) setFeeErr("Fee is not a number");
    else setFeeErr("");
  };

  const checkDescription = (val) => {
    if (val === "" || val === null) setDescriptionErr("Course description is required");
    else setDescriptionErr("");
  };

  const checkDuration = (val) => {
    if (val === "" || val === null) setDurationErr("Course duration is required");
    else setDurationErr("");
  };

  const checkImg = (val) => {
    if (val === "" || val === null) setImgErr("image is required");
    else setImgErr("");
  };

  const addCourse = (e) => {
    e.preventDefault();
    const Name = e.target.elements.Name.value;
    const Desc = e.target.elements.Content.value;
    const fees = e.target.elements.fees.value;
    const imageUrl = newImg;
    const duration = e.target.elements.duration.value;
    checkData(Name, Desc, fees, imageUrl, duration, (err) => {
      if (!err) {
        axios
          .post(`${url}college/${collegeId}/academics`, {
            courseName: Name,
            courseDescription: Desc,
            fees: fees,
            imageUrl: imageUrl,
            duration: duration,
          })
          .then((res) => {
            setCourse(res.data);
            axios
              .post(`${url}course/${Name}`, { _id: collegeId })
              .then((res) => {
                console.log(`College added successfully into the ${Name} course`);
              })
              .catch((err) => console.log(err));
            setNewImg("");
          })
          .catch((Err) => console.log(Err));

        setIsOpen(false);
      }
    });
  };

  const changeNewImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "my-uploads");
    formData.append("API_SECRET", "N6vRi9M2b8Tfwsesw1CLLQzzeHA");
    axios
      .post("https://api.cloudinary.com/v1_1/dofftzsmf/image/upload", formData)
      .then((res) => {
        setNewImg(res.data.url);
        setImgErr("");
      })
      .catch((Err) => {
        console.log(Err);
        setImgErr("Invalid format");
      });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={() => {
          setIsOpen(false);
          setTitleErr("");
          setDescriptionErr("");
          setDurationErr("");
          setFeeErr("");
          setImgErr("");
          setNewImg("");
        }}
        width="500px"
      >
        <ModalHeader toggle={() => setIsOpen(false)} >
          Upload Course
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <div className="col-6">
              <Input type="file" onChange={(event) => changeNewImage(event)} />
              <img src={newImg} className="mt-3" height="85%" width="100%" />
              {imgErr && <p className="text-danger">{imgErr}</p>}
            </div>
            <div className="col-6">
              <Form onSubmit={(e) => addCourse(e)}>
                <Input
                  type="select"
                  name="Name"
                  onChange={(e) => {
                    if (titleErr !== "" || titleErr !== null) checkTItle(e.target.value);
                  }}
                  style={{ width: "100%" }}
                >
                  <option value="">Select Course</option>
                  {courseOptions.filter((option) => !Course.find((course) => course.courseName === option.courseName)).map((course) => (
                    <option key={course._id} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))}
                </Input>
                {titleErr && <p className="text-danger">{titleErr}</p>}
                <br></br>
                <br></br>
                <Input
                  type="textarea"
                  name="Content"
                  onChange={(e) => {
                    if (descriptionErr !== "" || descriptionErr !== null) checkDescription(e.target.value);
                  }}
                  placeholder="Enter the Description"
                  rows="8"
                  style={{ width: "100%" }}
                  className="my-auto"
                />
                {descriptionErr && <p className="text-danger">{descriptionErr}</p>}
                <div className="row">
                  <Input
                    type="text"
                    className="col-4 mx-auto mt-2"
                    onChange={(e) => {
                      if (feeErr !== "" || feeErr !== null) checkFees(e.target.value);
                    }}
                    height={"90px"}
                    name="fees"
                    placeholder="fees"
                  />
                  {feeErr && <p className="text-danger">{feeErr}</p>}
                  <Input
                    type="number"
                    max={7}
                    min={1}
                    onChange={(e) => {
                      if (durationErr !== "" || durationErr !== null) checkDuration(e.target.value);
                    }}
                    className="col-4 mx-auto"
                    name="duration"
                    placeholder="duration"
                  />
                  {durationErr && <p className="text-danger">{durationErr}</p>}
                </div>
                <Button type="submit" color="primary" className="mx-auto mt-4">
                  Add Component
                </Button>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <h2 className="text-center mt-3">Our Courses</h2>
      <div className="row">
        <div className="col-2">
          {isAdmin && (
            <Button className='text-center' style={{marginLeft:"5%"}} color="primary" onClick={() => setIsOpen(true)}>
              <FaPlus size={20} />
            </Button>
          )}
        </div>
        {Course &&
          Course.map((course) => {
            return <Academics isAdmin={isAdmin} collegeId={collegeId} id={course._id} delComp={delComp} {...course} />;
          })}
      </div>
    </>
  );
};

export default AcademicsList;
