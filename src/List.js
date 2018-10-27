import React from 'react'
class Nlist extends React.Component {
  constructor (props){
  super (props);
    this.state = {locations:'',showingInfoWindow: false,activeMarker: {},selectedPlace: {},phone:"",myId:"",showingWindow:false ,coords: { lat:34.8482, lng:-82.3999 }}
//
}

onNewLi = (props, marker, e)=>{
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingWindow: "true"
  })
  this.props.onMarkerClick( props, marker, e)
  this.onUpdate()
}

onUpdate = ()=>{
this.setState({showingWindow:true})
}
onClose = ()=>{
this.setState({showingWindow:false})

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
          >
          <div className="marker-title" onClick={event=>this.onNewLi(marker,this.props, marker)}>{marker.title}</div>
          {this.state.showingWindow&&this.props.id===marker.id?
          <div className="extra-data">

          <div>
            <h3>{this.props.name}</h3>
            <h4>{this.props.address}</h4>
            <h4>{this.props.city}</h4>
            <h4>{this.props.phone}</h4>
          </div>
          </div>:null
        }


          </li>
      )}
        </ul>

        {this.state.showingWindow?
      <button onClick={this.onClose}>Close Details</button>:null
    }

      </div>
    )
  }
}

export default Nlist
