let pokemons = {
  'pokemonIDsArray' : [],
  'pokemonNamesArray' : [],
  'pokemonImgsArray' : [],
  'pokemonTypesArray' : [],
}

async function renderPokemon() {
    await fetchPokemonNames();
    let j = 0;
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {    
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
  let mainSection = document.getElementById("main");
  mainSection.innerHTML += loadButtonTemplate();
}

function changeBackgroundColorToTypeColor(i) {
  let firstTypeWhenThereAreTwoTypes = `${pokemons.pokemonTypesArray[0]}`;
  let firstTypeWhenThereIsOneType = `${pokemons.pokemonTypesArray}`;
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

let l = 0;

function loadMorePokemon() {
  l = l + 20;
  document.getElementById("pokemonSection").innerHTML = "";
  document.getElementById("loadButtonDiv").innerHTML = "";
  pokemons.pokemonIDsArray = [];
  pokemons.pokemonNamesArray = [];
  pokemons.pokemonImgsArray = [];
  pokemons.pokemonTypesArray = [];
  renderPokemon();
}

async function fetchPokemonNames() {
  let responsePokemonNames = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${20+l}&offset=0`
  );
  let responsePokemonNamesAsJson = await responsePokemonNames.json();
  for (k = 0; k < responsePokemonNamesAsJson.results.length; k++) {    
    let pushThisPokemonName = capitalize(responsePokemonNamesAsJson.results[k].name);
    pokemons.pokemonNamesArray.push(pushThisPokemonName);
  }
  return pokemons.pokemonNamesArray;
}

async function fetchPokemonImgs(j) {
  let responsePokemonImgs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
  let responsePokemonImgsAsJson = await responsePokemonImgs.json();
  pokemons.pokemonImgsArray.push(responsePokemonImgsAsJson.sprites.other['official-artwork'].front_default); 
  return pokemons.pokemonImgsArray;
}

async function fetchPokemonIDs(j) {
  let responsePokemonIDs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
  let responsePokemonIDsAsJson = await responsePokemonIDs.json();
  pokemons.pokemonIDsArray.push(responsePokemonIDsAsJson.id);
  return pokemons.pokemonIDsArray;
}

async function fetchPokemonTypes(j) {  
    let responsePokemonTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
    let responsePokemonTypesAsJson = await responsePokemonTypes.json();
    if (responsePokemonTypesAsJson.types.length == 1) {
      let pushThisType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      pokemons.pokemonTypesArray = pushThisType;
      return pokemons.pokemonTypesArray;
    } else {
      let firstType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      let secondType = capitalize(responsePokemonTypesAsJson.types[1].type.name);
      let pushThisTwoTypes = [firstType, secondType]
      pokemons.pokemonTypesArray = pushThisTwoTypes;      
      return pokemons.pokemonTypesArray;
    }
}

function checkIfInputIsAtleastThreeCharactersLong() {
  let input = document.getElementById("site-search");
  if (input.value.length >= 3) {
    searchForPokemon(input);
   } else if (input.value.length < 3) {
     for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {   
        let pokeDiv = document.getElementById(`pokemonDiv${i}`);
        pokeDiv.style.display = "flex";
      }
  }
}

function searchForPokemon(input) {
  let searchTerm = capitalize(input.value);
  let foundPokemon = pokemons.pokemonNamesArray.filter((name) => {return name.includes(searchTerm)});
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {   
    if (!foundPokemon.includes(pokemons.pokemonNamesArray[i])) {
      let pokeDiv = document.getElementById(`pokemonDiv${i}`);
      pokeDiv.style.display = "none";
    }
  }
}

async function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}">
            <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
            <br>
            <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
        </div>
    `;
}

async function pokemonTypesTemplate(j) {
  await fetchPokemonTypes(j);
  if (pokemons.pokemonTypesArray.length == 2) {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[0]}.png" alt="${pokemons.pokemonTypesArray[0]}" class="typeImgs">
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[1]}.png" alt="${pokemons.pokemonTypesArray[1]}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray}.png" alt="${pokemons.pokemonTypesArray}" class="typeImgs">
      `}
}

function loadButtonTemplate() {
  return /*html*/ `
    <br>
    <div id="loadButtonDiv">
        <button class="loadButton" onclick="loadMorePokemon()">Load more Pokemon</button>
    </div>
  `;
}