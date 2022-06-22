import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';

export const EpisodePlayer = () => {
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //references
  const audioPlayer = useRef();
  const progressBar = useRef(); // Reference to progress bar
  const animationRef = useRef();

  //useEffect
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  //functions
  const togglePlayer = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentValue();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentValue = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(progressBar.current.value);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentValue();
  };

  const calculateTime = s => {
    const mins = Math.floor(s / 60);
    const returnedMinutes = mins > 10 ? mins : '0' + mins;
    const secs = Math.floor(s % 60);
    const returnedSeconds = secs > 10 ? secs : '0' + secs;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  };
  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };
  return (
    <div className={styles.main}>
      <audio
        ref={audioPlayer}
        src="https://traffic.libsyn.com/secure/naval/Naval-Ep100.mp3"
        preload="metadata"
      ></audio>
      <button onClick={backThirty} className={styles.forwback}>
        <BsArrowLeftShort /> 30
      </button>
      <button className={styles.playPause} onClick={togglePlayer}>
        {isPlaying ? <MdPauseCircleFilled /> : <MdPlayCircleFilled />}
      </button>
      <button onClick={forwardThirty} className={styles.forwback}>
        30 <BsArrowRightShort />
      </button>

      <div className={styles.currentTime}>
        {calculateTime(currentTime)}
      </div>
      <div>
        <input
          ref={progressBar}
          onChange={changeRange}
          type="range"
          className={styles.progressBar}
          defaultValue="0"
        />
      </div>
      <div className={styles.duration}>
        {' '}
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
};
