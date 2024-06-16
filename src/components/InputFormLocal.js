import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect,useCallback } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        yushi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({ rtcClient,setRtcClient }) {
  const label ='あなたの名前'
  const [disabled,setDisabled]=useState(true);
  const [name,setName]=useState('')
  const [isComposed,setIscomposed]=useState(false);
  useEffect(()=>{
    const disabled = name === '';
    setDisabled(disabled);
  },[name]);
  const initializeLocalPeer = useCallback((e) =>{
    rtcClient.localPeerName=name;
    setRtcClient(rtcClient);
    console.log({rtcClient})
    // e.preventDefault();
    console.log({name})
    },
    [name,rtcClient,setRtcClient]);  
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  if (rtcClient.localPeerName !=='')return <></>;
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            {label}を入力してください
          </Typography>
          <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              name="name"
              onChange={(e)=>setName(e.target.value)}
              onCompositionEnd={()=>setIscomposed(false)}
              onCompositionStart={()=>setIscomposed(true)}
              onKeyDown={(e)=>{
                if (isComposed) return;
                if (e.target.value==='')return;
                if (e.key==='Enter') {initializeLocalPeer(e)}
              }}
              value = {name}
              label={label}
            />
            <Button
              type="submit"
              fullWidth
              disabled={disabled}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>initializeLocalPeer(e)}
            >
              決定
            </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
