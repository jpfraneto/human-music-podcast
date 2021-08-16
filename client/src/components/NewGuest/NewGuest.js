import React, { useState } from 'react';
import style from './styles.module.css';
import { Spinner, Button } from 'components';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const NewGuest = ({ setDisplayNewGuest }) => {
  const [loading, setLoading] = useState(false);
  const [repeatedEmail, setRepeatedEmail] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [decision, setDecision] = useState(false);
  const [guestData, setGuestData] = useState({
    email: '',
    name: '',
    recommendation: '',
    language: '',
  });
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };
    const existingGuest = await checkEmailRepetition();
    if (existingGuest) {
      return setRepeatedEmail(
        'There is already a guest with that email in the database',
      );
    }
    const res = await axios.post('/api/guests/', guestData, headers);
    setServerResponse(res.data.msg);
    setLoading(false);
  };
  const onChange = e => {
    setRepeatedEmail('');
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };
  const toggleDecision = () => {
    setDecision(!decision);
  };
  const checkEmailRepetition = async () => {
    if (guestData.email) {
      const emailVerification = await axios.get(
        `/api/guests/${guestData.email}`,
      );
      return emailVerification.data.existingGuest;
    } else {
      alert('You need an email to do this verification');
    }
  };
  return (
    <div className={style.main}>
      {serverResponse ? (
        <div>
          <p>{serverResponse}</p>
          <button
            type="button"
            className={`${style.btn} ${style.backBtn}`}
            onClick={() => {
              setDisplayNewGuest(false);
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <div>
          <p className={style.invitation}>
            Do you want to be the next guest in this adventure?
          </p>
          {decision ? (
            <form onSubmit={handleSubmit} className={style.formstyle}>
              <div className={style.formelement}>
                <input
                  onChange={e => onChange(e)}
                  name="name"
                  type="text"
                  placeholder="Richard Elements"
                  className={style.inputField}
                  required
                />
                <small> Enter a name with which you feel identified</small>
              </div>
              <div className={style.formelement}>
                <input
                  onChange={e => onChange(e)}
                  name="email"
                  placeholder="thericky@yahoo.com"
                  type="email"
                  className={style.inputField}
                  required
                />
                <small> Enter an email where I can contact you</small>
                <br />
                {repeatedEmail && (
                  <small className={style.repeated}>
                    That email is already in the database
                  </small>
                )}
              </div>
              <div className={style.formelement}>
                <input
                  onChange={e => onChange(e)}
                  name="recommendation"
                  placeholder="Michael Stearns - Planetary Unfolding [1981]"
                  type="text"
                  className={style.inputField}
                  required
                />
                <small>
                  {' '}
                  Enter a piece of music that you want to recommend... It
                  can be a link to a youtube video, the name of the album,
                  etc. If it is understandable, it works.
                </small>
              </div>

              <div className={style.formelement}>
                <select
                  name="language"
                  id="language"
                  onChange={e => onChange(e)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                </select>
                <small>
                  {' '}
                  What language do you feel more comfortable with?
                </small>
              </div>

              <input
                type="submit"
                className={`${style.btn} ${style.submitBtn}`}
                value="Submit Info"
              />
              <input
                type="button"
                className={`${style.btn} ${style.backBtn}`}
                onClick={toggleDecision}
                value="Go back"
              />
              <p className={style.disclaimer}>
                <strong>Disclaimer:</strong> Your contact information will
                go into a system that will choose randomly one person every
                tuesday at 5pm ET. It will send the zoom meeting ID at that
                moment, and I'll be waiting in the room for whoever shows
                up. Your information is private, and it won't be used for
                any purposes other than this.
              </p>
            </form>
          ) : (
            <div>
              <button
                type="button"
                className={`${style.btn} ${style.submitBtn}`}
                onClick={toggleDecision}
              >
                👍🏻
              </button>

              {'  '}
              <button
                type="button"
                className={`${style.btn} ${style.backBtn}`}
                onClick={() => {
                  setDisplayNewGuest(false);
                }}
              >
                👎🏻
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
