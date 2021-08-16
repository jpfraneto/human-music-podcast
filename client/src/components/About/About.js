import React from 'react';
import styles from './styles.module.css';

export const About = () => {
  return (
    <div>
      <h1 className={styles.aboutTitle}>ABOUT</h1>
      <div className={styles.aboutText}>
        <p>This project is an exploration into what makes us human.</p>
        <p>
          There will be a random person from the world into the podcast
          every week.
        </p>
        <p>The randomness of life will choose who it will be.</p>
        <p>Feel free to write to jpfraneto@gmail.com</p>
        <p>Let's see what happens from now on.</p>
      </div>
    </div>
  );
};
