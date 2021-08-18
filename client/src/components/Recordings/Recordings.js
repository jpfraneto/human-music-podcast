import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from 'components';
import style from './styles.module.css';
import axios from 'axios';
import { Recorder, RecordingElement } from 'components';

export const Recordings = () => {
  const [loading, setLoading] = useState(true);
  const [recordings, setRecordings] = useState([]);
  const [showRecorder, setShowRecorder] = useState(false);
  const [recordingSent, setRecordingSent] = useState(false);
  const [chosenRecording, setChosenRecording] = useState(null);
  const [displayPlayer, setDisplayPlayer] = useState(false);
  useEffect(() => {
    const funct = async () => {
      const res = await axios.get('/api/timelessness');
      console.log('the recordings are: ', res.data);
      setRecordings(res.data);
      setLoading(false);
    };
    funct();
  }, []);
  const toggleDisplayPlayer = () => {
    setDisplayPlayer(!displayPlayer);
  };
  const generateRandom = () => {
    var winWidth = window.innerWidth - 50;
    var winHeight = window.innerHeight - 50;

    return {
      x: getRandomNumber(0, winHeight) + 'px',
      y: getRandomNumber(0, winWidth) + 'px',
    };
  };
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const loadNextRecording = () => {
    const randomIndex = Math.floor(Math.random() * recordings.length);
    const randomRecording = recordings[randomIndex];
    setChosenRecording(randomRecording);
  };
  const toggleShowRecorder = () => {
    setShowRecorder(!showRecorder);
  };
  return (
    <div>
      <div>
        <h1 className={style.voidTitle}>TALK TO THE VOID</h1>
      </div>
      <p className={style.header}>
        This is a place for speaking. Whatever you want, into the open
        space.{' '}
        {!recordingSent ? (
          <span onClick={toggleShowRecorder} className={style.talk}>
            I {showRecorder && "don't "}have something to say.
          </span>
        ) : (
          <span className={style.recordingSent}>
            Your message was sent out there. Maybe someone will listen to
            it, one day.
          </span>
        )}
      </p>
      <p className={style.header}>
        Each star is something that a person had to say.
      </p>

      {showRecorder && (
        <Recorder
          setRecordingSent={setRecordingSent}
          setShowRecorder={setShowRecorder}
          setRecordings={setRecordings}
          recordings={recordings}
        />
      )}
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <ul className={style.recordingsList}>
            {recordings &&
              recordings.map((recording, index) => (
                <RecordingElement
                  key={recording._id}
                  randomCoords={generateRandom()}
                  thisRecording={recording}
                  setChosenRecording={setChosenRecording}
                  setDisplayPlayer={setDisplayPlayer}
                />
              ))}
          </ul>
          {displayPlayer && (
            <Player
              recording={chosenRecording}
              loadNextRecording={loadNextRecording}
              setDisplayPlayer={setDisplayPlayer}
            />
          )}
        </div>
      )}
    </div>
  );
};
