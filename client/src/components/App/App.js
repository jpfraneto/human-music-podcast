import React, { useState } from 'react';
import styles from './styles.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {
  Player,
  Recorder,
  Landing,
  Recordings,
  Navbar,
  Episodes,
  About,
  NewEpisode,
  Invitation,
  EpisodesWorld,
  Meditation,
  AlbumsList,
} from 'components';

export const App = () => {
  return (
    <Router>
      <div className={styles.big}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/recordings" component={Recordings} />
          <Route exact path="/episodesworld" component={Episodes} />
          <Route exact path="/episodes" component={EpisodesWorld} />
          <Route exact path="/episodes/new" component={NewEpisode} />
          <Route exact path="/manifesto" component={About} />
          <Route exact path="/meditation" component={Meditation} />
          <Route exact path="/invitation" component={Invitation} />
          <Route exact path="/recordings/new" component={Recorder} />
          <Route exact path="/recordings/player/:id" component={Player} />
          <Route exact path="/albums/all" component={AlbumsList} />
        </Switch>
      </div>
      <Navbar />
    </Router>
  );
};
