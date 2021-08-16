import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { NewAlbum, AlbumDisplay } from 'components';
import axios from 'axios';

export const Landing = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.topDiv}>
        <p>
          <span className={styles.mainTitle}>timeless integration</span>
        </p>
      </div>
      <div className={styles.middleDiv}>
        <p className={styles.subtitle}>
          A journey into the rythms of the soul.
        </p>
        <br />
      </div>
      <AlbumDisplay />
    </div>
  );
};
