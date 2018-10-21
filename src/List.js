import React, { Component } from 'react'

class Nlist extends React.Component {
  constructor (props){
  super (props);
  this.state = {locations:''}
//
}
  render() {

  return (
      <div className="list-places">
        <ul className="places">
        {this.props.locations.map((marker) =>
          <li key={marker.title}>
          <div className="marker-title">{marker.title}</div>


          </li>
      )}
        </ul>

      </div>
    )
  }
}

export default Nlist
