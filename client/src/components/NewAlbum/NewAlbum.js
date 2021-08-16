import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const NewAlbum = ({ setDisplayNewAlbum }) => {
  const [serverResponse, setServerResponse] = useState(false);
  const [serverResponseMessage, setServerResponseMessage] = useState('');
  const [albumInfo, setAlbumInfo] = useState({
    albumImageUrl: '',
    albumName: 'ADHD - ADHD 7 [2019]',
    guestName: 'John Doe',
    email: 'john@doe.com',
  });
  const changeImage = () => {
    const url = prompt(
      'Which is the url of the cover image of this album?',
    );
    if (url && checkURL(url)) {
      setAlbumInfo({ ...albumInfo, albumImageUrl: url });
    } else {
      alert('Please enter a valid url for the cover image of the album');
    }
  };
  const checkURL = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
  const checkAlbumName = name => {
    return true;
  };
  const onChange = e => {
    setAlbumInfo({ ...albumInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!albumInfo.albumImageUrl) return changeImage();
    if (checkAlbumName(albumInfo.albumName)) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/guests', albumInfo, config);
      setServerResponse(true);
      setServerResponseMessage(res.data.msg);
    } else {
      alert(
        'Please enter the album name in this format: Artist - Album Name [Year of Release]',
      );
    }
  };
  return (
    <div className={styles.newAlbumDiv}>
      {serverResponse ? (
        <div>
          <span className={styles.serverResponseSpan}>
            {serverResponseMessage}
          </span>
          <Link to="/">
            <button onClick={() => setDisplayNewAlbum(false)}>
              Go back!
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.innerDiv}>
          {albumInfo.albumImageUrl ? (
            <img
              className={styles.albumImage}
              src={albumInfo.albumImageUrl}
            />
          ) : (
            <div
              onClick={() => {
                changeImage();
              }}
              className={styles.whiteAlbumCover}
            ></div>
          )}
          <figcaption
            onClick={() => {
              changeImage();
            }}
            className={styles.albumCaption}
          >
            Change Cover
          </figcaption>
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
            className={styles.newAlbumForm}
          >
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="albumName"
                type="text"
                placeholder={albumInfo.albumName}
                className={styles.inputField}
                required
              />
              <small> Album Info</small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="guestName"
                type="text"
                placeholder={albumInfo.guestName}
                className={styles.inputField}
                required
              />
              <small> Your Name</small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="email"
                type="email"
                placeholder={albumInfo.email}
                className={styles.inputField}
                required
              />
              <small> Email</small>
            </div>
            <button className={styles.submitBtn} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
