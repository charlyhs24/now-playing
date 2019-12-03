import React, {useState, useEffect} from 'react';
import SpotifyWebApi  from 'spotify-web-api-js';
import './nowplaying.scss';
const spotifyApi = new SpotifyWebApi();

const NowPlaying = () => {
    const [loggedIn, setloggedIn] = useState(null)
    const [device, setdevice] = useState({
        name : '',
        type : '',
        volume : ''
    })
    const [nowPlaying, setnowPlaying] = useState({
        songTitle   : '',
        artists     : '',
        albumArt    : ''
    })
    useEffect(() => {
        const params = getHashParams()
        function handleStatusLoggedIn(){
            setloggedIn(false)
            if(params.access_token){
                setloggedIn(true);
                spotifyApi.setAccessToken(params.access_token)
                localStorage.setItem('token',params.access_token)
            }
        }
        handleStatusLoggedIn()
    });
    useEffect(() => {
        getNowPlaying()
        return () => {
            getNowPlaying()
        };
    })
    const getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }
    const getNowPlaying = () => {
        spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
            setdevice({
                name : response.device.name,
                type : response.device.type,
                volume : response.device.volume_percent
            })
            setnowPlaying({
                songTitle : response.item.name,
                artists : response.item.artists[0].name,
                albumArt : response.item.album.images[0].url
            })
        })
    }
    const handlerButton = () => {
        window.location.href = "http://localhost:8888/login"
    }
    return (
      <div className="App">
        <header className="App-header">
            {
                loggedIn === false? 
                    <div className="login-section">
                        <img src="/asset/logo.png" alt="spoti-logo"/>
                        <button className={'btn btn-primary'} onClick={handlerButton}>Login Spotify</button>
                    </div>
                : 
                <div className="playing">
                    <div>
                        <img src={nowPlaying.albumArt} alt="album" style={{ height: 300 }}/>
                    </div>
                    <div>
                        Now Playing: { nowPlaying.songTitle }
                    </div>
                    <div>
                        <h3>{nowPlaying.artists}</h3>
                        <h4> Volume : {device.volume} %</h4>
                    </div>
                </div>

            }
        </header>
      </div>
    );
};

export default NowPlaying;