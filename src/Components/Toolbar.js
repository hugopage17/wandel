import React, { Component } from 'react';

class Toolbar extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){

    const style = {
      visibility: this.props.visable
    }

    return(
      <div id='toolbar_wrapper'>
        <div id='right_buttons'>
          <button class='smallBut' onClick={this.props.changeTitle}>Rename</button>
          <button class='smallBut' onClick={this.props.saveFile}>Save</button>
        </div>
      </div>
    )
  }
}

export default Toolbar
