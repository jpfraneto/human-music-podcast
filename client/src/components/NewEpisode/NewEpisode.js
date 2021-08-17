import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

export const NewEpisode = () => {
  const [guests, setGuests] = useState([]);
  const [serverResponse, setServerResponse] = useState('');
  const [data, setData] = useState({
    audioFileUrl: '',
    guestCountry: '',
    guestImageUrl: '',
    guestName: '',
    dateRecorded: '',
    language: 'Spanish',
    password: '',
  });
  const [chosenGuest, setChosenGuest] = useState({});
  useEffect(() => {
    const getGuests = async () => {
      const res = await axios.get('/api/guests/virgins');
      setGuests(res.data);
    };
    getGuests();
  }, []);
  const handleFormSubmit = async e => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = { ...data, ...chosenGuest };
    const res = await axios.post('/api/episodes/', body, headers);
    setServerResponse(res.data.msg);
  };
  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.main}>
      {serverResponse ? (
        <p>{serverResponse}</p>
      ) : (
        <div>
          <h1>Add a new podcast episode to the db</h1>
          {guests && (
            <div>
              <p>The guests are:</p>
              <select
                onChange={e => {
                  const chosenGuest = guests.filter(
                    guest => guest._id === e.target.value,
                  )[0];
                  setChosenGuest(chosenGuest);
                  setData({ ...data, guestName: chosenGuest.guestName });
                }}
              >
                <option>Choose Guest</option>
                {guests.map(guest => (
                  <option key={guest._id} value={guest._id}>
                    {guest.guestName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <form onSubmit={e => handleFormSubmit(e)}>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="audioFileUrl"
                type="text"
                value={data.audioFileUrl}
                placeholder="url"
                required
              />
              <small> Url of the audio file</small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="guestImageUrl"
                type="text"
                value={data.guestImageUrl}
                placeholder="guestImageUrl"
                required
              />
              <small> Url of the Guest Image</small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="guestCountry"
                type="text"
                value={data.guestCountry}
                placeholder="Zambodia"
                required
              />
              <small>
                {' '}
                Enter the country of the person that was interviewed
              </small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="guestName"
                value={data.guestName}
                type="text"
                placeholder="Richard Elements"
                required
              />
              <small>
                {' '}
                Enter the name of the person that was interviewed
              </small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="dateRecorded"
                value={data.dateRecorded}
                type="text"
                placeholder="Date recorded"
                required
              />
              <small> Enter the date when this was recorded</small>
            </div>
            <div className={styles.formelement}>
              <select name="language" required>
                <option>Choose Language</option>
                <option value="Spanish">Español</option>
                <option value="English">English</option>
              </select>
              <small> Enter the language of this recording</small>
            </div>
            <div className={styles.formelement}>
              <input
                onChange={e => onChange(e)}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <small> Enter the password (runescape)</small>
            </div>
            <input type="submit" value="Submit" />
          </form>
          {data.guestImageUrl && (
            <img src={data.guestImageUrl} className={styles.guestImage} />
          )}
        </div>
      )}
    </div>
  );
};
