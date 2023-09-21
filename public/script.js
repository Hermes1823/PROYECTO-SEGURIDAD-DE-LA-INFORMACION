const elVideo = document.getElementById('video')  //tomamos el elemento video

//ahora reproducimos lo que hay en la webcam a travez de elemento video

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)


  const cargarCamara  = () => {

    navigator.getMedia(
        // Restricciones (contraints) *Requerido
        {
          video: true,
          audio: false,
        },
      
       //stream => elVideo.strObject = stream,

       (stream) => {
        // Asigna el flujo de la cámara al elemento de video correctamente
        elVideo.srcObject = stream; // Cambia "strObject" a "srcObject"
          },
       console.error
    
        
      )
  }

    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/libreriafapi'),
        faceapi.nets.ageGenderNet.loadFromUri('/libreriafapi'),
        faceapi.nets.faceExpressionNet.loadFromUri('/libreriafapi'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/libreriafapi'),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri('/libreriafapi'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/libreriafapi'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/libreriafapi'),
        faceapi.nets.tinyFaceDetector.loadFromUri('/libreriafapi'),
    ]).then(cargarCamara)

    

  
  elVideo.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(elVideo)
    document.body.append(canvas)
    const displaySize = { width: elVideo.width, height: elVideo.height }
    // resize the overlay canvas to the input dimensions
    faceapi.matchDimensions(canvas, displaySize)

    setInterval( async () => {

      canvas.getContext('2d').clearRect(0, 0, canvas.whidt, canvas.height)

      const detections = await faceapi.detectAllFaces(elVideo)
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //dibujar
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    
    })
    
  })

