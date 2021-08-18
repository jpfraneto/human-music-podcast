import React from 'react';
import styles from './styles.module.css';

export const About = () => {
  return (
    <div>
      <h1 className={styles.aboutTitle}>ABOUT</h1>
      <div className={styles.aboutText}>
        <p>This project is an exploration into what makes us human.</p>
        <p>
          From all the people that share an album in this page, there will
          be one selected randomly each week that will be invited to the
          podcast.
        </p>
        <p>
          It will be a conversation that will explore the serendipitous
          encounter of human beings and their life experience.
        </p>
        <p>
          Please write to jpfraneto@gmail.com if you want to get in touch.
        </p>
        <p>Let's see how this unravels.</p>
      </div>
    </div>
  );
};
