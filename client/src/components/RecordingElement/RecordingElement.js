import React from 'react';
import styles from './styles.module.css';

export const RecordingElement = ({
  thisRecording,
  setChosenRecording,
  setDisplayPlayer,
  randomCoords,
}) => {
  return (
    <li
      key={thisRecording._id}
      onClick={() => {
        setDisplayPlayer(true);
        setChosenRecording(thisRecording);
      }}
      className={styles.element}
      style={{ top: randomCoords.x, left: randomCoords.y }}
    >
      ⭐️
    </li>
  );
};
