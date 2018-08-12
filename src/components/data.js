import React from 'react';
import GameCard from './gameCard.js';
import Graph from './graph.js';

export default class Data extends React.Component {
    state = {
            selectedGameId: '',
            games: [],
            user_id: [],
            streamers: [],
            data: []
    };
    
    selectGame = async (gameId) => {
        this.setState(() => ({ selectedGameId: gameId }));
        setInterval(() => this.getGraphData(gameId), 5000);
    };
    
    getGraphData = async (gameId) => {
        const response = await fetch(`https://api.twitch.tv/helix/streams?first=10&game_id=${gameId}`, {
        headers: {
            'Client-ID' : 's6t2wnpgws5z1dputa41o2xfhd5unr'
        }});
        const streamers = {};
        const interData = await response.json();
        for (let i=0; i<interData.data.length; i++) {
            streamers[interData.data[i].user_id] = { views: interData.data[i].viewer_count };
        }
        const nameData = await this.getStreamerNames(Object.keys(streamers));
        for (let i of nameData) {
            streamers[i.id] = { 
                ...streamers[i.id],
                displayName: i.display_name,
                image: i.profile_image_url
            }
        }
        this.setState(() => ({ streamers }));
    };
    
    getStreamerNames = async (streamerIds) => {
        const ids = streamerIds;
        const idsurl = 'id=' + ids.join('&id=');
        const response = await 
        fetch(`https://api.twitch.tv/helix/users?${idsurl}`, {
            headers: {
                'Client-ID': 's6t2wnpgws5z1dputa41o2xfhd5unr'
            }
        });
        const namePayload = await response.json();
        const nameData = namePayload.data;
        return nameData;
    }

    fetchTwitchTop10Games = async () => {
        const response = await fetch('https://api.twitch.tv/helix/games/top', {
            headers: {
            'Client-ID': 's6t2wnpgws5z1dputa41o2xfhd5unr'
            }
        });
    
        const top10GamesPayload = await response.json();
        const top10Games = top10GamesPayload.data;
        this.setState(() => ({ games: top10Games }))
    };
    
    componentDidMount(){
        this.fetchTwitchTop10Games();
    };

    render(){
        if (!this.state.selectedGameId) {
        return(
            <div>
                {this.state.games.map((game) => {
                    return <GameCard key={game.id} {...game} selectGame={this.selectGame}/> 
                })}
            </div>
            )} else if (Object.keys(this.state.streamers).length > 0) {
                return <Graph data={this.state.streamers} />
            } else return null;
    }
};