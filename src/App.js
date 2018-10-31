import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Stylesheets/style.css'
import Header from './Components/Header'
import SidebarStart from './Components/SidebarStart'
import Workspace from './Components/Workspace'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      startMenu:'block',
      form:'none'
    }
  }

  newSheet = () => {
    this.setState({startMenu:'none'})
    this.setState({form:'block'})
  }

  render() {
    return (
      <div className="App">
        <div id='topMenu'>
          <Header/>
        </div>
        <div id='setup'>
          <div>
            <Workspace/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
