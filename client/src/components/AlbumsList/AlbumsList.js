import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

export const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [randomAlbum, setRandomAlbum] = useState({});
  useEffect(() => {
    const getAlbums = async () => {
      const albums = await axios.get('/api/guests/all');
      console.log('The albums were retrieved', albums);
      setAlbums(albums.data.albums);
    };
    getAlbums();
  }, []);
  const randomGuest = () => {
    const randomIndex = Math.floor(albums.length * Math.random());
    const random = albums[randomIndex];
    setRandomAlbum(random);
  };
  return (
    <div className={styles.main}>
      <p>Here goes the albums list</p>
      <ul>
        {albums &&
          albums.map((album, index) => (
            <li
              //   onClick={() => {
              //     alert(album._id);
              //   }}
              key={index}
            >
              {album.albumOfTheDayStatus.toUpperCase()} - {album.albumName}{' '}
              - <strong>{album.guestName}</strong>
            </li>
          ))}
      </ul>
      <button onClick={randomGuest}>Choose Random</button>
      <br />
      {randomAlbum && (
        <div className={styles.albumDiv}>
          <img
            className={styles.albumImage}
            src={randomAlbum.albumImageUrl}
          />

          <h3>
            <strong>{randomAlbum.albumName} </strong>
          </h3>
          <small>{randomAlbum.guestName} </small>
          <br />
          <strong>
            <small>{randomAlbum.email} </small>
          </strong>
        </div>
      )}
    </div>
  );
};
