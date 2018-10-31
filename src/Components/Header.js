import React, { Component } from 'react';
import '../Stylesheets/style.css'
import Logo from '../Images/Logo.png'

class Header extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id='header'>
        <img src={Logo} style={{marginRight:900}}/>
        <label style={{marginRight:900}}>Spreadsheet and graphing tool</label>
      </div>
    )
  }
}

export default Header
