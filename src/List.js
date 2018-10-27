import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Nlist extends React.Component {
  constructor (props){
  super (props);
  this.state = {locations:'',showingInfoWindow: false,activeMarker: {},selectedPlace: {},phone:"",myId:""}
//
}

onNewLi = (props, marker, e)=>{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: true,
  })
  console.log(marker)

  this.props.onMarkerClick( props, marker, e)
  console.log(props.id)
  this.setState({showingInfoWindow:true})
  console.log(this.state.showingInfoWindow)

}


  render() {

  return (
      <div className="list-places">
        <ul className="places">
        {this.props.locations.map((marker) =>
          <li key={marker.id}
          id= {marker.id}
          title={marker.title}
          name={marker.title}
          position={marker.location}
          onClick={event=>this.onNewLi(marker,this.props, marker)}>
          <div className="marker-title">{marker.title}</div>


          </li>
      )}
        </ul>
        <InfoWindow
          marker={"4bae1029f964a52008803be3"}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.props.name}</h1>
            <h2>{this.props.address}</h2>
            <h2>{this.props.city}</h2>
            <h2>{this.props.phone}</h2>
          </div>
        </InfoWindow>

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>

              </div>
          </InfoWindow>
      </div>
    )
  }
}

export default Nlist
