import React from 'react';
import GameCard from './gameCard.js';
import Graph from './graph.js';

export default class Data extends React.Component {
    state = {
            games: [],
            user_id: [],
            streamers: [],
            data: []
    };
    
    gameSelected = (user_id) => {
        this.setState(() => ({ user_id: user_id }));
        setInterval(this.getStreamerNameViews, 2500);
    }
    
    getStreamerNameViews = async () => {
        if(this.state.user_id.length > 0){
        const ids = this.state.user_id
        const idsurl = 'id=' + ids.join('&id=');
        const response = await 
        fetch(`https://api.twitch.tv/helix/users?${idsurl}`, {
            headers: {
                'Client-ID': 's6t2wnpgws5z1dputa41o2xfhd5unr'
            }
        });
        const namePayload = await response.json();
        const nameData = namePayload.data;
        this.setState(() => ({ data:nameData }));

        };

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
        if (this.state.user_id.length === 0) {
        return(
            <div>
                {this.state.games.map((game) => {
                    return <GameCard key={game.id} {...game} gameSelected={this.gameSelected}/> 
                })}
            </div>
            )} else if (this.state.data.length > 0 ) {
                return <Graph data={this.state.data} />
            } else {
                return null
            }
    }
};