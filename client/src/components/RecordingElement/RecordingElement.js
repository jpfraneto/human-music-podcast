import React, { useState } from 'react';
import styles from './styles.module.css';

export const RecordingElement = ({
  thisRecording,
  setChosenRecording,
  setDisplayPlayer,
  randomCoords,
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
        top: randomCoords.x,
        left: randomCoords.y,
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
