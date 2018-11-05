// Much of the code in this component came from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
// I modified it to make it meet what I needed

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp'
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
                animation:this.props.google.maps.Animation.DROP,
                markers:[],
                markerProps:[],
                markerObjects: []
              };
//this code is taken from stack overflow here: https://stackoverflow.com/questions/51579671/how-to-get-all-markers-in-google-maps-react
this.onMarkerMounted = element => {
  this.setState(prevState => ({
    markerObjects: [...prevState.markerObjects, element.marker]
  }))
};
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
  console.log(this.props.google.maps.Marker.id)

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

  selectMarker = (id) =>{
    // const match = new RegExp(escapeRegExp(this.state.id),'i')

    const myMarker =   this.state.markerObjects.filter((marker) => marker.id === id)
    console.log(myMarker)
    console.log(id)
    // this.setState({
    //   activeMarker: myMarker,
    //   showingWindow: true,
    // })
  }

  render() {
    const style = {
  width: '75%',
  height: '100%'
}

console.log(this.state.markerObjects)

if(this.props.markerProp!==""){
  console.log(this.props.markerProp)
  console.log("GREAT")
  console.log(this.props.markerIndex)
  this.selectMarker(this.props.markerProp)
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
            lng: -82.4006}}
          bounds={bounds}
          style ={style}
          onClick={this.onInfoWindowClose}>

          {this.props.locations.map((marker, index) =>

            <Marker
              ref={this.onMarkerMounted}
              key={index}
              index= {marker.index}
              id={marker.id}
              name={marker.name}
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
