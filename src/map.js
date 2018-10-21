import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';



class Mapn extends React.Component {
  constructor (props){
  super (props);
  this.state = {locations:''}
//
}
  render() {
    const style = {
  width: '70%',
  height: '100%'
}

  return (
      <div className="map-container">
        <h1 className="heading">Beautiful Greenville SC</h1>
        <Map
        google={this.props.google} zoom={14}
        initialCenter={{
            lat: 34.8526,
            lng: -82.3940
          }}
          style ={style}>

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>

              </div>
          </InfoWindow>
          <Marker
          title={'Liberty Bridge'}
          name={'Liberty Bridge'}
          position={{lat: 34.8447, lng: -82.4006}} />

          <Marker
          name={'Flour Field'}
          title={'Flour Field'}
          position={{lat: 34.8423, lng: -82.4081 }} />

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
