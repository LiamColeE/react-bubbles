import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, history, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.authKey;
    useEffect(() => {
      // you can add a loading animation with this
      setLoading(true);
      const fn = () => {
  
        // if the token doesnt exist in our local storage, push back to homepage
        if (!token) {
          setLoading(false);
          // you can change this to route to anything if token is not in localStorage
          history.replace("/login")
        }
      }
      fn();
      setLoading(false);
    },[path, history, token])
    
    // we're trying to mimic a Route component here.
    const render = props =>
    token ? <Component {...props} /> : null;
    return <Route exact path={path} render={render} {...rest} loading={loading}/>;
  }
  
  export default withRouter(ProtectedRoute)
  