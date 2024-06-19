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

  //make the canvas the same size and in the same location
  // as our video feed
  const canvas = document.getElementById("canvas");
  canvas.style.left = videoFeedEl.offsetLeft;
  canvas.style.top = videoFeedEl.offsetTop;
  canvas.height = videoFeedEl.height;
  canvas.width = videoFeedEl.width;

  ///// THE FACIAL RECOGNITION DATA
  // we KNOW this is (Elon Musk)
  const refFace = await faceapi.fetchImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/220px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg"
  );
  //we grab the reference image, and hand it to detectAllFaces method
  let refFaceAiData = await faceapi
    .detectAllFaces(refFace)
    .withFaceLandmarks()
    .withFaceDescriptors();
  let faceMatcher = new faceapi.FaceMatcher(refFaceAiData);

  // facial detection with points
  setInterval(async () => {
    // get the video feed and hand it to detectAllFaces method
    let faceAIData = await faceapi
      .detectAllFaces(videoFeedEl)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender()
      .withFaceExpressions();

    // console.log(faceAIData);

    // draw on our face/canvas
    //first, clear the canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    // draw our bounding box
    faceAIData = faceapi.resizeResults(faceAIData, videoFeedEl);
    faceapi.draw.drawDetections(canvas, faceAIData);
    faceapi.draw.drawFaceLandmarks(canvas, faceAIData);
    faceapi.draw.drawFaceExpressions(canvas, faceAIData);

    // ask AI to guess age and gender with confidence level
    faceAIData.forEach((face) => {
      const { age, gender, genderProbability, detection, descriptor } = face;
      const genderText = `${gender} - ${
        (Math.round(genderProbability * 100) / 100) * 100
      }`;
      const ageText = `${Math.round(age)} years`;
      const textField = new faceapi.draw.DrawTextField(
        [genderText, ageText],
        face.detection.box.topRight
      );
      textField.draw(canvas);

      let label = faceMatcher.findBestMatch(descriptor).toString();
      // console.log(label)
      let options = { label: "Elon" };
      if (label.includes("unknown")) {
        options = { label: "Not Elon Musk." };
      }
      const drawBox = new faceapi.draw.DrawBox(detection.box, options);
      drawBox.draw(canvas);
    });
  }, 200);
};

run();
