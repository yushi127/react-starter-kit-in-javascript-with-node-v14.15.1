import React, { useState } from 'react';
import InputFormLocal from './InputFormLocal'
import InputFormRemote from './InputFormRemote'
import VideoArea from './VideoArea'


const App = () => {
  const [localPeerName, setLocalPeerName]=useState('');
  const [remotePeerName, setRemotePeerName]=useState('');
  console.log({localPeerName,remotePeerName});
  return <>
    <InputFormLocal 
    localPeerName={localPeerName}
    setLocalPeerName={setLocalPeerName} 
    />
    <InputFormRemote 
    remotePeerName={remotePeerName}
    localPeerName={localPeerName}
    setRemotePeerName={setRemotePeerName} 
    />
    <VideoArea 
    remotePeerName={remotePeerName}
    localPeerName={localPeerName}
    />
  </>;
}

export default App;
