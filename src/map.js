// Much of the code in this component came from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
// I modified it to make it meet what I needed

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const GMAP_KEY= "AIzaSyAi5uSbhjAQVO4C0_eJZYlCbQYfHvDUDYs&v=3"
// const GMAP_KEY = "Test"
let nomap = false

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
                markerObjects: [],
                uProp:{},
                uMarker:{},
                timeout:null,
                map:null
              };
// this code is taken from stack overflow here: https://stackoverflow.com/questions/51579671/how-to-get-all-markers-in-google-maps-react
this.onMarkerMounted = element => {
  this.setState(prevState => ({
    markerObjects: [...prevState.markerObjects, element]
  }))
};
}
// this code is from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react

//this fires when a marker is clicked
onMarkerClick = (props, marker, e)=>{
  if(this.state.activeMarker!=={}){
    this.onInfoWindowClose(props)
  }
  this.setState({
    selectedPlace: props,
    activeMarker: marker,

  })

  marker.setAnimation(this.props.google.maps.Animation.BOUNCE)

  this.props.fourSquareData(props.id)
  this.setState({showingInfoWindow:true})
}

onInfoWindowClose = (props) => {

  if (this.state.showingInfoWindow) {
    this.state.activeMarker.setAnimation(null);
    this.setState({showingInfoWindow: false,activeMarker: null})
    this.props.closeListByWindow();
  }
};

// this is adapted from the React documentation on componentDidMount
componentDidUpdate(prevProps, prevState) {
  if (this.props.markerProp !== prevProps.markerProp) {
     this.onMarkerClick(this.state.markerObjects[this.props.markerIndex].props, this.state.markerObjects[this.props.markerIndex].marker);
  }
  if(this.props.markerProp===prevProps.markerProp &&prevProps.markerProp!==null&&this.props.activeMarker===null){
     // this.onInfoWindowClose();
     this.onMarkerClick(this.state.markerObjects[this.props.markerIndex].props, this.state.markerObjects[this.props.markerIndex].marker);
  }
  if (this.props.close===0 && this.props.close !==prevProps.close &&this.props.markerProp===prevProps.markerProp &&prevProps.markerProp!==null){
    this.onInfoWindowClose()
  }
}

// this helps set the error page
mapNotReady = ()=>{
  this.setState({map:null})
}

// this is a conditional to help determine if an erro should be fired
mapReady = () =>{
this.setState({map:true})
}

// this sets up a timeout for how long the window should be loading before an error is thrown
componentWillMount = () =>{
let timeout =  window.setTimeout(this.showTimer, 1000);
  this.setState({timeout});
}

// this checks to see if the timeout is >= the timeout and also that the map is null before setting error page
showTimer = ()=>{
  if(this.state.timeout >=1000  && this.state.map ===null){
  nomap = true
  this.mapNotReady()
  }
}

// clears the timeout
componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
}

  render() {

  let bounds = new this.props.google.maps.LatLngBounds();
  let points =[];

  this.props.locations.map((myPoints)=>
  points.push( myPoints.pos)
  )
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

  return (
      <div className="map-container">
      {nomap?
        <div className="no-Map">

        <div>
        <h1>Error Loading Map due to Network Connection</h1>
        <h1>Please check connection and try again</h1>
        </div>
    </div>:
        <Map
        google={this.props.google} zoom={14}
        initialCenter={{
            lat: 34.8526,
            lng: -82.4006}}
          bounds={bounds}
          onClick={this.onInfoWindowClose}
          onReady={this.mapReady}>

          {this.props.locations.map((marker, index) =>

            <Marker
              ref={this.onMarkerMounted}
              key={index}
              index= {index}
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
            <h2>{this.props.name}</h2>
            <h3>{this.props.address}</h3>
            <h3>{this.props.city}</h3>
            <h3>{this.props.phone}</h3>
            <h6 className="four-square">Powered by FOURSQUARE</h6>
            </div>
          </InfoWindow>

        </Map>}

      </div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default GoogleApiWrapper({apiKey: GMAP_KEY})(Mapn)
// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyAi5uSbhjAQVO4C0_eJZYlCbQYfHvDUDYs&v=3")})
