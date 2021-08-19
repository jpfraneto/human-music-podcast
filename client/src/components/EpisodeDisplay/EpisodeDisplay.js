import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { PodcastPlayer } from 'components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export const EpisodeDisplay = ({ episode, setSelectedEpisode }) => {
  return (
    <div className={styles.mainDiv}>
      <img className={styles.guestImage} src={episode.guestImageUrl} />
      <div className={styles.episodeContainer}>
        <span
          onClick={() => {
            setSelectedEpisode(null);
          }}
          className={styles.closeBtn}
        >
          ❌{' '}
        </span>
        <div className={styles.topBox}>
          <div className={styles.audioPlayerWrapper}>
            <audio
              className={styles.audioPlayer}
              src="https://rss.art19.com/episodes/82927b43-9dc3-49a7-9651-0582d6784585.mp3?_=1"
              controls
            />
          </div>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.albumInformation}>
            <img
              className={styles.albumImage}
              src={episode.albumImageUrl}
            />
          </div>
          <div className={styles.episodeDescription}>
            <h2>
              <u>Episode Description</u>
            </h2>
            <h3 className={styles.albumTitle}>
              <strong>{episode.albumName}</strong>
            </h3>
            <small className={styles.guestNameStyle}>
              @{episode.guestName}{' '}
            </small>
            <p>
              <strong>Date recorded: </strong>
              {episode.dateRecorded}
            </p>
            <ReactMarkdown
              className={styles.descriptionDiv}
              remarkPlugins={[gfm]}
              children={'string'}
            >
              {episode.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <PodcastPlayer episode={episode} />
    </div>
  );
};
