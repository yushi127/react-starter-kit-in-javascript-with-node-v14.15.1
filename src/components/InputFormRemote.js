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

export default function SignIn({localPeerName, remotePeerName, setRemotePeerName }) {
  const label ='相手の名前'
  const [desabled,setDisabled]=useState(true);
  const [name,setName]=useState('')
  const [isComoised,setIscomposed]=useState(false);
  useEffect(()=>{
    const disabled = name === '';
    setDisabled(disabled);
  },[name]);
  const initializeRemotePeer = useCallback((e) =>{
    setRemotePeerName(name);
    e.preventDefault();
    },
    [name,setRemotePeerName]);  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  if (localPeerName ==='')return <></>;
  if (remotePeerName !== '') return <></>;

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
                console.log({e});
                if (isComoised) return;
                if (e.target.value==='')return;
                if (e.key==='Enter') {initializeRemotePeer(e)}
                }}
              value = {name}
              label={label}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={desabled}
              onClick={(e)=>initializeRemotePeer(e)}
            >
              決定
            </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
