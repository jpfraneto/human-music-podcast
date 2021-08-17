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
      console.log('the res.data is', res.data);
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

  const styleSetup = (episode, index) => {
    return (
      <img
        key={episode._id}
        style={{ animationDelay: `${index}s` }}
        className={styles.item1}
        onClick={() => {
          setDisplayPlayer(true);
          setSelectedEpisode(episode);
        }}
        src={episode.guestImageUrl}
      />
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.aboutDiv}>
        <h1 className={styles.aboutTitle}>PODCAST EPISODES</h1>
        <div className={styles.aboutText}>
          <p>
            Each small face is the face of a person that was interviewed in
            the podcast.
          </p>
          <p>Click it and the recording will be streamed.</p>
          <p>I hope that you enjoy the conversation</p>
        </div>
      </div>

      {episodes &&
        episodes.map((episode, index) => styleSetup(episode, index))}
      {displayPlayer && (
        <Player2
          episode={selectedEpisode}
          setDisplayPlayer={setDisplayPlayer}
        />
      )}
    </main>
  );
};
