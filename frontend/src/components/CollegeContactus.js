import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from './MainComponent';

function CollegeContactus({ isAdmin }) {
  const { collegeId } = useParams();
  const [college, setInfo] = useState();

  useEffect(() => {
    axios
      .get(`${url}college/${collegeId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      {college ? (
        <>
          <h2 className="text-center mb-5">Contact Us</h2>

          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <iframe
                title="college-location"
                style={{ width: '100%', height: '320px', border: '0' }}
                src={`https://maps.google.com/maps?q=${college.Location.lat},${college.Location.lng}&hl=es&z=14&amp;output=embed&output=embed`}
              ></iframe>
              <br />
              <small>
                <a
                  href={`https://maps.google.com/maps?q=${college.Location.lat},${college.Location.lng}&hl=es&z=14&amp;output=embed&output`}
                  style={{ color: '#0000FF', textAlign: 'left' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here for Full Screen
                </a>
              </small>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card p-4">
                <h3 className="card-title mb-4">{college.name}</h3>
                <div className="card-text">
                  <div className="mb-3">
                    <strong>Address:</strong> {college.address}
                  </div>
                  <div className="mb-3">
                    <strong>City:</strong> {college.city}
                  </div>
                  <div className="mb-3">
                    <strong>Zip:</strong> {college.zip}
                  </div>
                  <div className="mb-3">
                    <strong>State:</strong> {college.state}
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> {college.email}
                  </div>
                  <div className="mb-3">
                    <strong>Phone:</strong> {college.phoneNo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CollegeContactus;