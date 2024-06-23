import FirebaseSignallingClient from "./firebaseSignallingClient";

export default class RtcClient{
    constructor(remoteVideoRef,setRtcClient){
        const config={iceServers:[{urls:'stun:stun.stunprotocol.org'}]};
        this.rtcPeerConnection=new RTCPeerConnection(config);
        this.FirebaseSignallingClient=new FirebaseSignallingClient();
        this.localPeerName='';
        this.remotePeerName='';
        this._setRtcClient=setRtcClient;
        this.mediaStream = null;
        this.remoteVideoRef=remoteVideoRef;
    }
    setRtcClient(){
        this._setRtcClient(this)//kokowakaran
    }
    async answer(sender,sessionDescription){
        //リモート側から受け取る
        try{
            this.remotePeerName=sender;
            this.setOnicecandidateCallback();
            this.setOntrack();
            await this.setRemoteDescription(sessionDescription);
            const answer = await this.rtcPeerConnection.createAnswer();
            await this.rtcPeerConnection.setLocalDescription(answer)
            await this.sendAnswer();
        }catch(e){
            console.error(e);
        }
    };
    // async answer(sender, sessionDescription) {
    //     try {
    //         this.remotePeerName = sender;
    //         this.setOnicecandidateCallback();
    //         this.setOntrack();
    
    //         await this.setRemoteDescription(sessionDescription);
    //         const answer = await this.rtcPeerConnection.createAnswer();
    //         await this.rtcPeerConnection.setLocalDescription(answer);
    
    //         // ローカルディスクリプションが設定されているか確認するためのログ
    //         console.log("Answer localDescription:", this.rtcPeerConnection.localDescription);
    
    //         await this.sendAnswer();
    //     } catch (e) {
    //         console.error("Error in answer method:", e);
    //     }
    // };

    async getUserMedia(){
        try{
            const constraints ={audio:true,video:true};
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        }catch(error){
            console.error(error);
        }
    }
    async setMediaStream(){
        await this.getUserMedia();
        this.addTracks();
        this.setRtcClient();
    }
    addTracks(){
        this.addAudioTrack();
        this.addVideoTrack();
    }
    addAudioTrack(){
        this.rtcPeerConnection.addTrack(this.audioTrack,this.mediaStream);
        // this.rtcPeerConnection.addTrack();
    }
    addVideoTrack(){
        this.rtcPeerConnection.addTrack(this.videoTrack,this.mediaStream);
    }
    get audioTrack(){
        return this.mediaStream.getAudioTracks()[0];
    }
    get videoTrack(){
        return this.mediaStream.getVideoTracks()[0];
    }
    async offer(){
        const sessionDescription = await this.createOffer();
        await this.setLocalDescription(sessionDescription);
        await this.sendOffer();
    }

    async createOffer(){
        try{
            return await this.rtcPeerConnection.createOffer();
        }catch(e){
            console.error(e);
        }
    }
    async setLocalDescription(sessionDescription){
        try{
            await this.rtcPeerConnection.setLocalDescription(sessionDescription);
        }catch(e){
            console.error(e);
        }
    }
    async sendOffer(){
        this.FirebaseSignallingClient.setPeerNames(this.localPeerName,this.remotePeerName)
        console.log(this.localPeerName)
        await this.FirebaseSignallingClient.sendOffer(this.localDescription);
    }
    setOntrack(){
        this.rtcPeerConnection.ontrack=(rtcTrackEvent)=>{
            if(rtcTrackEvent.track.kind!=='video')return;

            const remoteMediaStream=rtcTrackEvent.streams[0];
            this.remoteVideoRef.current.srcObject=remoteMediaStream;
            this.setRtcClient();
        };
        this.setRtcClient();
    }
    async connect(remotePeerName){
        this.remotePeerName = remotePeerName;
        this.setOnicecandidateCallback();
        this.setOntrack();
        await this.offer();
        this.setRtcClient();
    }
    setRemoteDescription(sessionDescription){
        this.rtcPeerConnection.setRemoteDescription(sessionDescription)
    }
    get localDescription(){
        return this.rtcPeerConnection.localDescription.toJSON();
    }


    async sendAnswer(){
        this.FirebaseSignallingClient.setPeerNames(
            this.localPeerName,this.remotePeerName
        );
        await this.FirebaseSignallingClient.sendAnswer(this.localDescription);
        console.log(this.localDescription)
    }


    

    setOnicecandidateCallback(){
        this.rtcPeerConnection.onicecandidate=(candidate)=>{
            if(candidate){
                //``remoteへcandidateを通知する
            }
        }
    }
    startListening(localPeerName){
        this.localPeerName=localPeerName
        this.setRtcClient();
        this.FirebaseSignallingClient.database
        .ref(localPeerName)
        .on('value',async(snapshot)=>{
            const data = snapshot.val();
            if(data === null)return;
            const{sender,sessionDescription,type}=data;
            switch(type){
                case 'offer':
                    await this.answer(sender,sessionDescription);
                    break;
                default:
                    break;
            }
        })
    }
    
}
