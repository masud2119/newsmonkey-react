import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";


export default class App extends Component {
  render() {
    return (
      <div>
        
        <Navbar />
        <News neageSize ={5}  country ='us'  category = 'business'/>
        <spinner/>
       
      </div>
    );
  }
}
