import React from 'react';
import styles from './styles.module.css';

export const Spinner = () => {
  return (
    <div>
      <img
        className={styles.spinner}
        src="https://i.gifer.com/ZZ5H.gif"
      ></img>
      <p>Loading...</p>
    </div>
  );
};
