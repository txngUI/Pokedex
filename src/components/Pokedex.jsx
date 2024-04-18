import React from 'react'
import Page from './Page'
import { Button, Typography, Box, Avatar } from '@mui/material'
import Divider from '@mui/material/Divider';
import { getCurrentAccount } from '../services/auth';
import { useNavigate } from "react-router-dom";

function Pokedex() {

    const account = getCurrentAccount();
    const navigate = useNavigate();

    return (
        <Page>
            <Box sx={{marginBottom:1, display:'flex',justifyContent:'center'}}>
                <Typography variant='h1'>Pokedex</Typography>
            </Box>

            {!account.pokedex ? (
                <Typography>Votre Pokedex est vide</Typography>
            ) : account.pokedex.map((pokemon, index) => () => (
                <Box key={index} sx={{marginBottom:1, display:'flex', flexDirection:'row', alignItems:'center'}} fullWidth>
                    <Avatar src={`src/assets/${pokemon}.jpg`} sx={{marginRight:1}} />
                    <Typography style={{margin:1}}> {pokemon}</Typography>
                </Box>
            ))}

            <Divider sx={{marginBottom:1}} />

            <Box sx={{marginBottom:1, display:'flex',justifyContent:'center'}}>
                <Button variant="contained" fullWidth onClick={() => navigate('/pokemons')}>Chercher un pokémon</Button>
            </Box>
        </Page>
    )
}

export default Pokedex