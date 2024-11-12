import React from 'react'
import Lottie from "lottie-react";
// import groovyWalkAnimation from "./groovyWalk.json";
import loaderAnimation from "../assets/loader.json";

const Loader = (props) => {
  return (<>
    <Lottie animationData={loaderAnimation} style={{ height: props.height || "67vh" }} /></>
  )
}

export default Loader