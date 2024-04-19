import React, { useEffect } from "react";
import Page from "./Page";
import { Typography, Box, Chip, Avatar, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import CircularStat from "./CircularStat";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../services/auth";
import {
  addPokemonToPokedex,
  getPokedex,
  removePokemonFromPokedex,
} from "../services/accounts";
import { getDetails } from "../services/pokeService";

function Pokemon() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const pokemonId = state.pokemonId;
  const [pokemon, setPokemon] = React.useState("");
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  const [pokemonStats, setPokemonStats] = React.useState([]);
  const [pokedex, setPokedex] = React.useState([]); 
  const account = getCurrentAccount();

  const handleAddPokemon = (accountID, pokemonID) => {
    addPokemonToPokedex(accountID, pokemonID, pokemon,`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`);
    navigate("/pokedex");
  };

  const handleRemovePokemon = (accountID, pokemonID) => {
    removePokemonFromPokedex(accountID, pokemonID);
    navigate("/pokedex");
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const _details = await getDetails(pokemonId);

      setPokemon(
        _details.forms[0].name.charAt(0).toUpperCase() +
          _details.forms[0].name.slice(1)
      );

      setPokemonStats(
        _details.stats.map((statData) => ({
          name: statData.stat.name,
          value: statData.base_stat,
        }))
      );

      setPokemonTypes(
        _details.types.map((typeData) => typeData.type.name)
      );
    };

    setPokedex(getPokedex(account.id).map(pokemon => pokemon.pokemonId));

    fetchDetails();
  }, [pokemonId]);

  return (
    <Page>
      <Box
        sx={{ marginBottom: 1 }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1"> {pokemon}</Typography>
        <Typography>#{pokemonId}</Typography>
      </Box>

      <Box
        sx={{ marginBottom: 1 }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        {pokemonTypes.map((type, index) => (
          <Chip
            key={index}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            style={{ marginRight: "0.5rem" }}
          />
        ))}
      </Box>

      <Box
        sx={{ marginBottom: 1 }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ width: 200, height: 200 }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        />
      </Box>

      <Box>
        <Typography style={{ color: "black" }}>
          <strong>Statistiques</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          paddingTop: "30px",
        }}
      >
        {pokemonStats.map((stat, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "30%",
            }}
          >
            <CircularStat value={stat.value} />
            <Typography>{stat.name}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ paddingTop: "20px" }}>
        {pokedex.includes(pokemonId) ? (
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={() => handleRemovePokemon(account.id, pokemonId)}
          >
            Supprimer du pokedex
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            style={{ marginBottom: "10px" }}
            onClick={() => handleAddPokemon(account.id, pokemonId)}
          >
            Ajouter dans le pokedex
          </Button>
        )}
        <Button
          style={{ border: "solid 1px" }}
          fullWidth
          onClick={() => navigate("/pokedex")}
        >
          Retour au pokedex
        </Button>
      </Box>
    </Page>
  );
}

export default Pokemon;
