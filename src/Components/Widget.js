import React, { Component } from 'react';

class Widget extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){

    const style = {
      backgroundColor: this.props.bg,
      textAlign:'left',
      color:this.props.color,
      padding:20
    }

    return(
      <div style={style}>
        <div style={{margin:'auto', width:'60%'}}>
          <h1>{this.props.header}</h1>
          <p>{this.props.info}</p>
          <img src={this.props.img} width={192} height={192}/>
        </div>
      </div>
    )
  }
}

export default Widget
