import React, { useEffect, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // 映像と音声を取得する設定
    const constraints = {
      video: true,
      audio: false,
    };

    // メディアデバイスの取得
    let stream = null;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          let video = videoRef.current;
          video.srcObject = mediaStream;
          stream = mediaStream;
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
        });
    }

    // cleanup function: component unmount時にstreamを終了させる
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay />;
};

export default VideoComponent;
