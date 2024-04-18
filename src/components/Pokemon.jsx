import React from 'react';
import Page from './Page';
import { Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Pokemon() {

    const location = useLocation();
    const state = location.state;

    const pokemonId = state.pokemonId;

    return (
        <Page>
            <Box>
                <Typography variant='h1'>Pokemon {pokemonId}</Typography>
            </Box>
        </Page>
    );
}

export default Pokemon;