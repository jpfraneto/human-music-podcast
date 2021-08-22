import { NewAlbum, Spinner } from 'components';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AlbumDisplay = () => {
  const [displayNewAlbum, setDisplayNewAlbum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState({
    albumImageUrl:
      'https://img.discogs.com/UOkoRRp9hPwM-1p1-XpLJIRvPJY=/fit-in/600x604/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-391322-1590457007-2317.jpeg.jpg',
    albumName: 'Pink Floyd - Animals [1977]',
    guestName: 'jpfraneto',
  });
  useEffect(() => {
    const getPresentAlbum = async () => {
      const res = await axios.get('/api/guests/present');
      setAlbum({ ...res.data });
    };
    getPresentAlbum();
  }, []);
  const toggleNewAlbum = e => {
    if (!displayNewAlbum)
      e.target.style.backgroundColor = 'rgb(174, 122, 223)';
    if (displayNewAlbum)
      e.target.style.backgroundColor = 'rgb(39, 95, 160)';
    setDisplayNewAlbum(!displayNewAlbum);
  };
  const today = new Date();
  return (
    <div>
      <div className={styles.albumOfTheDay}>
        {!displayNewAlbum ? (
          <div className={styles.albumDiv}>
            <img className={styles.albumImage} src={album.albumImageUrl} />
            <figcaption className={styles.todayDate}>
              {today.toUTCString().slice(0, -13)}
            </figcaption>
            <h3 className={styles.albumTitle}>
              <strong>{album.albumName} </strong>
            </h3>
            <small>
              <Link
                className={styles.guestNameStyle}
                to={{
                  pathname: `http://www.instagram.com/${album.guestName}`,
                }}
                target="_blank"
              >
                @{album.guestName}{' '}
              </Link>
            </small>
          </div>
        ) : (
          <NewAlbum setDisplayNewAlbum={setDisplayNewAlbum} />
        )}
      </div>
      <button
        onClick={e => {
          toggleNewAlbum(e);
        }}
        className={styles.newAlbum}
      >
        {!displayNewAlbum ? 'Add Album Of The Day*' : 'Thank you'}
      </button>
      <br />
      {displayNewAlbum ? (
        <small className={styles.newAlbumMessage}>
          * Every week I'll choose randomly a person to interview in the
          podcast from all the ones that have shared albums here.
        </small>
      ) : (
        <small className={styles.newAlbumMessage}>
          * Every day I will hold the space for listening through the album
          of the day at 5AM EST on the following{' '}
          <Link
            to={{ pathname: 'https://us02web.zoom.us/j/86439135013' }}
            target="_blank"
            className={styles.zoomMeeting}
          >
            Zoom Room
          </Link>
          . The password is 123456, see you in there!
        </small>
      )}
    </div>
  );
};
