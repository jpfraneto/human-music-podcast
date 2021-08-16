import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Player2 } from 'components';

export const EpisodesWorld = () => {
  const [episodes, setEpisodes] = useState([]);
  const [displayPlayer, setDisplayPlayer] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [revolving, setRevolving] = useState(true);
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
  useEffect(() => {
    const asyncFunc = async () => {
      const res = await axios.get('/api/episodes');
      setEpisodes(res.data);
    };
    asyncFunc();
  }, []);

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(emojis.length * Math.random());
    return emojis[randomIndex];
  };

  const toggleRevolving = () => {
    setRevolving(!revolving);
  };

  return (
    <main className={styles.main}>
      <span
        onClick={() => {
          toggleRevolving();
        }}
        className={styles.theSun}
      >
        🌞
      </span>
      {episodes &&
        episodes.map((episode, index) => (
          <span
            style={{ animationDelay: `${index}s` }}
            className={styles.item}
            onClick={() => {
              setDisplayPlayer(true);
              setSelectedEpisode(episode);
            }}
          >
            {getRandomEmoji()}
          </span>
        ))}
      {displayPlayer && (
        <Player2
          episode={selectedEpisode}
          setDisplayPlayer={setDisplayPlayer}
        />
      )}
    </main>
  );
};
