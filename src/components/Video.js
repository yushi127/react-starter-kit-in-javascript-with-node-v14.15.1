import React, {useRef, useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import useDimensions from "./hooks/useDimensions";
import Typography from '@mui/material/Typography';
import { CardActionArea, cardActionAreaClasses } from "@mui/material";
import VolumeButton from "./VolumeButton";
import AudioAnalyser from "./AudioAnalyser";

const Video = ({rtcClient,isLocal,name,videoRef}) => {
  const [muted,setMuted]=useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);
  if(videoRef.current) console.log({isLocal,srcObject:videoRef.current.srcObject});
  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video 
         autoPlay muted={isLocal || muted} ref={videoRef}
         width={dimensionsCard.width}
         />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {name}
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
         <VolumeButton isLocal={isLocal} muted={muted} rtcClient={rtcClient} setMuted={setMuted} />

         {!muted && videoRef.current && videoRef.current.srcObject &&(
         <AudioAnalyser audio={videoRef.current.srcObject} />
         )}
      </CardActions>
    </Card>
  );
}

export default Video;
