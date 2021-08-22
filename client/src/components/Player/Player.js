import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { dateFormatting, sum2 } from '../../shared/helperFunctions';

export const Player = ({
  recording,
  setDisplayPlayer,
  loadNextRecording,
}) => {
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
        <h3 className={styles.recordingName}>{recording.name}</h3>
        <h5 className={styles.recordingDate}>
          {dateFormatting(recording.date)} - {recording.country}
        </h5>
        <audio
          className={styles.audioElement}
          src={recording.recordingUrl}
          type="audio/mpeg"
          preload="none"
          controls
        />
      </div>
      <button onClick={loadNextRecording}>Next</button>
    </div>
  );
};
