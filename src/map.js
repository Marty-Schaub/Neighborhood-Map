import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class Mapn extends React.Component {
  constructor (props){
  super (props);
  this.state = {locations:'',showingInfoWindow: false,activeMarker: {},selectedPlace: {},phone:"",myId:""}
//
}
// this code is from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
onNew = (props, marker, e)=>{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: true,
  })
  console.log(marker)

  this.props.onMarkerClick(props, marker, e)
  this.setState({showingInfoWindow:true})
}
-
onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  console.log(this.state.showingInfoWindow)
};


  render() {
    const style = {
  width: '75%',
  height: '100%'
}




  let bounds = new this.props.google.maps.LatLngBounds();
  let points =[];

  this.props.locations.map((myPoints)=>
  points.push( myPoints.location)
  )
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

  return (
      <div className="map-container">
        <h1 className="heading">Beautiful Greenville SC</h1>
        <Map
        google={this.props.google} zoom={16}
        initialCenter={{
            lat: 34.8526,
            lng: -82.4006
          }}
          bounds={bounds}
          style ={style}
          onClick={this.onMapClicked}>

          {this.props.locations.map((marker) =>

            <Marker key={marker.id}
              id= {marker.id}
              title={marker.title}
              name={marker.title}
              position={marker.location}
              onClick={this.onNew}
              />,

        )}
        <InfoWindow
          marker={this.state.activeMarker}
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

        </Map>

      </div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAi5uSbhjAQVO4C0_eJZYlCbQYfHvDUDYs&v=3")
})(Mapn)
