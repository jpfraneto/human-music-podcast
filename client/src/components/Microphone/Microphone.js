import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const Microphone = ({ setBlob }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState('');
  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [setup, setSetup] = useState(false);

  useEffect(() => {
    setupMicrophone();
  }, []);
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('the recorder started!');
      recorder.start();
      startTimer();
    } else {
      recorder.stop();
      clearInterval(timerId);
    }
  };
  const startTimer = () => {
    const id = setInterval(addSecond, 1000);
    setTimerId(id);
  };
  const addSecond = () => {
    setSeconds(seconds => seconds + 1);
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 9 ? mins : '0' + mins}:${
      secs > 9 ? secs : '0' + secs
    }`;
  };
  const setupMicrophone = async () => {
    if (navigator.mediaDevices) {
      var constraints = { audio: true };
      var chunks = [];
      const stream = await navigator.mediaDevices.getUserMedia(
        constraints,
      );
      var mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);
      visualize(stream);
      mediaRecorder.addEventListener('dataavailable', e => {
        chunks.push(e.data);
      });
      mediaRecorder.addEventListener('stop', e => {
        var blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setBlob(blob);
        chunks = [];
        setAudioURL(URL.createObjectURL(blob));
        setSetup(true);
      });
    }
  };
  const visualize = stream => {
    console.log('inside the visualize func with this stream: ', stream);
  };

  const resetMicrophone = () => {
    if (window.confirm('Are you sure you want to erase your recording?')) {
      setSeconds(0);
      setAudioURL(null);
      setSetup(false);
    }
  };

  return (
    <div className={styles.main}>
      <h1>{formatTime(seconds)}</h1>
      {audioURL && (
        <audio className={styles.audioPlayer} src={audioURL} controls />
      )}
      {!setup ? (
        <div>
          {!isRecording ? (
            <div>
              <button
                className={styles.recordingBtn}
                onClick={toggleRecording}
              ></button>
            </div>
          ) : (
            <div>
              <button
                className={styles.pauseBtn}
                onClick={toggleRecording}
              >
                <div className={styles.stopSquare}></div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={resetMicrophone}>Reset</button>
        </div>
      )}
    </div>
  );
};
