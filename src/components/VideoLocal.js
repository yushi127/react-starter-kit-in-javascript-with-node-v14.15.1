import React, {useEffect, useRef} from "react";
import Video from './Video'

const VideoLocal =({rtcClient}) => {
    const videoRef =useRef(null);
    const currentVideoRef = videoRef.current;
    const mediaStream = rtcClient.mediaStream;

    useEffect(()=>{
        if(currentVideoRef === null) return;
        const getMedia = () => {
            try {
                /* ストリームを使用 */
                currentVideoRef.srcObject = mediaStream;
                } catch (err) {
                /* エラーを処理 */
                console.error(err);
                }
        }
        getMedia();
          
    },[currentVideoRef,mediaStream]);
    if(rtcClient.localPeerName === '' || rtcClient.remotePeerName === '')return <></>
    return <Video isLocal={true} name={rtcClient.localPeerName} rtcClient={rtcClient} videoRef={videoRef}/>
}

export default VideoLocal;