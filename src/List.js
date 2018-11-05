import React, { Component } from 'react'
import './App.css';


class Nlist extends Component {
  constructor (props){
  super (props);

    this.state = {query:""}
}

onNewLi = (props, marker, index)=>{
  if(this.state.showingWindow===true){
    this.setState({showingWindow:false})
  }else{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: "true"
  })

  this.props.markerHolder(props)
  console.log(index)
  this.props.fourSquareData( props)
  this.onUpdate(props)
  console.log(props)}
}

onUpdate = (props)=>{
this.setState({showingWindow:true})
console.log(props.id)
}

  render() {

  return (
      <div>

        <ul className="places">
        {this.props.locations.map((location, index) =>
          <li key={index}
          index={location.index}
          id= {location.id}
          title={location.title}
          name={location.title}
          position={location.location}
          ><button key={index} className="list-button" onClick={event=>this.onNewLi(location,this.props, index)} >{location.title}</button>

          {this.state.showingWindow&&this.props.id===location.id?
          <div className="extra-data">

          <div>
            <h3>{this.props.name}</h3>
            <h4>{this.props.address}</h4>
            <h4>{this.props.city}</h4>
            <h4>{this.props.phone}</h4>
            <h6 className="four-square">Details from Four Square</h6>
          </div>
          </div>:null
        }
          </li>
      )}
        </ul>
      </div>
    )
  }
}

export default Nlist
