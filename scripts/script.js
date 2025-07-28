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
    await fetchPokemonTypes(j);    
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML +=  await pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`pokemonDiv${i}`);
    changeBackgroundColorToTypeColor(i);
    pokeDiv.innerHTML += await pokemonTypesTemplate(j);
  }
  pokemonSection.innerHTML += loadButtonTemplate();
}

function changeBackgroundColorToTypeColor(i) {
  let firstTypeWhenThereAreTwoTypes = `${pokemonTypesArray[0]}`;
  let firstTypeWhenThereIsOneType = `${pokemonTypesArray}`;
  if (firstTypeWhenThereAreTwoTypes == "Fire" || firstTypeWhenThereIsOneType == "Fire") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "red";
  } else if (firstTypeWhenThereAreTwoTypes == "Normal" || firstTypeWhenThereIsOneType == "Normal") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "lightgrey";
  } else if (firstTypeWhenThereAreTwoTypes == "Water" || firstTypeWhenThereIsOneType == "Water") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "lightblue";
  } else if (firstTypeWhenThereAreTwoTypes == "Electric" || firstTypeWhenThereIsOneType == "Electric") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "lightyellow";
  } else if (firstTypeWhenThereAreTwoTypes == "Grass" || firstTypeWhenThereIsOneType == "Grass") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "lightgreen";
  } else if (firstTypeWhenThereAreTwoTypes == "Ice" || firstTypeWhenThereIsOneType == "Ice") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "aqua";
  } else if (firstTypeWhenThereAreTwoTypes == "Fighting" || firstTypeWhenThereIsOneType == "Fighting") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "darkred";
  } else if (firstTypeWhenThereAreTwoTypes == "Poison" || firstTypeWhenThereIsOneType == "Poison") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "purple";
  } else if (firstTypeWhenThereAreTwoTypes == "Ground" || firstTypeWhenThereIsOneType == "Ground") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "darkgrey";
  } else if (firstTypeWhenThereAreTwoTypes == "Flying" || firstTypeWhenThereIsOneType == "Flying") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstTypeWhenThereAreTwoTypes == "Psychic" || firstTypeWhenThereIsOneType == "Psychic") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF1493";
  } else if (firstTypeWhenThereAreTwoTypes == "Bug" || firstTypeWhenThereIsOneType == "Bug") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#228B22";
  } else if (firstTypeWhenThereAreTwoTypes == "Rock" || firstTypeWhenThereIsOneType == "Rock") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#696969";
  } else if (firstTypeWhenThereAreTwoTypes == "Ghost" || firstTypeWhenThereIsOneType == "Ghost") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstTypeWhenThereAreTwoTypes == "Dragon" || firstTypeWhenThereIsOneType == "Dragon") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstTypeWhenThereAreTwoTypes == "Dark" || firstTypeWhenThereIsOneType == "Dark") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "lightpurple";
  } else if (firstTypeWhenThereAreTwoTypes == "Steel" || firstTypeWhenThereIsOneType == "Steel") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstTypeWhenThereAreTwoTypes == "Fairy" || firstTypeWhenThereIsOneType == "Fairy") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF00FF";
  }
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

async function fetchPokemonTypes(j) {  
    let responsePokemonTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
    let responsePokemonTypesAsJson = await responsePokemonTypes.json();
    if (responsePokemonTypesAsJson.types.length == 1) {
      let pushThisType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      pokemonTypesArray = pushThisType;
      console.log(pokemonTypesArray);
      return pokemonTypesArray;
    } else {
      let firstType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      let secondType = capitalize(responsePokemonTypesAsJson.types[1].type.name);
      let pushThisTwoTypes = [firstType, secondType]
      pokemonTypesArray = pushThisTwoTypes;      
      return pokemonTypesArray;
    }
}

 async function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}">
            <h3>#${pokemonIDsArray[i]} ${pokemonNamesArray[i]}</h3>
            <br>
            <img src="${pokemonImgsArray[i]}" alt="pokemon${i}">
        </div>
    `;
}

async function pokemonTypesTemplate(j) {
  await fetchPokemonTypes(j);
  if (pokemonTypesArray.length == 2) {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemonTypesArray[0]}.png" alt="${pokemonTypesArray[0]}" class="typeImgs">
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemonTypesArray[1]}.png" alt="${pokemonTypesArray[1]}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemonTypesArray}.png" alt="${pokemonTypesArray}" class="typeImgs">
      `}
}

function loadButtonTemplate() {
  return /*html*/ `
    <div>
        <button class="loadButton">Load more Pokemon</button>
    </div>
  `;
}