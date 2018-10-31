import React, { Component } from 'react';
import '../Stylesheets/style.css'
import StartMenu from './StartMenu'
import SidebarStart from './SidebarStart'
import Plot from 'react-plotly.js'
import Toolbar from './Toolbar'

class HeaderLabel extends Component{
  constructor(props){
    super(props)
    this.state = {
      color:'white'
    }
  }

  changeColor = () => {this.setState({color:'#00ccff'})}
  defaultColor = () => {this.setState({color:'white'})}

  render(){
    const style = {fontSize:22, marginRight: 15, color:this.state.color}
    return(
      <label style={style}
        onMouseEnter={this.changeColor} onMouseLeave={this.defaultColor} onClick={this.props.setDisplay}>
        {this.props.name}
      </label>
    )
  }
}

class Workspace extends Component{
  constructor(props){
    super(props)
    this.state = {
      sampleSize:0,
      title:null,
      dataLoaded: false,
      allInputs:[],
      allChecks:[],
      serialKey: null,
      isSaved: false,
      items:[],

      startMenu:'block',
      showCreate:'none',
      showExisting: 'none',
      showSide:'none',
      showSheet:'none',
      showGraph:'none',
      showStats:'none',
      showKey: 'none',
      loadingScreen:'none',

      allValues:[],
      x:[],
      xCounter:0,
      type:'scatter',
      mode:'markers+lines',
      fill:'none',
      x_label: '',
      y_label:'',

      mean:0,
      variance:0,
      sd:0,

      applyBut: 'hidden',
      showTitle:'block',
      setTitle:'none'

    }
  }

  newSheet = () => {
    this.setState({startMenu:'none'})
    this.setState({showCreate:'block'})
  }
  createData = () => {
    const size = document.getElementById('sampleSize').value
    const title = document.getElementById('titleSetter').value
    if(title != '' && size != 0 && !isNaN(size)){
      this.setState({title:title})
      for(var i=0; i<size; i++){
        const input = document.createElement('input')
        this.state.allInputs.push(input)
        input.style.margin = '5px'
        input.style.padding = '5px'
        input.style.borderRadius = '5px'
        input.style.backgroundColor = '#1c1c1c'
        input.style.color = '#00ccff'
        input.className = 'spreadsheetInput'
        document.getElementById('inputSection').appendChild(input)
      }
      this.setState({sampleSize:size})
      this.setState({showSheet:'block'})
      this.setState({showSide:'block'})
      this.setState({showCreate:'none'})
    }
    else{
      alert('Invalid data entered please make sure you enter a title for the data and a valid integer for sample size')
    }
  }
  uploadFile = (files, rejectedFiles) => {
      const allValues = this.state.allValues
      const reader = new FileReader()
      reader.onload = function(){
        reader.result.split('\n').map(function(cell){
          if(cell != '' && !isNaN(cell)){
            allValues.push(cell)
          }
        })
        for(var i=0; i<allValues.length;i++){
          const input = document.createElement('input')
          input.value =  allValues[i]
          input.style.margin = '5px'
          input.style.padding = '5px'
          input.style.borderRadius = '5px'
          input.style.backgroundColor = '#1c1c1c'
          input.style.color = '#00ccff'
          input.className = 'spreadsheetInput'
          document.getElementById('inputSection').appendChild(input)
        }
      }
      reader.readAsText(files[0])
      this.setState({allValues:allValues})
      this.setState({title:files[0].name})
      this.setState({sampleSize:allValues.length})
      this.setState({showSheet:'block'})
      this.setState({showSide:'block'})
      this.setState({startMenu:'none'})
      this.setState({dataLoaded:true})
    }
  existingSheet = () => {
    this.setState({showExisting:'block'})
    this.setState({startMenu:'none'})
  }
  loadSheet = () => {
    const serial = document.getElementById('serialEntered').value
    this.setState({loadingScreen:'block'})
    fetch('https://api.jsonbin.io/b/5bd65cee51e8b664f2c3bd54/')
      .then(function (response){return response.json()})
      .then(function (data){
        data.map((project, index) =>{
          if(serial == project.serialKey){
            this.setState({title:project.title})
            this.setState({sampleSize:project.sampleSize})
            this.setState({allValues:project.allValues})
            this.setState({serialKey:project.serialKey})
            for(var i=0; i<project.sampleSize; i++){
              const input = document.createElement('input')
              this.state.allInputs.push(input)
              input.value = project.allValues[i]
              input.style.margin = '5px'
              input.style.padding = '5px'
              input.style.borderRadius = '5px'
              input.style.backgroundColor = '#1c1c1c'
              input.style.color = '#00ccff'
              input.className = 'spreadsheetInput'
              document.getElementById('inputSection').appendChild(input)
            }
            this.setState({showExisting:'none'})
            this.setState({showSheet:'block'})
            this.setState({showSide:'block'})
          }
        })
      }.bind(this))
      .catch(err => {
        document.getElementById('loadingText').innerText = 'ERROR: No internet connection, please check your network and try again'
        document.getElementById('loadingText').style.color = 'red'
      })
  }

  runData = () => {
    if(this.state.dataLoaded == false){
      this.setState({allValues:[]})
      var allValues = this.state.allValues
      var inputs = document.getElementsByClassName("spreadsheetInput");
      for(var i=0; i<inputs.length;i++){
        var num = Number(inputs[i].value)
        allValues.push(num)
      }
      this.setState({allValues:allValues})
      var numList = []
      for(var i=0; i<allValues.length; i++){
        if(!isNaN(allValues[i])){
          numList.push(allValues[i])
        }
      }
      var total = 0
      for(var i=0; i<numList.length; i++){
        total += (Number(numList[i]))
      }
      var mean = total/Number(numList.length)
      mean = Math.round(mean * 100)/100
      this.setState({mean:mean})

      var variance = 0
      for(var i=0; i<numList.length;i++){
          variance += (Math.pow((numList[i]-mean), 2))
      }
      variance = variance/numList.length
      variance = Math.round(variance * 100)/100
      this.setState({variance:variance})

      var sd = Math.sqrt(variance)
      sd = Math.round(sd * 100)/100
      this.setState({sd:sd})
      this.setState({dataLoaded:true})
    }
  }
  getSpreadsheet = () => {
    this.setState({showSheet:'block'})
    this.setState({showGraph:'none'})
    this.setState({showStats:'none'})
    this.setState({showKey:'none'})
  }
  graphData = () => {
    var x = this.state.x
    var xCounter = this.state.xCounter
    var allValues = this.state.allValues
    for(var i=0; i<allValues.length;i++){
      xCounter++
      x.push(xCounter)
      this.setState({xCounter:xCounter})
      this.setState({x:x})
    }
    this.setState({showGraph:'block'})
    this.setState({showSheet:'none'})
    this.setState({showStats:'none'})
    this.setState({showKey:'none'})
  }
  changeGraph = () => {
    const graphMenu = document.getElementById('graphMenu')
    var graphType =  graphMenu.options[graphMenu.selectedIndex].text
    if(graphType == 'Line'){
      this.setState({type:'line'})
      this.setState({fill:'none'})
      this.setState({mode:'lines+markers'})
    }
    else if(graphType == 'Bar') {
      this.setState({type:'bar'})
      this.setState({fill:'none'})
    }
    else if(graphType == 'Area') {
      this.setState({type:'area'})
      this.setState({fill:'tozeroy'})
      this.setState({mode:'lines'})
    }
  }
  graph_labels = () => {
    this.setState({x_label:document.getElementById('x_setter').value})
    this.setState({y_label:document.getElementById('y_setter').value})
  }
  getStatistics = () => {
    const allValues = this.state.allValues
    var numList = []
    for(var i=0; i<allValues.length; i++){
      if(!isNaN(allValues[i])){
        numList.push(allValues[i])
      }
    }
    var total = 0
    for(var i=0; i<numList.length; i++){
      total += (Number(numList[i]))
    }
    var mean = total/Number(numList.length)
    mean = Math.round(mean * 100)/100
    this.setState({mean:mean})

    var variance = 0
    for(var i=0; i<numList.length;i++){
        variance += (Math.pow((numList[i]-mean), 2))
    }
    variance = variance/numList.length
    variance = Math.round(variance * 100)/100
    this.setState({variance:variance})

    var sd = Math.sqrt(variance)
    sd = Math.round(sd * 100)/100
    this.setState({sd:sd})
    this.setState({showSheet:'none'})
    this.setState({showGraph:'none'})
    this.setState({showStats:'block'})
    this.setState({showKey:'none'})
  }
  getKey = () => {
    const isSaved = this.state.isSaved
    if(isSaved == false){
      alert('Please save the project to generate a serial key')
    }
    else {
      this.setState({showGraph:'none'})
      this.setState({showSheet:'none'})
      this.setState({showStats:'none'})
      this.setState({showKey:'block'})
    }
  }
  copyKey = () => {
  var serialText = document.getElementById('serialCopy');
  serialText.select();
  document.execCommand("copy");
  alert('Serial key copied to clipboard')
  }

  downloadCSV = () => {
      var allValues = this.state.allValues
      var date = new Date
      var fullText = ''
      var element = document.createElement("a");
      var varName = this.state.title
      var newArray = []
      newArray.push(varName + '\n')
      for(var i=0;i<allValues.length;i++){
        const cell = '\n'+ allValues[i].toString()
        newArray.push(cell)
      }
      newArray.push('\n'+ '\n'+ 'Mean: ' + this.state.mean)
      newArray.push('\n'+ 'Variance: ' + this.state.variance)
      newArray.push('\n'+ 'Standard Deviation: ' + this.state.sd)
      newArray.push('\n'+ '\n'+ 'This data set was created in Wandel on ' + date)
      var file = new Blob([newArray], {type: 'text/plain'});
      file.innerHTML = varName
      element.href = URL.createObjectURL(file);
      element.download = varName+".csv";
      element.click();
  }
  saveFile = () => {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const serialLength = 12
    var randomSerial = this.state.serialKey
    randomSerial = ''
    for (var i=0; i<serialLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
   }
   this.setState({serialKey:randomSerial})
   let body = {
     title:this.state.title,
     sampleSize:this.state.sampleSize,
     allValues:this.state.allValues,
     serialKey:this.state.serialKey
   }

   fetch('https://api.jsonbin.io/b/5bd65cee51e8b664f2c3bd54/', {mode: 'cors'},{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'secret-key':'$2a$10$PV2IawO3mVPq2rCaIkJFaOZkvy9V1XTyNLyriCquCqsoyv9Lpv1Vi',
        'Access-Control-Allow-Methods':'POST',
        'Access-Control-Allow-Headers':'Content-Type',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      Request:{
        credentials:'omit'
      },
      body:JSON.stringify(body)})
      .then(function (response){return response.json()})
      .then(function (data){console.log('post request response data', data)})
    this.setState({isSaved:true})
  }

  openChecks = () => {
    this.setState({allInputs:[]})
    const values = this.state.allValues
    var allInputs = document.getElementById('inputSection')
    while (allInputs.firstChild){
      allInputs.removeChild(allInputs.firstChild)
    }
    const size = document.getElementById('sampleSize').value
    for(var i=0; i<size; i++){
      const input = document.createElement('input')
      this.state.allInputs.push(input)
      input.style.margin = '5px'
      input.value = values[i]
      input.style.padding = '5px'
      input.style.borderRadius = '5px'
      input.style.backgroundColor = '#1c1c1c'
      input.style.color = '#00ccff'
      input.className = 'spreadsheetInput'
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      this.state.allChecks.push(checkbox)
      document.getElementById('inputSection').appendChild(checkbox)
      document.getElementById('inputSection').appendChild(input)
    }
    this.setState({applyBut:'initial'})
  }
  applyChanges = () => {
    var allInputs = this.state.allInputs
    var allValues = this.state.allValues
    var allChecks = this.state.allChecks
    var size = this.state.sampleSize
    for(var i=0; i<size;i++){
      if(allChecks[i].checked == true){
        allInputs.splice(i, 1)
        allValues.splice(i, 1)
      }
    }
    this.setState({size:allInputs.length})
    this.setState({allInputs:[]})
    this.setState({allValues:allValues})
    var inputsArea = document.getElementById('inputSection')
    while (inputsArea.firstChild){
      inputsArea.removeChild(inputsArea.firstChild)
    }
    const values = this.state.allValues
    for(var i=0; i<size; i++){
      const input = document.createElement('input')
      input.value = this.state.allValues[i]
      this.state.allInputs.push(input)
      input.style.margin = '5px'
      input.style.padding = '5px'
      input.style.borderRadius = '5px'
      input.style.backgroundColor = '#1c1c1c'
      input.style.color = '#00ccff'
      input.className = 'spreadsheetInput'
      document.getElementById('inputSection').appendChild(input)
    }
    this.setState({applyBut:'hidden'})
  }

  openTitleSetter = () => {
    document.getElementById('title_set').value = this.state.title
    this.setState({showTitle:'none'})
    this.setState({setTitle:'block'})
  }
  setNewTitle = () => {
    this.setState({title:document.getElementById('title_set').value})
    this.setState({showTitle:'block'})
    this.setState({setTitle:'none'})
  }

  render(){
    const style = {
      padding: 20, backgroundColor:'white', borderRadius: 5, margin:'auto',
      width:'50%', marginTop: 20, fontSize: 20, marginBottom: 20
    }
    const headerStyle = {backgroundColor:'#1c1c1c', padding:10, borderRadius: 5, marginBottom:10}
    const inputStyle = {borderRadius: 5, padding:5, fontSize: 18, marginBottom: 10}
    const butStyle = {
      fontSize:26, borderRadius: 5, padding:10, margin:10, backgroundColor: '#1c1c1c',
      color: '#00ccff', marginTop:50
    }
      {
      return(
        <div>
          <div style={{display:this.state.startMenu}}><StartMenu newSheet={this.newSheet} uploadFile={this.uploadFile} existingSheet={this.existingSheet}/></div>
          <div style={{display:this.state.showExisting}} id='existingForm'>
            <label>Serial Key <input id='serialEntered' type='text' style={inputStyle}/></label>
            <button style={butStyle} onClick={this.loadSheet}>Enter</button>
            <div style={{display:this.state.loadingScreen}}>
              <label style={{marginTop:40}} id='loadingText'>Loading data, please wait...</label>
              <div class="loader"></div>
            </div>
          </div>
          <div style={{display:this.state.showCreate}} id='form'>
            <div>
              <label style={{marginRight:160}}>Name</label><input type='text' id='titleSetter' style={inputStyle}/><br/>
              <label style={{marginRight:100}}>Sample Size</label><input type='text' id='sampleSize' style={inputStyle}/><br/>
            </div>
            <div><button ref='subBut' style={butStyle} onClick={this.createData}>Submit</button></div>
          </div>
          <div style={{display:this.state.showSide}}>
            <div id='sideMenu'>
              <SidebarStart getGraph={this.graphData} getStats={this.getStatistics}
                getSheet={this.getSpreadsheet} getKey={this.getKey} export_data={this.downloadCSV}/>
            </div>
          </div>
          <div style={{display:this.state.showSheet}}>
            <div><Toolbar saveFile={this.saveFile} changeTitle={this.openTitleSetter}/></div>
            <div id='workArea'>
                <div id='spreadsheetArea'>
                  <h1 style={{display:this.state.showTitle}}>{this.state.title}</h1>
                  <div style={{display:this.state.setTitle}}>
                    <input type='text' class='titleSetter' id='title_set'/>
                    <button style={butStyle} onClick={this.setNewTitle}>Set</button>
                  </div>
                  <div id='inputSection'></div>
                </div>
                <div>
                  <button style={butStyle} onClick={this.runData}>Run Data</button>
                </div>
            </div>
          </div>
          <div style={{display:this.state.showGraph}}>
            <div id='graphArea'>
              <div>
                <Plot
                      data={[
                        {
                          x: this.state.x,
                          y: this.state.allValues,
                          type: this.state.type,
                          mode: this.state.mode,
                          fill: this.state.fill,
                          marker: {color: '#00ccff',size:8},
                        },
                      ]}
                      layout={{title: this.state.title, plot_bgcolor:'#1c1c1c', "titlefont": {"size": 52},
                      'xaxis':{title:this.state.x_label}, 'yaxis':{title:this.state.y_label}}}
                />
              </div>
              <div>
                <select name="graph_select" id='graphMenu' onChange={this.changeGraph}>
                  <option value="line">Line</option>
                  <option value="bar">Bar</option>
                  <option value="area">Area</option>
                </select>
              </div>
              <div class='axis_setter'>
                <div>
                  <label>x axis label <input type='text' id='x_setter' class='axis_input' size={15}/></label>
                </div>
                <div>
                  <label>y axis label <input type='text' id='y_setter' class='axis_input' size={15}/></label>
                </div>
                <div>
                  <button onClick={this.graph_labels}>set</button>
                </div>
              </div>
            </div>
          </div>
          <div id='statsArea' style={{display:this.state.showStats}}>
            <h1>Statistics</h1>
            <hr class='stats_break'/>
            <h3>Mean: {this.state.mean}</h3>
            <hr class='stats_break'/>
            <h3>Variance: {this.state.variance}</h3>
            <hr class='stats_break'/>
            <h3>Standard Deviation: {this.state.sd}</h3>
            <hr class='stats_break'/>
            <h3>Sample Size: {this.state.sampleSize}</h3>
          </div>
          <div id='serialKey' style={{display:this.state.showKey}}>
            <h2>Serial Key <input id='serialCopy' style={inputStyle} value={this.state.serialKey} readonly="readonly"/></h2>
            <button style={butStyle} onClick={this.copyKey}>Copy</button>
          </div>
        </div>
      )
    }
  }
}

export default Workspace
