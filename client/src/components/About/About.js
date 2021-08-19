import React from 'react';
import styles from './styles.module.css';

export const About = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.aboutTitle}>MANIFESTO</h1>
      <div className={styles.containerDiv}>
        <div className={styles.aboutText}>
          <p>
            Hello, my name is JP, and I’m the host of the Timeless
            Integration Podcast. There is not too much that I can say about
            myself, I prefer being the guy that is on the ceiling of the
            room holding the light that will make other people shine.
            That’s how I feel more comfortable, and this space is a
            consequence of that.{' '}
          </p>
          <p>
            This project is an exploration into what makes us human, using
            music as the compass that will guide this quest. Each episode
            will have a guest that will share an album that has been
            important in her or his life, and from there the conversation
            will flow into wherever it goes. The objective is to have as
            guests people from all over the world, because music is
            something that connects to the deepest core of our being. There
            is no necessity for me to understand Bengali so that I can
            resonate with music that was created in the regions of India
            where they speak that language. I see music as something more
            primitive than language, and that connects me in a deep way
            with what it means to be alive.{' '}
          </p>
          <p>
            That’s why I created this place, to celebrate what music is,
            what is can be, and to express gratitude for all the people
            that have devoted their lives to the creation of different
            rythms, melodies and songs. It will be an eternal discovery,
            into sounds that I don’t know they exist yet, but they are
            there waiting for being grooved. This place will be where that
            will happen, and I hope that you’ll find value on each episode.
          </p>
          <p>
            As always, I’m more than happy to read from you. My email is
            jpfraneto@gmail.com.
          </p>
          <p>Thank you for being here, thank you for being alive.</p>
          <p>jp</p>
        </div>
        <div className={styles.jpImages}>
          <img
            className={styles.image}
            src="https://human-music-podcast.s3.us-east-2.amazonaws.com/jpchico.jpg"
          />
        </div>
      </div>
    </div>
  );
};
