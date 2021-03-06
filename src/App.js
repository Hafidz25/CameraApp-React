import React, {useRef, useState, useEffect} from "react";

function App() {

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  const [hasPhoto, sethasPhoto] = useState(false)

  const getVideo = useState(() => {
    navigator.mediaDevices.getUserMedia({video: {width: 1080, height: 720}}).then(stream => {
      let video = videoRef.current
      video.srcObject = stream
      video.play()
    }).catch(err => {
      console.error(err)
    })
  })

  const cekrek = () => {
    const width = 414
    const height = width / (16/9)

    let video = videoRef.current
    let photo = photoRef.current

    photo.width = width
    photo.height = height

    let ctx = photo.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)
    sethasPhoto(true)
  }

  const closePhoto = () => {
    let photo = photoRef.current
    let ctx = photo.getContext('2d')
    ctx.clearRect(0, 0, photo.width, photo.height)
    sethasPhoto(false)
  }
  
  // useEffect(() => {
  //   getVideo()
  // }, [videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={cekrek}>CEKREK!</button>
      </div> 
      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>
      </div>
    </div>
  );
}

export default App;
