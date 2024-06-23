import { useEffect,useReducer,useState,useRef } from "react";
import RtcClient from "../../utils/RtcClient";

const useRtcClient = () => {

    const [rtcClient, _setRtcClient] = useState(null);
    const [, forceRender] = useReducer((boolean) => !boolean, false);
    const remoteVideoRef = useRef(null);

    const setRtcClient = (rtcClient) => {
        _setRtcClient(rtcClient);
        forceRender();
    };

    useEffect( () => {
        const init = async()=>{
            const client = new RtcClient(remoteVideoRef,setRtcClient);
            await client.setMediaStream();
        };
        init();
    }, []);
    return rtcClient;
};

export default useRtcClient;