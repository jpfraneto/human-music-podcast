import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { NewGuest, EpisodePlayer } from 'components';
import axios from 'axios';

export const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [chosenEpisode, setChosenEpisode] = useState(null);
  const [displayNewGuest, setDisplayNewGuest] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const asyncFunc = async () => {
      const res = await axios.get('/api/episodes');
      setEpisodes(res.data);
      setLoading(false);
    };
    asyncFunc();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div>
          <h1 className={styles.episodesTitle}>EPISODES</h1>
          <ul>
            {episodes &&
              episodes.map((ep, index) => (
                <li
                  className={styles.episodeName}
                  onClick={() => {
                    setChosenEpisode(ep);
                  }}
                  key={index}
                >
                  🐚
                </li>
              ))}
          </ul>
          <hr />
          <EpisodePlayer />
        </div>
      )}
    </div>
  );
};
