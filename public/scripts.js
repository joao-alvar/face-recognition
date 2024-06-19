console.log(faceapi);

const run = async () => {
  //we need to load our models
  //loading the models is going to use await
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const videoFeedEl = document.getElementById("video-feed");
  videoFeedEl.srcObject = stream;

  //we need to load the models
  // pre-trained machine learning for the facial detection!
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.ageGenderNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  ]);
};

run();
