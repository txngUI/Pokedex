import React, { useState } from 'react'
import Page from './Page'
import { Button, Typography, Box, Avatar, ButtonBase, TextField } from '@mui/material'
import { createAccount } from '../services/accounts.js'
import { useNavigate } from "react-router-dom";

function CreationUser() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [name, setName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const avatars = [
        {url: 'src/assets/1.jpg', title: 1},
        {url: 'src/assets/2.jpg', title: 2},
        {url: 'src/assets/3.jpg', title: 3},
    ]

    const handleAvatarClick = (index) => {
        setSelectedAvatar(index);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleCreateAccount = () => {
        if (selectedAvatar !== null && name.trim() !== '') {
            createAccount(name, selectedAvatar + 1);

            setName('');
            setSelectedAvatar(null);
            navigate('/');
        }
    }

    React.useEffect(() => {
        setIsFormValid(selectedAvatar !== null && name.trim() !== '');
    }, [selectedAvatar, name]);

    return (
        <Page>
            <Box sx={{marginBottom:1, display:'flex',justifyContent:'center'}}>
                <Typography variant='h1'>Créer un utilisateur</Typography>
            </Box>

            <Box sx={{marginBottom:1}}>
                <Typography>Choisir un Avatar</Typography>
            </Box>

            <Box sx={{marginBottom:1, display:'flex'}}>
                {avatars.map((avatar, index) => (
                    <ButtonBase key={index} style={{ borderRadius:'100%'}}>
                        <Avatar
                            key={index}
                            src={avatar.url}
                            sx={{margin:1, filter: selectedAvatar === index ? 'none' : 'grayscale(100%)'}}
                            onClick={() => handleAvatarClick(index)}
                        />
                    </ButtonBase>
                ))}
            </Box>

            <TextField id="outlined-basic" variant="outlined" placeholder='nom' sx={{marginBottom:1}} fullWidth value={name} onChange={handleNameChange} />

            <Box sx={{marginBottom:1}}>
                <Button variant="contained" fullWidth disabled={!isFormValid} onClick={handleCreateAccount}>Créer un compte</Button>
            </Box>
        </Page>
    )
}

export default CreationUser