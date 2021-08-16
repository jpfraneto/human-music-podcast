import { NewAlbum } from 'components/NewAlbum';
import React, { useState } from 'react';
import styles from './styles.module.css';

export const AlbumDisplay = () => {
  const [displayNewAlbum, setDisplayNewAlbum] = useState(false);
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
            <img
              className={styles.albumImage}
              src="https://img.discogs.com/9ZSexElNruM-n8meGhXWuP7ehJs=/fit-in/600x553/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13001210-1546205820-4603.jpeg.jpg"
            />
            <figcaption className={styles.todayDate}>
              {today.toUTCString().slice(0, -13)}
            </figcaption>
            <h3>
              <strong>Yaima - Meditations [1999]</strong>
            </h3>
            <small>Jorge Pablo Franetovic</small>
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
        Add Album Of The Day*
      </button>
      <br />
      {displayNewAlbum && (
        <small className={styles.newAlbumMessage}>
          *Every week I'll choose randombly a person to interview in the
          podcast from all the ones that have shared albums here.
        </small>
      )}
    </div>
  );
};
