import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export const Meditation = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.aboutTitle}>MEDITATION</h1>
      <div className={styles.containerDiv}>
        <div className={styles.aboutText}>
          <p>
            Every day I will hold the space for listening through the album
            of the day at 5AM EST.
          </p>
          <Link
            to={{ pathname: 'https://us02web.zoom.us/j/86439135013' }}
            target="_blank"
            className={styles.zoomMeeting}
          >
            Click To Go to Zoom Room
          </Link>
          <p>The password is 123456. See you in there.</p>
        </div>
      </div>
    </div>
  );
};
