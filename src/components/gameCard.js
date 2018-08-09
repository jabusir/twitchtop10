import React from 'react';
import {fetchTwitchTop10Games} from './data'

const getInfo = async (id, gameSelected) => {
    const response = await
    fetch(`https://api.twitch.tv/helix/streams?first=10&game_id=${id}`, {
        headers: {
            'Client-ID' : 's6t2wnpgws5z1dputa41o2xfhd5unr'
        }
     
    })
    const userIDList = [];
    const interData = await response.json();
    for (let i=0; i<interData.data.length; i++){
        userIDList.push(interData.data[i].user_id);
    }
    gameSelected(userIDList);
};

const GameCard = (props) => {

    let img = props.box_art_url.replace('-{width}x{height}', '');
    return (
    <div>
        <img onClick={() => {
            getInfo(props.id, props.gameSelected);
        }} src={img} alt={props.name} />
    </div>
)};


export default GameCard;