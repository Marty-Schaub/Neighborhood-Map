import React from 'react';
import Mapn from './map.js'
import Nlist from './List.js'
import './App.css';
import SquareAPI from './API/'


class App extends React.Component {
  constructor( props ){
  super( props );
  this.onMarkerClick = this.onMarkerClick.bind(this);
  this.state = {     locations: [
           {id: "4b625ff4f964a520eb442ae3", title: 'Falls Park', location: {lat:34.8443, lng:-82.4015},phone:"", address:"",city:"",name:""},
           {id:"52dbe8a7498e53fc4d7e1a7d", title: "Sobey's", location: {lat:34.8482, lng:-82.3999},phone:"", address:"",city:"",name:""},
           {id:"4b535e14f964a520569927e3", title: 'Liberty Bridge', location: {lat:34.8447, lng:-82.4006},phone:"", address:"",city:"",name:""},
           {id:"4b1d9bbaf964a520031324e3", title: 'Peace Center', location: {lat:34.8475, lng:-82.4015},phone:"", address:"",city:"",name:""},
           {id:"4b68c62df964a520418c2be3", title: 'Flour Field', location: {lat:34.8423, lng:-82.4081},phone:"", address:"",city:"",name:""},
           {id:"4bae1029f964a52008803be3", title: 'Greenville Zoo', location: {lat:34.84710531478399, lng:-82.3865158945592}, name:"",phone:"", address:"",city:""},
           {id: "4dcdbb408877851243e65126",title: 'Bon Secours Wellness Arena', location: {lat:34.8526, lng:-82.3915},phone:"", address:"",city:"",name:""},

         ],lDetails:{},
          lName:"",
          lat:"",
          lng:""
     }

}


   onMarkerClick = (props, marker, e) =>{
   const markId = props.id
   console.log(props.id)
   console.log(marker)
   SquareAPI.getVenueDetails(markId).then((response)=>{
     this.setState({
       phone:response.response.venue.contact.formattedPhone,
       address:response.response.venue.location.formattedAddress[0],
       city:response.response.venue.location.formattedAddress[1],
       name:response.response.venue.name,
       lat:response.response.venue.location.lat,
       lng:response.response.venue.location.lng,

     })
     console.log(response)

   });
   };



    async componentDidMount(){

    SquareAPI.search({
      near: "Greenville,SC",
      query: "Bon Secours Wellness Arena",
      limit: 10
    }).then(results=> console.log (results));
}




  render() {

    return (
<div>
<Mapn ref="Map"
locations= {this.state.locations}
phone = {this.state.phone}
address={this.state.address}
city={this.state.city}
name={this.state.name}
id= {this.state.id}
onMarkerClick={this.onMarkerClick}
showingWindow= {this.state.showingWindow}
/>
<Nlist
locations= {this.state.locations}
phone = {this.state.phone}
address={this.state.address}
city={this.state.city}
name={this.state.name}
id= {this.state.id}
onMarkerClick={this.onMarkerClick}
showingWindow= {this.state.showingWindow}
lat={this.state.lat}
following={this.state.lng}

/>


</div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default App
