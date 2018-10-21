import React from 'react';
import Map from './map.js'
import Nlist from './List.js'
import './App.css';


class App extends React.Component {

  state = {     locations: [
         {title: 'Falls Park', location: {lat:34.8443, lng:-82.4015}},
         {title: "Sobey's", location: {lat:34.8482, lng:-82.3999}},
         {title: 'Liberty Bridge', location: {lat:34.8447, lng:-82.4006}},
         {title: 'Peace Center', location: {lat:34.8475, lng:-82.4015}},
         {title: 'Flour Field', location: {lat:34.8423, lng:-82.4081}},
         {title: 'Greenville Zoo', location: {lat:34.8470, lng:-82.3875}},
         {title: 'Bon Secours Wellness Arena', location: {lat:34.8526, lng:-82.3915}}
        ]
   }

  render() {
    return (
<div>
<Map
locations= {this.state.locations} />
<Nlist
locations= {this.state.locations} />
</div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default App
