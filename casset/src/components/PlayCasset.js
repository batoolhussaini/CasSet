import React from 'react';
import '../css/PlayCasset.css';
import { Button } from 'react-bootstrap';
import PlaySong from './PlaySong';

function PlayCasset({ onClose }) {
    
    return (
            <div>
                <div id="casset-play-top">
                    <Button id="back" onClick={onClose}>go back</Button>
                    <p className="russo-one-regular" id="casset-title-play">goatedmusic.</p>
                </div>
                <div id="big-purple-container">
                    <div id="left-play-song">
                        <PlaySong/>
                    </div>
                    <div id="right-cassetandnote">
                        <div id="show-note">
                            {/* NOTE HEREEEEEEEEEE */}
                        </div>
                    </div>
                </div>
            </div>        
    )
}

export default PlayCasset