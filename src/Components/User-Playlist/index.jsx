import React, { useState, useEffect } from 'react';
import SpotifyWebApi  from 'spotify-web-api-js';
import './userplaylist.scss';
const spotifyApi = new SpotifyWebApi()
const UserPlaylist = () => {
    const [loggedIn, setloggedIn] = useState(false)
    const [token, settoken] = useState(null)
    useEffect(() => {
        const CheckIsLoggedIn = () => {
            if(localStorage.getItem('token')){
                settoken(localStorage.getItem('token'))
                setloggedIn(true)
                spotifyApi.setAccessToken(token)
            }
        }
        CheckIsLoggedIn()
        getUserPlaylist()
        return () => {
            CheckIsLoggedIn()
        };
    })
    const getUserPlaylist = () => {
        spotifyApi.getUserPlaylists()
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })
    }
    return (
        <div className="user-playlist">
            {
                loggedIn ? <h1>hello</h1> : <br/>
            }
        </div>
    );
};

export default UserPlaylist;