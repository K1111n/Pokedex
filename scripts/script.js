function searchForPokemonWhenThreeCharactersEntered() {
  if (input.value.length < 3) {
    return;
  } else {
    searchForPokemon();
  }
}

function searchForPokemon() {}

let pokemonIDsArray = [];
let pokemonNamesArray = [];
let pokemonImgsArray = [];
let pokemonTypesArray = [];

async function fetchPokemon() {
  fetchPokemonNames();
  pokemonNamesArray = fetchPokemonNames();
  for (i = 1; i < pokemonNamesArray.length; i++) {
    let j = i - 1;
    fetchPokemonImgs(i);
    fetchPokemonIDs(i);    

    let responsePokemonTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let responsePokemonTypesAsJson = await responsePokemonTypes.json();
    console.log(responsePokemonTypesAsJson.types[0].type.name);
    if (responsePokemonTypesAsJson.types.length == 2) {
      console.log(responsePokemonTypesAsJson.types[1].type.name)
    }

    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML += pokeDivTemplate(i,j,responsePokemonTypesAsJson);
  }
  pokemonSection.innerHTML += loadButtonTemplate();
}

async function fetchPokemonNames() {
  let responsePokemonNames = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  let responsePokemonNamesAsJson = await responsePokemonNames.json();
  pokemonNamesArray = responsePokemonNamesAsJson.results;
  console.log(pokemonNamesArray);
  return pokemonNamesArray;
}

async function fetchPokemonImgs(i) {
  let responsePokemonImgs = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  let responsePokemonImgsAsJson = await responsePokemonImgs.json();
  pokemonImgsArray.push(responsePokemonImgsAsJson);  
  return pokemonImgsArray;
}

async function fetchPokemonIDs(i) {
  let responsePokemonIDs = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  let responsePokemonIDsAsJson = await responsePokemonIDs.json();
  pokemonIDsArray.push(responsePokemonIDsAsJson);
  return pokemonIDsArray;
}

async function fetchPokemonTypes(i) {
}

function pokeDivTemplate(i,j,responsePokemonTypesAsJson) {
  pokemonNamesArray = fetchPokemonNames();
  pokemonImgsArray = fetchPokemonImgs(i);
  return /*html*/ `
        <div class="pokemonDiv">
            <p>#${pokemonImgsArray[j].id}</p>
            <p>${pokemonNamesArray[i].name}</p>
            <img src="${pokemonImgsArray[j].sprites.other['official-artwork'].front_default}" alt="pokemon${i}">
            <p>${responsePokemonTypesAsJson.types[0].type.name}</p>
        </div>
    `;
}

function loadButtonTemplate() {
  return /*html*/ `
    <div>
        <button class="loadButton">Load more Pokemon</button>
    </div>
  `;
}