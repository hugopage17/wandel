import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Footer from './Footer'
import Widget from './Widget'
import graphIcon from '../Images/graph.png'
import statsIcon from '../Images/stats.png'
import sheetIcon from '../Images/note.png'
import shareIcon from '../Images/share copy.png'
import loadIcon from '../Images/upload.png'
import newIcon from '../Images/new.png'

class StartMenu extends Component{
  constructor(props){
    super(props)
  }


  render(){

    const style = {
      fontSize:26,
      borderRadius: 5,
      padding:10,
      margin:10,
      backgroundColor: '#1c1c1c',
      color: '#00ccff',
      marginTop:50
    }

    return(
      <div>
        <div>
          <div>
            <h1>Welcome to Wandel</h1>
            <hr style={{margin:'auto', width:'70%'}}/>
          </div>
          <div>
            <button style={style} onClick={this.props.newSheet}>
              New Sheet <img src={newIcon} width={32} height={32}/>
            </button>
            <button style={style} onClick={this.props.existingSheet}>
              Load Sheet <img src={loadIcon} width={32} height={32}/>
            </button>
          </div>
          <div style={{margin:'auto', width:'20%', marginTop:50}}>
            <Dropzone onDrop={this.props.uploadFile} class='drop_area'>Upload your own Spreadsheet</Dropzone>
          </div>
        </div>
        <div style={{marginTop:60}}>
          <Widget img={sheetIcon} bg='#1c1c1c' header='Spreadsheets'
            info='Create custom spreadsheets or upload files from your pc' color='white'/>

          <Widget img={graphIcon} bg='white' header='Graphs'
            info='Visualize your data with wandels built-in graphs that are made using plotly' color='#1c1c1c'/>

          <Widget img={statsIcon} bg='#1c1c1c' header='Statistics'
            info='Wandel analysizes your data and can determine the mean, variance and standard deviation of your data set' color='white'/>

          <Widget img={shareIcon} bg='white' header='Save and Share'
            info='Share your data with others or save your project for editing later' color='#1c1c1c'/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default StartMenu
