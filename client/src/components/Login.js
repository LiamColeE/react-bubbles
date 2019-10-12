import React from "react";
import axios from 'axios'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  const login = () => {
    let username = document.querySelector("#username-input").value;
    let password = document.querySelector('#password-input').value;

    axios.post("http://localhost:5000/api/login",{username,password})
    .then((res) => {
      console.log(res);
      localStorage.setItem("authKey", res.data.payload);
      props.history.push("/BubblePage");
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <h1>Login</h1>
      <p>UserName</p>
      <input id="username-input"></input>
      <p>Password</p>
      <input id="password-input"></input>
      <button style={{display:"block", width:"100px", margin:"10px auto"}} onClick={login}>Login</button>
    </div>
  );
};

export default Login;
