import React from 'react'
import {Box, Container,Card, Typography, Avatar, Button} from '@mui/material'
import logo from '../assets/logo.png'
import { getCurrentAccount, logout } from '../services/auth.js'
import { useNavigate } from "react-router-dom";

function Page({children}) {

  const account = getCurrentAccount();

  const navigate = useNavigate();

  const disconnect = () => {
    logout();
    navigate('/');
  }

  return (
    <Box>
        <Box sx={{backgroundColor:"#F8F4F4",minHeight:'100vh'}}>
        <Container maxWidth="sm">
          <Box sx={{paddingTop:5,paddingBottom:6}}>
            <Box sx={{marginBottom:5,maxWidth:'300px',marginX:'auto'}}>
                <img src={logo} alt="logo pokemon" />
            </Box>

            { account ? (
              <Box sx={{display:'flex',alignItems:'center' ,justifyContent:'center',marginBottom:2}}>
                  <Avatar src={`src/assets/${account.avatar}.jpg`} sx={{marginRight:1}} />
                  <Typography>Bonjour {account.name}</Typography>
                  <Button variant="contained" sx={{marginLeft:2}} onClick={() => disconnect()}>Se déconnecter</Button>
              </Box>
            ) : null}

            <Card sx={{padding:2}}>
                {children}
            </Card>
          </Box>
        </Container>
        </Box>
    </Box>
  )
}

export default Page