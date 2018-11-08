// Much of the code in this component came from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
// and Dan Brown's Fend Walk Through Video https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be
// I modified it to make it meet what I needed

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class Mapn extends React.Component {
  constructor (props){
  super (props);
  this.state = {map:null,
                locations:'',
                showingInfoWindow: false,
                activeMarker: {},
                selectedPlace: {},
                phone:"",
                myId:"",
                animation:this.props.google.maps.Animation.DROP,
                markers:[],
                markerProps:[],
                markerObjects: [],
                myMarker: null,
                marker:null};
}
// this code is from the google-maps-react NPM page here https://www.npmjs.com/package/google-maps-react
onMarkerClick = (props, marker, e)=>{

  this.onInfoWindowClose(props)

  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: true,
  })
  marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
  this.props.fourSquareData(props.id)

  this.setState({showingInfoWindow:true})
}

onInfoWindowClose = (props) => {

  if (this.state.showingInfoWindow) {
    this.state.activeMarker.setAnimation(null);
    this.setState({showingInfoWindow: false,activeMarker: null})
  }
};

// this is adapted from the React documentation on componentDidMount
componentDidUpdate(prevProps, prevState) {
  if (this.props.markerProp !== prevProps.markerProp) {
     this.onMarkerClick(this.state.markerProps[this.props.markerIndex], this.state.markers[this.props.markerIndex]);
  }
  if (this.state.markers.length !== this.props.locations.length){
     this.onInfoWindowClose();
     this.updateMarkers(this.props.locations);
  }

}

// This is from Dan Brown's Fend Walk Through video and also the google maps react documentation
      mapReady = (props, map) =>{
        this.setState({map});
        this.updateMarkers(this.props.locations);
      }

// This is from Dan Brown's Fend Walk Through video
      updateMarkers = (locations) => {
          // If all the locations have been filtered then we're done
          if (!locations)
              return;

          // Delete any existing markers
          this
              .state
              .markers
              .forEach(marker => marker.setMap(null));

          let markerProps = [];
          let markers = locations.map((location, index) => {
              let mProps = {
                  key: index,
                  id: location.id,
                  index:index,
                  name: location.name,
                  position: location.pos,
                  url: location.url
              };
              markerProps.push(mProps);

              let animation = this.state.animation;
              let marker = new this
                  .props
                  .google
                  .maps
                  .Marker({position: location.pos, map: this.state.map, animation});
              marker.addListener('click', () => {
                  this.onMarkerClick(mProps, marker, null);
              });
              return marker;
          })

          this.setState({markers, markerProps});
      }

  render() {
    const style = {
  width: '75%',
  height: '100%'
}
//this is adapted from what I learned in the courses on Google Maps
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

        <Map
        google={this.props.google} zoom={14}
        initialCenter={{
            lat: 34.8526,
            lng: -82.4006}}
          onReady = {this.mapReady}
          bounds={bounds}
          style ={style}
          onClick={this.onInfoWindowClose}>


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
          <div>
            <h3>{this.props.name}</h3>
            <h3>{this.props.address}</h3>
            <h3>{this.props.city}</h3>
            <h3>{this.props.phone}</h3>
            <h6 className="four-square">Details by FOURSQUARE</h6>

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
