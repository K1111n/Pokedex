let pokemons = {
  'pokemonIDsArray' : [],
  'pokemonNamesArray' : [],
  'pokemonImgsArray' : [],
  'pokemonTypesArray' : [],
  'pokemonHPAttackDefenseArray' : [],
}

async function renderPokemon() {
  showLoadingScreen()
  await fetchPokemonNames();
  let j = 0;
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {    
    j++;
    await fetchPokemonImgs(j);
    await fetchPokemonIDs(j);    
    await fetchPokemonTypes(j);  
    await fetchPokemonHPAttackDefense(j);  
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    changeBackgroundColorToTypeColor(i);
    pokeDiv.innerHTML += pokemonTypesTemplate();
  }
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.innerHTML += loadButtonTemplate();
  hideLoadingScreen();
}

function changeBackgroundColorToTypeColor(i) {
  let firstTypeWhenThereAreTwoTypes = `${pokemons.pokemonTypesArray[0]}`;
  let firstTypeWhenThereIsOneType = `${pokemons.pokemonTypesArray}`;
  if (firstTypeWhenThereAreTwoTypes == "Fire" || firstTypeWhenThereIsOneType == "Fire") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "red";
  } else if (firstTypeWhenThereAreTwoTypes == "Normal" || firstTypeWhenThereIsOneType == "Normal") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "grey";
  } else if (firstTypeWhenThereAreTwoTypes == "Water" || firstTypeWhenThereIsOneType == "Water") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "blue";
  } else if (firstTypeWhenThereAreTwoTypes == "Electric" || firstTypeWhenThereIsOneType == "Electric") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#D1C000";
  } else if (firstTypeWhenThereAreTwoTypes == "Grass" || firstTypeWhenThereIsOneType == "Grass") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "green";
  } else if (firstTypeWhenThereAreTwoTypes == "Ice" || firstTypeWhenThereIsOneType == "Ice") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "aqua";
  } else if (firstTypeWhenThereAreTwoTypes == "Fighting" || firstTypeWhenThereIsOneType == "Fighting") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "darkred";
  } else if (firstTypeWhenThereAreTwoTypes == "Poison" || firstTypeWhenThereIsOneType == "Poison") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "purple";
  } else if (firstTypeWhenThereAreTwoTypes == "Ground" || firstTypeWhenThereIsOneType == "Ground") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "brown";
  } else if (firstTypeWhenThereAreTwoTypes == "Flying" || firstTypeWhenThereIsOneType == "Flying") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstTypeWhenThereAreTwoTypes == "Psychic" || firstTypeWhenThereIsOneType == "Psychic") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF1493";
  } else if (firstTypeWhenThereAreTwoTypes == "Bug" || firstTypeWhenThereIsOneType == "Bug") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#808000";
  } else if (firstTypeWhenThereAreTwoTypes == "Rock" || firstTypeWhenThereIsOneType == "Rock") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#696969";
  } else if (firstTypeWhenThereAreTwoTypes == "Ghost" || firstTypeWhenThereIsOneType == "Ghost") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstTypeWhenThereAreTwoTypes == "Dragon" || firstTypeWhenThereIsOneType == "Dragon") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstTypeWhenThereAreTwoTypes == "Dark" || firstTypeWhenThereIsOneType == "Dark") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "black";
  } else if (firstTypeWhenThereAreTwoTypes == "Steel" || firstTypeWhenThereIsOneType == "Steel") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstTypeWhenThereAreTwoTypes == "Fairy" || firstTypeWhenThereIsOneType == "Fairy") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF00FF";
  }
}

function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

function showLoadingScreen() {
  let loadingSection = document.getElementById("loadingSection");
  loadingSection.classList.remove("d_none");
  loadingSection.classList.add("showOnCentreOfThePage");
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.style.display = "none";
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.style.display = "none";
}

function hideLoadingScreen() {
  let loadingSection = document.getElementById("loadingSection");
  loadingSection.classList.add("d_none");
  loadingSection.classList.remove("showOnCentreOfThePage");
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.style.display = "flex";
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.style.display = "flex";
}

let l = 0;

function loadMorePokemon() {
  l = l + 40;
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
    `https://pokeapi.co/api/v2/pokemon?limit=${40+l}&offset=0`
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

async function fetchPokemonHPAttackDefense(j) {
    let responseHPAttackDefense = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
    let responseHPAttackDefenseAsJson = await responseHPAttackDefense.json();
    pokemons.pokemonHPAttackDefenseArray.push({
      hp:responseHPAttackDefenseAsJson.stats[0].base_stat,
       attack: responseHPAttackDefenseAsJson.stats[1].base_stat,
        defense: responseHPAttackDefenseAsJson.stats[2].base_stat});
    console.log(pokemons.pokemonHPAttackDefenseArray);
}

function renderThisPokemoninOverlay(i) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i);
  console.log(overlayTemplate(i));
  console.log(overlay);
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