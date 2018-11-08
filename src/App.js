import React from 'react';
import Mapn from './map.js'
import ListPlaces from './List.js'
import './App.css';
import SquareAPI from './API/'
import escapeRegExp from 'escape-string-regexp'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component {
  constructor( props ){
  super( props );

  this.state = {     locations: [
           {id: "4b625ff4f964a520eb442ae3", title: 'Falls Park', pos: {lat:34.8443, lng:-82.4015},phone:"", address:"",city:"",name:""},
           {id:"52dbe8a7498e53fc4d7e1a7d", title: "Soby's", pos: {lat:34.8482, lng:-82.3999},phone:"", address:"",city:"",name:""},
           {id:"4b535e14f964a520569927e3", title: 'Liberty Bridge', pos: {lat:34.8447, lng:-82.4006},phone:"", address:"",city:"",name:""},
           {id:"4b1d9bbaf964a520031324e3", title: 'Peace Center', pos: {lat:34.8475, lng:-82.4015},phone:"", address:"",city:"",name:""},
           {id:"4b68c62df964a520418c2be3", title: 'Flour Field', pos: {lat:34.8423, lng:-82.4081},phone:"", address:"",city:"",name:""},
           {id:"4bae1029f964a52008803be3", title: 'Greenville Zoo', pos: {lat:34.84710531478399, lng:-82.3865158945592}, name:"",phone:"", address:"",city:""},
           {id: "4dcdbb408877851243e65126",title: 'Bon Secours Wellness Arena', pos: {lat:34.8526, lng:-82.3915},phone:"", address:"",city:"",name:""},

         ],lDetails:{},
          lName:"",
          lat:"",
          lng:"",
          myId:"",
          showingLocations:[],
          query:"",
          filtered:[],
          markerProp: null,
          markerIndex:"",
          markers:[],
          activeMarker:{},
          myMarker:"",
          clsoe:""
    }
}

// Get the fourSquareData
   fourSquareData = (id) =>{

   SquareAPI.getVenueDetails(id).then((response)=>{
     console.log(response)
     this.setState({
       phone:response.response.venue.contact.formattedPhone,
       address:response.response.venue.location.formattedAddress[0],
       city:response.response.venue.location.formattedAddress[1],
       name:response.response.venue.name,
       lat:response.response.venue.location.lat,
       lng:response.response.venue.location.lng,
       myId:response.response.venue.id,
       close:false
     })
   });
   };

   // This is a combination of what I did for the MYReads app and Dan Brown's Fend Video
     updateQuery = (query) => {

      this.setState({query: query,
        filtered:this.filterLocations(this.state.locations, query)
     })
     }
// this is adapted from Dan Brown's FEND walk through. He did not use the match and had a more involved process
filterLocations =(locations, query)=>{
  const match = new RegExp(escapeRegExp(this.state.query),'i')
  return   this.state.locations.filter((locations) => match.test(locations.title))

}

     clearQuery = ()=> {
       this.setState ({query: ''})
     }

// This is from Dan Brown's FEND walk through video
componentDidMount(){
this.setState({
  ...this.state,
  filtered:this.filterLocations(this.state.locations,"")})
}

// this closes the Window when the list item buttons are clicked
closeWindow = ()=>{
  if(this.state.close===true){
    this.setState({close:false})
  }else{
this.setState({close:true})
}
}
// this is adapted from Dan Brown's FEND walk through video and what I had done on my own. I was trying to update using a marker ID
  markerHolder = async (props, marker, index)=>{
// console.log(props.id)
  if(props===null){
    this.setState({
      markerProp:null,
      markerIndex:null
    })
  }else {
  this.setState({
      markerProp:props.id,
      markerIndex:index
    })
  }
   console.log(this.state.markerIndex)
   console.log(this.state.markerProp)

}

  render() {

    const {query} = this.state
    let showingLocations
    if (this.state.filtered){
      showingLocations =  this.state.filtered
    } else {
      showingLocations = this.state.locations
    }

    return (

<div className="main">

  <h1 className="heading">Greenville South Carolina</h1>
  <div className="MAP">
  <ErrorBoundary>
  <Mapn ref="Map"
    locations= {showingLocations}
    phone = {this.state.phone}
    address={this.state.address}
    city={this.state.city}
    name={this.state.name}
    id= {this.state.myId}
    fourSquareData={this.fourSquareData}
    showingWindow= {this.state.showingWindow}
    markerHolder={this.markerHolder}
    markerIndex={this.state.markerIndex}
    markerProp={this.state.markerProp}
    collectMarker = {this.collectMarker}
    listClose={this.state.close}
    />
</ErrorBoundary>
</div>
    <div className="list-places">
      <div className="filter-list">
      <ErrorBoundary>
        <input
          type="search"
          placeholder="Filter the list and Map"
          name="filter"
          value= {query}
          onChange={(event)=> this.updateQuery(event.target.value)}
          />
      </ErrorBoundary>
      </div>
    </div>
<div>
<ErrorBoundary>
  <ListPlaces
    locations= {showingLocations}
    phone = {this.state.phone}
    address={this.state.address}
    city={this.state.city}
    name={this.state.name}
    id= {this.state.myId}
    fourSquareData={this.fourSquareData}
    showingWindow= {this.state.showingWindow}
    filteredLoc={this.filteredLoc}
    markerHolder={this.markerHolder}
    closeWindow={this.closeWindow}
    />
    </ErrorBoundary>
</div>

</div>
    )
  }
}

// Loads Google Maps API
// Source: https://www.npmjs.com/package/google-maps-react
export default App
