import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const VideoArea = ({localPeerName,remotePeerName}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <VideoLocal name={localPeerName}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VideoRemote name={remotePeerName}/>
        </Grid>
      </Grid>
    </Box>
  );
}
export default VideoArea;