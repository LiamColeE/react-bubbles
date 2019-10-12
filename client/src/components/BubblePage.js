import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const logout = () => {
    localStorage.clear();
    props.history.push("/login");
  }
  useEffect(() => {
    let headers = localStorage.getItem("authKey")
    axios.get("http://localhost:5000/api/colors", { headers: { authorization: headers } })
      .then((res) => {
        console.log(res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  if (colorList === []) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <button onClick={logout}>LogOut</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
