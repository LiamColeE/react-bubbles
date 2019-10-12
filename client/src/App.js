import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import BubblePage from "./components/BubblePage"

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/BubblePage" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
