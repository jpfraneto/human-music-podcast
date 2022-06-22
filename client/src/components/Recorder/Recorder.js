import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { Microphone, Spinner } from 'components';

export const Recorder = ({
  setShowRecorder,
  setRecordingSent,
  setRecordings,
  recordings,
}) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState(null);
  const [text, setText] = useState('');
  const [data, setData] = useState({
    name: '',
    recordingUrl: '',
    country: '',
  });

  const uploadToS3 = async (blob, targetUrl) => {
    try {
      var options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.put(targetUrl, blob, options);
      if (res.status === 200) {
        return console.log('The file was uploaded to the s3');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const fileType = blob.type;
      const signedResponse = await axios.get(
        `/api/timelessness/sign-s3?type=${fileType}`,
      );
      const uploadResponse = await uploadToS3(
        blob,
        signedResponse.data.signedUrl,
      );
      const body = JSON.stringify({
        ...data,
        recordingUrl: signedResponse.data.url,
      });
      if (body) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await axios.post('/api/timelessness', body, config);
        res.data.newTimelessness.coords = { x: '222px', y: '222px' };

        setData({});
        setLoading(false);
        setRecordingSent(true);
        setRecordings([...recordings, res.data.newTimelessness]);
        setShowRecorder(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p
            className={styles.closeBtn}
            onClick={() => {
              setShowRecorder(false);
            }}
          >
            ❌
          </p>
          <Microphone setBlob={setBlob} />
          <hr />
          <form className={styles.formStyle} onSubmit={handleSubmit}>
            <input
              type="text"
              value={data.name}
              name="name"
              required
              onChange={e => onChange(e)}
            ></input>
            <label> Name</label>
            <br />
            <input
              type="text"
              required
              value={data.country}
              name="country"
              onChange={e => onChange(e)}
            ></input>
            <label> Country</label>
            <br />
            <hr />
            <input type="submit" value="Send to the Void" />
          </form>
        </div>
      )}{' '}
    </div>
  );
};
