import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useHistory } from 'react-router-dom';

export const Navbar = () => {
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
          Home
        </li>
        <li
          onClick={() => {
            history.push('/manifesto');
          }}
        >
          Manifesto
        </li>
        <li
          onClick={() => {
            history.push('/recordings');
          }}
        >
          Talk to the void
        </li>
        <li
          onClick={() => {
            history.push('/episodes');
          }}
        >
          Podcast Episodes
        </li>

        <li
          onClick={() => {
            window.open(
              'https://www.human-music.com',
              '_blank', // <- This is what makes it open in a new window.
            );
          }}
        >
          Radio
        </li>
      </ul>
    </div>
  );
};
