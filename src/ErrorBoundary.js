import React from 'react'

//this is from here : https://blog.pusher.com/react-error-boundaries/ 
class ErrorBoundary extends React.Component{
  constructor (props){
  super(props);
  this.state={ error: null,
              info:null};
}


componentDidCatch(error, info){
  this.setState({error: error,
                 info:info});
}

render(){
  if (this.state.info){

    return  (

      <div>
         <h2>Something went wrong.</h2>
         <details style={{ whiteSpace: "pre-wrap" }}>
           {this.state.error && this.state.error.toString()}
           <br />
           {this.state.errorInfo.componentStack}
         </details>
       </div>
    );
  }
  return this.props.children;
  }
}

export default ErrorBoundary
