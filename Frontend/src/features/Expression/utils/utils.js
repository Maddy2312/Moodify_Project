import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// Load Model
export const loadModel = async ({ faceLandmarkerRef, setExpression, setModelLoaded }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  setExpression("Click Start");
  setModelLoaded(true);
};

export const startCamera = async ({ modelLoaded, videoRef , faceLandmarkerRef, animationRef, setExpression }) => {
  if (!modelLoaded) return;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoRef.current.srcObject = stream;
  await videoRef.current.play();

  detect({videoRef, faceLandmarkerRef, animationRef, setExpression });
};

const detect = ({videoRef, faceLandmarkerRef, animationRef, setExpression }) => {
  if (!faceLandmarkerRef.current || !videoRef.current) return;

  const results = faceLandmarkerRef.current.detectForVideo(
    videoRef.current,
    Date.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
    const frown = getScore("mouthFrownLeft") + getScore("mouthFrownRight");
    const surprise =
      getScore("eyeWideLeft") + getScore("eyeWideRight") + getScore("jawOpen");

    if (smile > 0.6) {
      setExpression("😊 Happy");
    } else if (frown >= 0.1) {
      setExpression("😢 Sad");
    } else if (surprise > 0.1) {
      setExpression("😲 Surprised");
    }
  }

  animationRef.current = requestAnimationFrame(()=>detect({videoRef, faceLandmarkerRef, animationRef, setExpression }));
};
