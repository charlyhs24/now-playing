import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './App.scss';
import NowPlaying from './Components/Now-Playing';
import UserPlaylist from './Components/User-Playlist';
export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={NowPlaying}/>
          <Route path="/user-playlist" exact component={UserPlaylist}/>
        </Switch>
      </BrowserRouter>

    )
  }
}



