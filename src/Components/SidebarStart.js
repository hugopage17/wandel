import React, { Component } from 'react';
import graphIcon from '../Images/graph.png'
import statsIcon from '../Images/stats.png'
import sheetIcon from '../Images/note.png'
import exportIcon from '../Images/export.png'
import keyIcon from '../Images/key.png'

class SideItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      bg: '#1c1c1c'
    }
  }

  changeColor = () => {
    this.setState({bg:'white'})
  }

  defaultColor = () => {
    this.setState({bg:'#1c1c1c'})
  }

  render(){
    const style = {
      backgroundColor: this.state.bg
    }

    return(
      <div style={style} onMouseEnter={this.changeColor} onMouseLeave={this.defaultColor} onClick={this.props.func}>
        <span>
        <label style={{fontSize:34, marginRight:40}}><strong>{this.props.name}</strong></label>
        <img src={this.props.img} width={64} height={64} style={{marginLeft:this.props.margin}}/>
        </span>
        <hr/>
      </div>
    )
  }
}

class SidebarStart extends Component{
  constructor(props){
    super(props)
  }

  render(){

    const style = {
      backgroundColor: '#1c1c1c',
      color:'#00ccff',
      paddingBottom:260,
      padding:10,
      textAlign:'left',
      fontSize:24
    }

    return(
      <div style={style}>
        <div style={{padding:20}}></div>
        <SideItem name='Spreadsheet' func={this.props.getSheet} img={sheetIcon} margin={0}/>
        <SideItem name='Graph' func={this.props.getGraph} img={graphIcon} margin={105}/>
        <SideItem name='Stats' func={this.props.getStats} img={statsIcon} margin={120}/>
        <SideItem name='Serial Key' func={this.props.getKey} img={keyIcon} margin={40}/>
        <SideItem name='Export' func={this.props.export_data} img={exportIcon} margin={95}/>
        <h3 style={{paddingBottom:260}}></h3>
      </div>
    )
  }
}

export default SidebarStart
