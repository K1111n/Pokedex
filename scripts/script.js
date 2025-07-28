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

async function renderPokemon() {
    await fetchPokemonNames();
    let j = 0;
  for (i = 0; i < pokemonNamesArray.length; i++) {    
    j++;
    await fetchPokemonImgs(j);
    await fetchPokemonIDs(j);    
    await fetchPokemonTypes(j,i);    
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML +=  await pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`pokemonDiv${i}`);
    pokeDiv.innerHTML += await pokemonTypesTemplate(j,i);
  }
  pokemonSection.innerHTML += loadButtonTemplate();
}

function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

async function fetchPokemonNames() {
  let responsePokemonNames = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0"
  );
  let responsePokemonNamesAsJson = await responsePokemonNames.json();
  for (k = 0; k < responsePokemonNamesAsJson.results.length; k++) {    
    let pushThisPokemonName = capitalize(responsePokemonNamesAsJson.results[k].name);
    pokemonNamesArray.push(pushThisPokemonName);
  }
  console.log(pokemonNamesArray);
  return pokemonNamesArray;
}

async function fetchPokemonImgs(j) {
  let responsePokemonImgs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
  let responsePokemonImgsAsJson = await responsePokemonImgs.json();
  pokemonImgsArray.push(responsePokemonImgsAsJson.sprites.other['official-artwork'].front_default); 
  return pokemonImgsArray;
}

async function fetchPokemonIDs(j) {
  let responsePokemonIDs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
  let responsePokemonIDsAsJson = await responsePokemonIDs.json();
  pokemonIDsArray.push(responsePokemonIDsAsJson.id);
  return pokemonIDsArray;
}

async function fetchPokemonTypes(j,i) {  
    let responsePokemonTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
    let responsePokemonTypesAsJson = await responsePokemonTypes.json();
    pokemonTypesArray = responsePokemonTypesAsJson;
    return pokemonTypesArray;
}

 async function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}">
            <p>#${pokemonIDsArray[i]} ${pokemonNamesArray[i]}</p>
            <br>
            <img src="${pokemonImgsArray[i]}" alt="pokemon${i}">
        </div>
    `;
}

async function pokemonTypesTemplate(j,i) {
  await fetchPokemonTypes(j);
  if (pokemonTypesArray.types.length == 2) {
    return /*html*/ `
      <p>${pokemonTypesArray.types[0].type.name} ${pokemonTypesArray.types[1].type.name}</p>
      `
  } else {
    return /*html*/ `
      <p>${pokemonTypesArray.types[0].type.name}</p>
      `}
}

function loadButtonTemplate() {
  return /*html*/ `
    <div>
        <button class="loadButton">Load more Pokemon</button>
    </div>
  `;
}