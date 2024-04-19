import React, { useEffect, useState } from "react";
import Page from "./Page";
import { Button, Typography, Box, Avatar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../services/auth";
import { getPokedex } from "../services/accounts";
import { getPokemons } from "../services/pokeService";

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const account = getCurrentAccount();
  const [pokedex, setPokedex] = useState([]); 

  useEffect(() => {
    const fetchPokemons = async () => {
        const _pokemons = await getPokemons();
        setPokemons(_pokemons);
        setPokedex(getPokedex(account.id).map(pokemon => pokemon.pokemonId));
    }
    fetchPokemons();
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  const handlePokemonClick = (pokemonId) => {
    navigate(`/pokemon`, { state: { pokemonId } });
  };

  return (
    <Page>
      <Box sx={{ marginBottom: 1, display: "flex", justifyContent: "center" }}>
        <Typography variant="h1">Chercher un Pokémon</Typography>
      </Box>

      <TextField
        placeholder="Rechercher..."
        sx={{ marginBottom: 1 }}
        fullWidth
        onChange={handleSearchChange}
      />

      <Typography>{filteredPokemons.length} Pokémon(s) trouvés</Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {filteredPokemons.map(
          (pokemon) =>
            !pokedex.includes(pokemon.url.split("/")[6]) && (
              <Box
                key={pokemon.name}
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
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    pokemon.url.split("/")[6]
                  }.png`}
                />
                <Typography>{pokemon.name} </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handlePokemonClick(pokemon.url.split("/")[6])}
                >
                  Voir le Pokémon
                </Button>
              </Box>
            )
        )}
      </Box>
    </Page>
  );
}

export default Pokemons;
