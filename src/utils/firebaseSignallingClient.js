import firebase from 'firebase/app';

import 'firebase/auth'
import 'firebase/database'

export default class firebaseSignallingClient{
    constructor(){
        const firebaseConfig = {
            apiKey: "AIzaSyBSeo606_VRRqzT4augofoX5P1AyHMkges",
            authDomain: "study-webrtc-react.firebaseapp.com",
            databaseURL: "https://study-webrtc-react-default-rtdb.firebaseio.com",
            projectId: "study-webrtc-react",
            storageBucket: "study-webrtc-react.appspot.com",
            messagingSenderId: "62471008729",
            appId: "1:62471008729:web:0d2960d1e4575c0e1269c8"
          };
          
          // Initialize Firebase
          if(firebase.apps.length===0)firebase.initializeApp(firebaseConfig);
          this.database= firebase.database();
          this.localPeerName='';
          this.remotePeerName='';
    }

    setPeerNames(localPeerName,remotePeerName){
        this.localPeerName=localPeerName;
        this.remotePeerName=remotePeerName;
        console.log({localPeerName})
    }

    get targetRef(){
        return this.database.ref(this.remotePeerName)
    }

    async sendOffer(sessionDescription){
            
        await this.targetRef.set({
            type:'offer',
            sender:this.localPeerName,
            sessionDescription,
            
            })
    }

    async sendAnswer(sessionDescription){
        await this.targetRef.set({
            type:'answer',
            sender:this.localPeerName,
            sessionDescription,
            
            })
        
    }
}