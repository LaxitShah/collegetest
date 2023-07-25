import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { token, url } from './MainComponent';

function SearchComp({ collegeId, Followed, user_id, handleDelete }) {
  const [collegeName, setCollegeName] = useState('');
  const [collegeCity, setCollegeCity] = useState('');
  const [collegeState, setCollegeState] = useState('');
  const [collegeLogo, setCollegeLogo] = useState('');
  const [collegeFollowers, setCollegeFollowers] = useState(0);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    axios.get(`${url}college/${collegeId}`)
      .then((res) => {
        setCollegeName(res.data.name);
        setCollegeCity(res.data.city);
        setCollegeLogo(res.data.logo);
        setCollegeState(res.data.state);
        setCollegeFollowers(res.data.followers);

        if (Followed && Followed.findIndex((college) => college === collegeId) !== -1)
          setIsFollow(false);
        else
          setIsFollow(true);
      })
      .catch((err) => alert(err));
  }, [collegeId, Followed]);

  function handleFollow() {
    if (user_id) {
      axios.get(`${url}college/${collegeId}/follow`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then((res) => {
          if (res.data.user.followedColleges.indexOf(collegeId) === -1)
            setIsFollow(false);
          else
            setIsFollow(true);
          setCollegeFollowers(res.data.college.followers);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className='row' style={{ cursor: 'pointer', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', borderBottom: '0px solid #000080', borderTop: '1px solid #000080' }}>
      <Link className='nav-link col-lg-10 col-9 d-flex' to={`/colleges/${collegeId}/`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className='col-md-2 col-lg-1 col-3 ms-md-2'>
          <img src={collegeLogo} className='border mx-auto my-auto' style={{ borderRadius: '100%', width: '70px', height: '70px' }} alt='College Logo' />
        </div>
        <div className='text-dark fs-5 ms-lg-3 col-8 col-lg-10  overflow-hidden'>
          <b style={{ fontSize: '100%' ,fontWeight:"100vw"}}>{collegeName}</b>
          <p style={{  fontSize: '100%' }}>{collegeCity}, {collegeState}</p>
        </div>
      </Link>
      {Followed &&
        <div className='col-3 col-lg-2 mt-2 mr-sm-2 mr-lg-0'>
          {!isFollow ?
            <button onClick={handleFollow} className='btn text-capitalize btn-md border' style={{ backgroundColor: '#000', borderRadius: '5px', color: '#fff', transition: 'background-color 0.3s ease', outline: 'none', cursor: 'pointer', boxShadow: '0 0 3px grey' }}>
              Follow
            </button> :
            <button onClick={handleFollow} className='btn text-capitalize btn-md border' style={{ backgroundColor: '#000', borderRadius: '5px', color: '#fff', transition: 'background-color 0.3s ease', outline: 'none', cursor: 'pointer', boxShadow: '0 0 3px grey' }}>
              Following
            </button>
          }
          <style>
            {`
            @media (max-width: 768px) {
              .btn {
                font-size: 14px;
                padding: 8px 16px;
              }
            }
            @media (max-width: 480px) {
              .btn {
                font-size: 12px;
                padding: 6px 12px;
              }
            }
            `}
          </style>
        </div>
      }
      {handleDelete &&
        <div className='col-3 col-lg-2 mt-2 ms-auto'>
          <button style={{ borderTop: 0 }} onClick={() => handleDelete(collegeId)} className='btn btn-md btn-danger'>Delete</button>
        </div>
      }
    </div>
  );
}

export default SearchComp;
