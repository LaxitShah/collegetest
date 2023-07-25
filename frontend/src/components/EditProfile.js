import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from './MainComponent';
import UploadFile from './UploadFile';

const EditProfile = ({ user }) => {
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profile: ''
      });
      setImage(user.profile);
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile: image,
    }));

    axios
      .put(`${url}users/editProfile`, {
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profile: image,
      })
      .then((res) => setProfile(res.data.user))
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Edit Profile
      </h2>
      <div
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <img
          src={image}
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <form
        style={{
          display: 'grid',
          gridGap: '10px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="firstName" style={{ fontWeight: 'bold' }}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label htmlFor="lastName" style={{ fontWeight: 'bold' }}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label htmlFor="username" style={{ fontWeight: 'bold' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user ? user.username : profile.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

