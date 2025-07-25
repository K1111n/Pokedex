function searchForPokemonWhenThreeCharactersEntered() {
  if (input.value.length < 3) {
    return;
  } else {
    searchForPokemon();
  }
}

function searchForPokemon() {}

async function fetchPokemon() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  let responseAsJson = await response.json();
  console.log(responseAsJson);
}
