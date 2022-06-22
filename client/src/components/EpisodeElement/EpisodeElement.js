import React from 'react';
import styles from './styles.module.css';

export const EpisodeElement = ({
  episode,
  setSelectedEpisode,
  randomCoords,
}) => {
  return (
    <img
      onClick={() => {
        setSelectedEpisode(episode);
      }}
      key={episode._id}
      className={styles.element}
      style={{ top: randomCoords.x, left: randomCoords.y }}
      src={episode.guestImageUrl}
    />
  );
};
