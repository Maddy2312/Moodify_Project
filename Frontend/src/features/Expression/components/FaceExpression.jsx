import React, { useEffect, useRef, useState } from "react";
import { loadModel, startCamera } from "../utils/utils"; 

const FaceExpression = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Loading model...");
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {

    loadModel({ faceLandmarkerRef, setExpression, setModelLoaded });
  }, []);


  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detection</h2>

      <video
        ref={videoRef}
        width="480"
        height="360"
        style={{ borderRadius: "10px" }}
      />

      <h3>{expression}</h3>

      <button onClick={()=>{startCamera({ modelLoaded, videoRef, faceLandmarkerRef, animationRef, setExpression })}} disabled={!modelLoaded}>
        Start
      </button>
    </div>
  );
};

export default FaceExpression;