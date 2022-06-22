import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useHistory } from 'react-router-dom';
import { isMobile, isSafari } from 'react-device-detect';

export const Navbar = () => {
  console.log('is mobile', isMobile);
  let history = useHistory();
  const [toggle, setToggle] = useState(false);
  return (
    <div className={styles.nav}>
      <ul className={styles.navlist}>
        <li
          onClick={() => {
            history.push('/');
          }}
        >
          {isMobile ? '🏠' : 'Home'}
        </li>
        <li
          onClick={() => {
            history.push('/manifesto');
          }}
        >
          {isMobile ? '🗺' : 'Manifesto'}
        </li>

        <li
          onClick={() => {
            history.push('/episodes');
          }}
        >
          {isMobile ? '🎙' : 'Episodes'}
        </li>

        {!isSafari && (
          <li
            onClick={() => {
              history.push('/recordings');
            }}
          >
            {isMobile ? '📪' : 'Talk to the void'}
          </li>
        )}

        <li
          onClick={() => {
            window.open(
              'https://www.human-music.com',
              '_blank', // <- This is what makes it open in a new window.
            );
          }}
        >
          {isMobile ? '🎵' : 'Radio'}
        </li>
      </ul>
    </div>
  );
};
