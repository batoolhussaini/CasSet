import './MainSite.css';
import React, { useState, useEffect } from 'react';
import CreatePlaylist from './CreatePlaylist'; // Import the CreatePlaylist component

function MainSite() {
    const CLIENT_ID = "836985c6fb334af49ed4a3fb55e973fe";
    const CLIENT_SECRET = "d62652ceebc54d32a9292f154adc3e7b"; 
    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/casset";
    const SPACE_DELIMITER = "%20";
    const SCOPES = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "playlist-modify-private",
      "streaming",
      "user-read-private",
    ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false); // State to toggle showing the create playlist form

    async function tokenCall(inputString) {
        var newString = inputString.substring(6); 
      
        var baseString = CLIENT_ID + ":" + CLIENT_SECRET;
      
        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'authorization_code');
        requestBody.append('redirect_uri', REDIRECT_URL_AFTER_LOGIN);
        requestBody.append('code', newString);
      
        var tokenExchangeParams = {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(baseString),
          },
          body: requestBody.toString(),
        };
      
        var waiting = await fetch('https://accounts.spotify.com/api/token', tokenExchangeParams)
          .then(response => response.json())
          .then(data => {
      
            if(data.error === "invalid_grant"){
              return false;
            }
            console.log("Below is from the fetch of the token");
            console.log(data);
      
            localStorage.removeItem("accessToken");
            localStorage.removeItem("tokenType");
            localStorage.removeItem("expiresIn");
            localStorage.removeItem("refresh_token");
      
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("tokenType", data.token_type);
            localStorage.setItem("expiresIn", data.expires_in);
            localStorage.setItem("refresh_token", data.refresh_token);
            return;
          })
      
        if (waiting === false){
          return false;
        }
      
        return waiting;
    }

    useEffect(() => {
        if (window.location.search) {
          tokenCall(window.location.search);
        }
        // CHANGE localStorage to database later...
    }, []);

    const toggleCreatePlaylist = () => {
        setShowCreatePlaylist(!showCreatePlaylist);
    };

    const closeCreatePlaylist = () => {
        setShowCreatePlaylist(false);
    };

    return (
        <body id="main">
            <div id="everything-box">
                <div id="left-side">
                    <div id="top-box">
                        {/* When the button is clicked, toggle the state to show/hide the create playlist form */}
                        <button type="button" id="import-button" onClick={toggleCreatePlaylist}>create playlist</button>
                        <h1>CasSet</h1>
                    </div>
                    <div id="middle-box">
                        <p>No cassettes yet ;)</p>
                    </div>
                    <div id="bottom-box">
                        <h2>Groups</h2>
                        <div id="groups-box">
                            <p>groups here</p>
                        </div>
                    </div>
                </div>
                <div id="right-side">
                    <div id="account-menu">
                        <p>icon here</p>
                    </div>
                    <div id="friends-box">
                        <p>friends here</p>
                    </div>
                </div>
            </div>
            {/* Conditionally render the CreatePlaylist component based on the state */}
            {showCreatePlaylist && <CreatePlaylist onClose={closeCreatePlaylist} />}
        </body>
    )
}

export default MainSite;
