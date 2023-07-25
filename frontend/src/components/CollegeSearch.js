import React, { useEffect, useState } from 'react';

import axios from 'axios';
import SearchComp from './SearchComp';
import '../CSS/collegeList.css';
import { url } from './MainComponent';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Col, Row } from 'react-bootstrap';

function CollegeSearch(props) {
  const [data, setData] = useState();
  const [name, setName] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    axios.get(`${url}college`).then((res) => {
      setColleges(res.data);
      setFilteredColleges(res.data);
    }).catch((err) => console.log(err));

    axios.get(`${url}course/`).then((res) => {
      setCourseOptions(res.data);
    }).catch((err) => console.log(err));
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCourseFilter = (selectedCourse) => {
    setSelectedCourses(selectedCourse);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (selectedCourses === '') {
      setFilteredColleges(colleges);
    } else {
      axios.get(`${url}course/${selectedCourses}`).then((res) => {
        const filteredCourseColleges = res.data.college;
        setFilteredColleges(filteredCourseColleges);
      }).catch((err) => console.log(err));
    }
  }, [selectedCourses, colleges]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#DBE2E9' }}>
      <div>
        <table style={{ width: '100%' }}>
          <tbody>
            <Row>
              <Col className='' style={{ textAlign: 'right', padding: '10px' }}>
                <label className="filter-label mt-2" htmlFor="course-filter">
                 <b  style={{fontSize:"100%"}}> Filter by Course</b>
                </label>
              </Col>
              <Col style={{ textAlign: 'left',padding: '10px' }}>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    {selectedCourses ? selectedCourses : 'All Courses'}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => handleCourseFilter('')}>
                      All Courses
                    </DropdownItem>
                    {courseOptions.map((course) => (
                      <DropdownItem
                        key={course._id}
                        onClick={() => handleCourseFilter(course.courseName)}
                      >
                        {course.courseName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          </tbody>
        </table>

        {filteredColleges.length > 0 ? (
          <div>
            {filteredColleges.map((college) => (
              <div key={college._id}>
                <SearchComp collegeId={college._id} />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center" style={{ height: '300px', color: 'gray', marginTop: '200px', fontWeight: 'bold' }}>
            No Colleges Found
          </h1>
        )}
      </div>
    </div>
  );
}

export default CollegeSearch;
