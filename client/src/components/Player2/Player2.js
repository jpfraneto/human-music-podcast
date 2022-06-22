import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { dateFormatting, sum2 } from '../../shared/helperFunctions';

export const Player2 = ({ episode, setDisplayPlayer }) => {
  console.log('the episode is: ', episode);
  return (
    <div className={styles.playerDiv}>
      <p
        className={styles.closePlayer}
        onClick={() => {
          setDisplayPlayer(false);
        }}
      >
        ❌
      </p>
      <div>
        <h3 className={styles.recordingName}>{episode.guestName}</h3>
        <h5 className={styles.recordingDate}>
          {episode.dateRecorded} - {episode.guestCountry}
        </h5>
        <audio
          className={styles.audioElement}
          src={episode.audioFileUrl}
          controls
        />
      </div>
    </div>
  );
};
