import React, { useEffect, useState, useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { rect } from './utils';
import './App.css';

function App() {
  const webcam = useRef(null);
  const canvas = useRef(null);

  const runcoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detet(net)
    }, 10);
  };

  const detet = async (net) => {
    if (typeof webcam.current !== 'undefined' && webcam.current !== 'null' && webcam.current.video.readyState === 4) { //check for data
      //get video properties
      const video = webcam.current.video;
      const videowidth = webcam.current.video.videoWidth;
      const videoheight = webcam.current.video.videoHeight
      //setting video properties
      webcam.current.video.width = videowidth;
      webcam.current.video.height = videoheight;
      //setting canvas properties
      canvas.current.width = videowidth;
      canvas.current.height = videoheight;
      //predictions
      const obj = await net.detect(video)
      //console.log(obj);
      //draw mesh
      const ctx = canvas.current.getContext('2d');
      rect(obj, ctx);
    }
  }
  useEffect(() => { runcoco() }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcam}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvas}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
