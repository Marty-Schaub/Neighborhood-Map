// Much of the code in this component came from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
// I modified it to make it meet what I needed

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class Mapn extends React.Component {
  constructor (props){
  super (props);
  this.state = {locations:'',
                showingInfoWindow: false,
                activeMarker: {},
                selectedPlace: {},
                phone:"",
                myId:"",
                animation:this.props.google.maps.Animation.DROP
                }
//
}
// this code is from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
onMarkerClick = (props, marker, e)=>{
  if(this.state.activeMarker!=={}){
    this.onInfoWindowClose(props)
  }

  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: true,
  })
  marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
  console.log(e.id)

  this.props.fourSquareData(props)
  this.setState({showingInfoWindow:true})
}
-
onInfoWindowClose = (props) => {

  if (this.state.showingInfoWindow) {
    this.state.activeMarker.setAnimation(null);
    this.setState({showingInfoWindow: false,activeMarker: null})
  }
};


  render() {
    const style = {
  width: '75%',
  height: '100%'
}

  let bounds = new this.props.google.maps.LatLngBounds();
  let points =[];
  console.log(this.props.locations)
  this.props.locations.map((myPoints)=>
  points.push( myPoints.pos)
  )
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

  return (
      <div className="map-container">

        <Map
        google={this.props.google} zoom={14}
        initialCenter={{
            lat: 34.8526,
            lng: -82.4006
          }}
          bounds={bounds}
          style ={style}
          onClick={this.onInfoWindowClose}>

          {this.props.locations.map((marker) =>

            <Marker key={marker.id}
              id= {marker.id}
              title={marker.title}
              name={marker.title}
              position={marker.pos}
              onClick={this.onMarkerClick}
              animation={this.state.animation}
              />,

        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.props.name}</h1>
            <h2>{this.props.address}</h2>
            <h2>{this.props.city}</h2>
            <h2>{this.props.phone}</h2>
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
