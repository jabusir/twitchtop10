import React from 'react';
import {fetchTwitchTop10Games} from './data'

const GameCard = (props) => {

    let img = props.box_art_url.replace('-{width}x{height}', '');
    return (
    <div>
        <img onClick={() => {props.selectGame(props.id)}} src={img} alt={props.name} />
    </div>
)};


export default GameCard; 