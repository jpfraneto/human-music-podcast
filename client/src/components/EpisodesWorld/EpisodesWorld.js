import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { EpisodeDisplay, EpisodeElement } from 'components';

export const EpisodesWorld = () => {
  const [episodes, setEpisodes] = useState([]);
  const [displayPlayer, setDisplayPlayer] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await axios.get('/api/episodes');
      setEpisodes(res.data);
    };
    asyncFunc();
  }, []);

  const generateRandom = () => {
    var winWidth = window.innerWidth - 50;
    var winHeight = window.innerHeight - 50;

    return {
      x: getRandomNumber(0, winHeight) + 'px',
      y: getRandomNumber(0, winWidth) + 'px',
    };
  };
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <main className={styles.main}>
      {!selectedEpisode && (
        <div className={styles.aboutDiv}>
          <h1 className={styles.aboutTitle}>PODCAST EPISODES</h1>
          <div className={styles.aboutText}>
            <p>
              Each small face is the face of a person that was interviewed
              in the podcast.
            </p>
            <p>Click it and the recording will be streamed.</p>
            <p>I hope that you enjoy the conversation</p>
            <a
              className={styles.spotifyBtn}
              target="_blank"
              href="https://open.spotify.com/show/2nJcByumPsLWVYqdEwcPUA?si=a042e31831ad4fdf"
            >
              Listen in Spotify
            </a>
            <br />
            <a
              className={styles.youtubeBtn}
              target="_blank"
              href="https://www.youtube.com/channel/UCvcEtyzyWNymkNr5chRY-bQ"
            >
              Listen in Youtube
            </a>
          </div>
        </div>
      )}

      {/* {displayPlayer && (
        <Player2
          episode={selectedEpisode}
          setDisplayPlayer={setDisplayPlayer}
        />
      )} */}
      {selectedEpisode ? (
        <EpisodeDisplay
          setSelectedEpisode={setSelectedEpisode}
          episode={selectedEpisode}
        />
      ) : (
        <div>
          {episodes &&
            episodes.map((episode, index) => (
              <EpisodeElement
                key={episode._id}
                randomCoords={generateRandom()}
                episode={episode}
                setSelectedEpisode={setSelectedEpisode}
              />
            ))}
        </div>
      )}
    </main>
  );
};
