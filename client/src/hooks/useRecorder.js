import { useEffect, useState } from 'react';

export const useRecorder = () => {
  const [audioURL, setAudioUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }
    const handleData = e => {
      setBlob(e.data);
      setAudioUrl(URL.createObjectURL(e.data));
    };
    recorder.addEventListener('dataavailable', handleData);
    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, isRecording]);
  const startRecording = () => {
    setIsRecording(true);
  };
  const stopRecording = () => {
    setIsRecording(false);
  };
  return [audioURL, isRecording, startRecording, stopRecording, blob];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  return new MediaRecorder(stream);
}
