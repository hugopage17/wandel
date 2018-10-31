import React, { Component } from 'react';
import icon from '../Images/Icon.png'

class Footer extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div id='footer_wrapper'>
        <div id='list_wrapper'>
          <table>
            <th>
              <td>
                <ul class='footer_list'>
                  <li><a href='#'>Facebook</a></li>
                  <li><a href='#'>Github</a></li>
                  <li><a href='#'>Linkedin</a></li>
                </ul>
              </td>
            </th>
            <th>
              <td>
                <ul class='footer_list'>
                  <li><a href='#'>Plotly</a></li>
                  <li><a href='#'>Download Manual</a></li>
                  <li><a href='#'>Wandel Forum</a></li>
                </ul>
              </td>
            </th>
          </table>
        </div>
        <img src={icon} class='footer_icon'/>
      </div>
    )
  }
}

export default Footer
