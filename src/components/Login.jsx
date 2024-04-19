import React from 'react'
import Page from './Page'
import { Button, Typography, Box, Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { getAccounts, deleteAccount } from '../services/accounts.js'
import DeleteIcon from '@mui/icons-material/Delete';
import {setCurrentAccount} from '../services/auth.js'
import Divider from '@mui/material/Divider';

function Login() {

    const handleDelete = (index) => {
        deleteAccount(index)
        window.location.reload()
    }

    const navigate = useNavigate();

    const handleLogin = (index) => {
        setCurrentAccount(index)
        navigate('/pokedex');
    }

    return (
        <Page>
            <Box sx={{marginBottom:1, display:'flex',justifyContent:'center'}}>
                <Typography variant='h1'>Connexion au pokedex</Typography>
            </Box>

            {getAccounts().map((account, index) => (
                <Box key={index} sx={{marginBottom:1, display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Button key={index} onClick={() => handleLogin(account.id)} fullWidth style={{justifyContent:'left'}}>
                        <Avatar src={`src/assets/${account.avatar}.jpg`} sx={{marginRight:1}} />
                        <Typography style={{margin:1, paddingLeft:20}}> {account.name}</Typography>
                    </Button>

                    <Button onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                    </Button>
                </Box>  
            ))}

            <Divider sx={{marginBottom:1}} />

            <Box sx={{marginBottom:1}}>
                <Button variant="contained" fullWidth onClick={() => navigate('/CreationUser')}>Créer un compte</Button>
            </Box>
        </Page>
    )
}

export default Login