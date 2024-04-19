import axios from "axios";

export async function getPokemons() {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=150"
  );
  return response.data.results;
}

export async function getDetails(name) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}