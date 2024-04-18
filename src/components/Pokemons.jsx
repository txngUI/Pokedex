import React, { useEffect, useState } from 'react';
import Page from './Page';
import { Button, Typography, Box, Avatar, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
            .then(response => {
                setPokemons(response.data.results);
            })
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery)
    );

    const handlePokemonClick = (pokemonId) => {
        navigate(`/pokemon`, { state: { pokemonId } }); 
    };

    return (
        <Page>
            <Box sx={{ marginBottom: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h1'>Chercher un Pokémon</Typography>
            </Box>

            <TextField
                placeholder='Rechercher...'
                sx={{ marginBottom: 1 }}
                fullWidth
                onChange={handleSearchChange}
            />

            <Typography>{filteredPokemons.length} Pokémon(s) trouvés</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent:'space-between', gap: 2 }}>
                {filteredPokemons.map(pokemon => (
                    <Box key={pokemon.name} height={210} width={210} display="flex" alignItems="center" gap={2} p={2} sx={{ border: '1px solid grey', display: 'flex', flexDirection: 'column', borderRadius: '5px'}}>
                        <Avatar sx={{width: 100, height: 100, marginRight: 1, marginRight: 1}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
                        <Typography>{pokemon.name} </Typography>
                        <Button variant="contained" fullWidth onClick={() => handlePokemonClick(pokemon.url.split('/')[6])}>
                            Voir le Pokémon
                        </Button>
                    </Box>
                ))}
            </Box>
        </Page>
    );
}

export default Pokemons;
