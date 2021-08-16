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
          <Route exact path="/about" component={About} />
          <Route exact path="/invitation" component={Invitation} />
          <Route exact path="/recordings/new" component={Recorder} />
          <Route exact path="/recordings/player/:id" component={Player} />
        </Switch>
      </div>
      <Navbar />
    </Router>
  );
};
