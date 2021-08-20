import React, { useState } from 'react';
import styles from './styles.module.css';

export const RecordingElement = ({
  thisRecording,
  setChosenRecording,
  setDisplayPlayer,
}) => {
  const [played, setPlayed] = useState(false);
  return (
    <li
      key={thisRecording._id}
      onClick={() => {
        setDisplayPlayer(true);
        setChosenRecording(thisRecording);
        setPlayed(true);
      }}
      className={styles.element}
      style={{
        top: '222px',
        left: '222px',
      }}
    >
      {played ? (
        <span className={styles.playedStar}>⭐️</span>
      ) : (
        <span>✩</span>
      )}
    </li>
  );
};
