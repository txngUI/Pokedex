import React, { useState, useEffect } from "react";
import Page from "./Page";
import { Button, Typography, Box, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { getCurrentAccount } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { getPokedex } from "../services/accounts";

function Pokedex() {
  const account = getCurrentAccount();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const loadPokedex = async () => {
      const pokedex = await getPokedex(account.id);
      setPokemons(pokedex);
    };

    loadPokedex();
  }, []);

  const handlePokemonClick = (pokemonId) => {
    console.log(pokemonId); 
    navigate(`/pokemon`, { state: { pokemonId } });
  };

  return (
    <Page>
      <Box sx={{ marginBottom: 1, display: "flex", justifyContent: "center" }}>
        <Typography variant="h1">Pokedex</Typography>
      </Box>

      {(!account.pokedex || account.pokedex.length === 0) && (
        <Typography>Votre Pokedex est vide</Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {pokemons.map((pokemon, index) => (
          <Box
            key={index}
            height={210}
            width={210}
            display="flex"
            alignItems="center"
            gap={2}
            p={2}
            sx={{
              border: "1px solid grey",
              display: "flex",
              flexDirection: "column",
              borderRadius: "5px",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                marginRight: 1,
                marginRight: 1,
              }}
              src={pokemon.imageUrl}
              alt={pokemon.pokemonName}
            />
            <Typography>{pokemon.pokemonName} </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handlePokemonClick(pokemon.pokemonId)}
            >
              Voir le Pokémon
            </Button>
          </Box>
        ))}
      </Box>

      <Divider sx={{ marginBottom: 1 }} />

      <Box sx={{ marginBottom: 1, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/pokemons")}
        >
          Chercher un pokémon
        </Button>
      </Box>
    </Page>
  );
}

export default Pokedex;
