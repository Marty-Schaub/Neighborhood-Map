import React, { Component } from 'react'
import './App.css';


class ListPlaces extends Component {
  constructor (props){
  super (props);

    this.state = {query:"",showingWindow:false, placeholder:"Great"}
}

// this fires when the list button is clicked. It sets a lot properties and passed data up to the APP.js file
onNewLi = (props, marker, index)=>{
  // this.onCloseList()
  if(this.state.showingWindow===true){
    this.setState({showingWindow:false})
    this.props.closeWindow(0);
  }else{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: true
  })
  this.props.closeWindow(1);
// passes the props, marker and idex up to APP.js so it can be passed back down to Map.js
  this.props.markerHolder(props, marker, index)
  // passess data to the fourSquare API and then the data is passed back down to here as extra details and also passed to map.JS for the InfoWindow
  // this.props.fourSquareData(props.id)
  this.onUpdate(props)}

}

// this hides or shows the extra details in the list when the button is clicked
// right now this is inactive. I ran out of time to complete. 
onUpdate = (props)=>{
this.setState({showingWindow:true})
}

onCloseList = (props)=>{
  this.setState({showingWindow:false})

}

componentDidUpdate(prevProps, prevState) {
  // debugger
  if(this.props.markerProp === prevProps.markerProp && prevProps.markerProp!==null && this.props.showingWindow===true){
    this.setState({showingWindow:false})
    console.log("Did I work")
  }
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
          placeholder={this.state.placeholder}
          ><button key={index} className="list-button" onClick={event=>this.onNewLi(location,this.props, index)} >{location.title}</button>

          {this.state.showingWindow&&this.props.index===location.id?
          <div className="extra-data">

          <div>
            <h4>Way To Go</h4>
            <h4>{this.props.address}</h4>
            <h4>{this.props.city}</h4>
            <h4>{this.props.phone}</h4>
            <h6 className="four-square">Details from FOURSQUARE</h6>
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

export default ListPlaces
