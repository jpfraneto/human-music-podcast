import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export const EpisodesWorld = () => {
  const [emoji, setEmoji] = useState('⏰');
  const emojis = [
    '💀',
    '🐷',
    '🌎',
    '🪐',
    '☄️',
    '🌕',
    '🐚',
    '🍄',
    '🐚',
    '⚙️',
  ];
  const randomEmoji = () => {
    const randomIndex = Math.floor(emojis.length * Math.random());
    return emojis[randomIndex];
  };
  return (
    <div className={styles.main}>
      <p className={styles.theSun}>🌞</p>
      <div className={styles.randomEmoji}> {randomEmoji()}</div>
      <div className={styles.randomEmoji}> {randomEmoji()}</div>
      <div className={styles.randomEmoji}> {randomEmoji()}</div>
    </div>
  );
};
