import React, { Component } from 'react';
import Data from './components/data.js';


class App extends Component {

  render() {
    return (
      <div>
        <header>
        <h1>Welcome to Twitch's Top 10</h1>
        </header>
        <Data />                        
      </div>
    );
  }
}




export default App;


