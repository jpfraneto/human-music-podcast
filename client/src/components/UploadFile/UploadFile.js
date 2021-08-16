import axios from 'axios';
import React, { useState } from 'react';
import styles from './styles.module.css';
const aws = require('aws-sdk');

export const UploadFile = () => {
  const [stateMsg, setStateMsg] = useState('Please select a file...');
  const [urls, setUrls] = useState([]);
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    if (file == null) {
      return alert('No file selected');
    }
    getSignedRequest(file);
  };
  const getSignedRequest = async file => {
    try {
      const res = await axios.get(
        `/api/timelessness/sign-s3?file-name=${file.name}&file-type=${file.type}`,
      );
      uploadFile(file, res.data.signedUrl, res.data.url);
    } catch (err) {
      console.log(err);
    }
  };
  const uploadFile = async (file, signedUrl, url) => {
    try {
      var options = {
        headers: {
          'Content-Type': file.type,
        },
      };
      const res = await axios.put(signedUrl, file, options);
      if (res.status === 200) {
        console.log(
          'The request was successful, and the url for the resource is:',
          url,
        );
        setUrls([...urls, url]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const manageUpload = e => {
    e.preventDefault();
    console.log('Managing the upload');
  };
  return (
    <div className={styles.container}>
      <p>Here is where the file will be uploaded</p>
      <form onSubmit={e => manageUpload(e)}>
        <input
          type="file"
          id="file-input"
          onChange={handleFileInputChange}
        />
        <p id="status">{stateMsg}</p>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank">
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
