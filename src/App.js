import React, { Component } from 'react';
import Data from './components/data.js';
import Header from './components/Header';
import './styles/styles.scss';


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Data />                        
      </div>
    );
  }
}




export default App;


