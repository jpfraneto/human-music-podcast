import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export const Episode = ({ episode }) => {
  const thisRef = useRef(null);
  const [elapsed, setElapsed] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const playAudio = () => {
    thisRef.current.play();
    const id = setInterval(() => {
      const elapsed = Math.floor(
        (100 * thisRef.current.currentTime) / thisRef.current.duration,
      );
      setElapsed(elapsed);
    }, 1000);
    setIntervalID(id);
  };
  const pauseAudio = () => {
    clearInterval(intervalID);
    thisRef.current.pause();
  };
  const changePosition = e => {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    const elapsed = Math.floor(100 * (x / e.target.offsetWidth));
    const goToTime = Math.floor(
      (elapsed * thisRef.current.duration) / 100,
    );
    thisRef.current.pause();
    thisRef.current.currrentTime = goToTime;
    thisRef.current.play();
    setElapsed(elapsed);
  };
  return (
    <div className={styles.audioPlayerContainer}>
      <h1>This is where the episode will be shown {elapsed}%</h1>
      <audio ref={thisRef} src={episode.audioFileUrl} controls />
      <p>
        <strong>Name: </strong>
        {episode.guestName}
      </p>
      <p>
        <strong>Country: </strong>
        {episode.guestCountry}
      </p>
      <div
        className={styles.outsideDiv}
        onClick={e => {
          changePosition(e);
        }}
      >
        <div
          className={styles.innerDiv}
          style={{ width: elapsed * 2 }}
        ></div>
      </div>{' '}
      <button
        onClick={() => {
          console.log('the currentTime is:', thisRef.current.currentTime);
        }}
      >
        Console
      </button>
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
    </div>
  );
};
