![face-api](/public/images/readme-image-example.png)

# Facial Recognition with JavaScript using face-api.js for face detection and face recognition in the browser.

The face expression recognition model is lightweight, fast and provides reasonable accuracy. The model has a size of roughly 310kb and it employs depthwise separable convolutions and densely connected blocks. It has been trained on a variety of images from publicly available datasets as well as images scraped from the web. Note, that wearing glasses might decrease the accuracy of the prediction results.

### To start up the app:

1. run yarn install in the root directory
2. run yarn start to start node on server.js
3. go to http://localhost:5000

### Features:

- Age recognition

- Gender recognition

- Mood = Happy, Neutral, Angry, Sad

- Face recognition using Elon Musk as the comparison

### images in public were generated with fooocus. None are known to have any actual people in them

### [Face API Github](https://github.com/justadudewhohacks/face-api.js)

### Loading 4 primary models

```javascript
await Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.ageGenderNet.loadFromUri("./models"),
]);
```

### Stock photos I use, Elon Musk:

- https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/220px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg