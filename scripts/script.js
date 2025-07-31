/**
 * Array to push all fetched Informations to
 */
let pokemons = []

/**
 * Variable to later increase the last number in the API Link
 */
let l = 0;

/**
 * Array to push all found Pokemons to
 */
let foundPokemonsArray = [];

async function fetchingProcess() {
 showLoadingScreen()
  let j = 0;
  for (i = 0; i < 20; i++) {    
    j++;
    await fetchAPI(j);  
  }
}

async function renderPokemon() {
  showLoadingScreen();
  let j = 0;
  for (i = 0; i < 20; i++) {    
    j++;
    await fetchAPI(j);  
  }
  for (i = 0; i < pokemons.length; i++) {
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
    changeBackgroundColorToTypeColor(i);
  }
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.innerHTML += loadButtonTemplate();
  hideLoadingScreen();
}

function onlyRenderPokemon() {
  let j = 0;
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.innerHTML = "";
  for (i = 0; i < pokemons.length; i++) {  
    j++;
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    changeBackgroundColorToTypeColor(i);
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
  }
}

function changeBackgroundColorToTypeColor(i) {
  let firstType = `${pokemons[i].firstType}`;
  if (firstType == "Fire") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "red";
  } else if (firstType == "Normal") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "grey";
  } else if (firstType == "Water") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "blue";
  } else if (firstType == "Electric") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#D1C000";
  } else if (firstType == "Grass") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "green";
  } else if (firstType == "Ice") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "aqua";
  } else if (firstType == "Fighting") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "darkred";
  } else if (firstType == "Poison") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "purple";
  } else if (firstType == "Ground") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "brown";
  } else if (firstType == "Flying") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Psychic") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF1493";
  } else if (firstType == "Bug") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#808000";
  } else if (firstType == "Rock") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#696969";
  } else if (firstType == "Ghost") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstType == "Dragon") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Dark") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "black";
  } else if (firstType == "Steel") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstType == "Fairy") {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = "#FF00FF";
  }
}

function changeBackgroundColorOfOverlayToTypeColor(i) {
  let firstType = `${pokemons[i].firstType}`;
  if (firstType == "Fire") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "red";
  } else if (firstType == "Normal") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "grey";
  } else if (firstType == "Water") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "blue";
  } else if (firstType == "Electric") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#D1C000";
  } else if (firstType == "Grass") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "green";
  } else if (firstType == "Ice") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "aqua";
  } else if (firstType == "Fighting") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "darkred";
  } else if (firstType == "Poison") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "purple";
  } else if (firstType == "Ground") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "brown";
  } else if (firstType == "Flying") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Psychic") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#FF1493";
  } else if (firstType == "Bug") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#808000";
  } else if (firstType == "Rock") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#696969";
  } else if (firstType == "Ghost") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstType == "Dragon") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Dark") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "black";
  } else if (firstType == "Steel") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstType == "Fairy") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#FF00FF";
  }
}

function changeBackgroundColorToTypeColorFromFoundPokemon(i) {
  let firstType = `${foundPokemonsArray[i].firstTypeImgSrc}`;
  if (firstType == "Fire") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "red";
  } else if (firstType == "Normal") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "grey";
  } else if (firstType == "Water") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "blue";
  } else if (firstType == "Electric") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#D1C000";
  } else if (firstType == "Grass") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "green";
  } else if (firstType == "Ice") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "aqua";
  } else if (firstType == "Fighting") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "darkred";
  } else if (firstType == "Poison") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "purple";
  } else if (firstType == "Ground") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "brown";
  } else if (firstType == "Flying") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Psychic") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#FF1493";
  } else if (firstType == "Bug") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#808000";
  } else if (firstType == "Rock") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#696969";
  } else if (firstType == "Ghost") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstType == "Dragon") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Dark") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "black";
  } else if (firstType == "Steel") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstType == "Fairy") {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = "#FF00FF";
  }
}

function changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i) {
  let firstType = `${foundPokemonsArray[i].firstTypeImgSrc}`;
  if (firstType == "Fire") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "red";
  } else if (firstType == "Normal") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "grey";
  } else if (firstType == "Water") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "blue";
  } else if (firstType == "Electric") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#D1C000";
  } else if (firstType == "Grass") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "green";
  } else if (firstType == "Ice") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "aqua";
  } else if (firstType == "Fighting") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "darkred";
  } else if (firstType == "Poison") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "purple";
  } else if (firstType == "Ground") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "brown";
  } else if (firstType == "Flying") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Psychic") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#FF1493";
  } else if (firstType == "Bug") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#808000";
  } else if (firstType == "Rock") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#696969";
  } else if (firstType == "Ghost") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#F8F8FF";
  } else if (firstType == "Dragon") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#00BFFF";
  } else if (firstType == "Dark") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "black";
  } else if (firstType == "Steel") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#B0C4DE";
  } else if (firstType == "Fairy") {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = "#FF00FF";
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

function loadMorePokemon() {
  l = l + 20;
  document.getElementById("pokemonSection").innerHTML = "";
  document.getElementById("loadButtonDiv").innerHTML = "";
  renderPokemon();
}

async function fetchAPI(j) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+l}/`);
  let responseAsJson = await response.json();
  let pokemonName = capitalize(responseAsJson.forms[0].name);
  let firstTypeValue = capitalize(responseAsJson.types[0].type.name);
  if (responseAsJson.types.length == 1) {
  pokemons.push({
    name: pokemonName,
    pokemonImg: responseAsJson.sprites.other['official-artwork'].front_default,
    id: responseAsJson.id,
    firstType: firstTypeValue, 
    secondType: null,
    hp:responseAsJson.stats[0].base_stat,
    attack: responseAsJson.stats[1].base_stat,
    defense: responseAsJson.stats[2].base_stat
  }); } else {
  let secondTypeValue = capitalize(responseAsJson.types[1].type.name);
  pokemons.push({
    name: pokemonName,
    pokemonImg: responseAsJson.sprites.other['official-artwork'].front_default,
    id: responseAsJson.id,
    firstType: firstTypeValue, 
    secondType: secondTypeValue,
    hp:responseAsJson.stats[0].base_stat,
    attack: responseAsJson.stats[1].base_stat,
    defense: responseAsJson.stats[2].base_stat
  });
  }
  return pokemons;
}

function renderThisPokemonInOverlay(i) {
  document.documentElement.classList.add("hideScrollbar");
  showOverlay(i);
}

function renderThisFoundPokemonInOverlay(i) {
  document.documentElement.classList.add("hideScrollbar");
  showOverlayForFoundPokemon(i);
}

function renderNextPokemonInOverlay(i) {
  let lastIndex = pokemons.length - 1;
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  showOverlay(i);
}

function renderNextFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  showOverlayForFoundPokemon(i);
}

function renderBeforePokemonInOverlay(i) {
  let lastIndex = pokemons.length - 1;
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
  showOverlay(i);
}

function renderBeforeFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
  showOverlayForFoundPokemon(i);
}


function showOverlay(i) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i);
  changeBackgroundColorOfOverlayToTypeColor(i);
}

function showOverlayForFoundPokemon(i) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplateForFoundPokemon(i);
  changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i);
}

function closeOverlay() {  
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  document.documentElement.classList.remove("hideScrollbar");
}

function dontcloseOverlay(event) {  
  event.stopPropagation();
}

function checkIfInputIsAtleastThreeCharactersLong() {
  let input = document.getElementById("site-search");
  if (input.value.length >= 3) {
    searchForPokemon(input);
   } else if (input.value.length < 3) {
    onlyRenderPokemon();
    document.getElementById("loadButtonDiv").style.display = "flex";
  }
}

function searchForPokemon(input) {
  let searchTerm = capitalize(input.value);
  let foundPokemon = pokemons.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(foundPokemon[0].name);
  foundPokemonsArray = [];
  for (i = 0; i < pokemons.length; i++) {   
    if (foundPokemon.some(p => p.name === pokemons[i].name)) {
      if (pokemons[i].secondType != null) {
      foundPokemonsArray.push({
        id:`${pokemons[i].id}`,
        name: `${pokemons[i].name}`,
        imgSrc: `${pokemons[i].pokemonImg}`,
        firstTypeImgSrc: `${pokemons[i].firstType}`,
        secondTypeImgSrc: `${pokemons[i].secondType}`,
        hp: pokemons[i].hp,
        attack: pokemons[i].attack,
        defense: pokemons[i].defense,
        });
      } else {
        foundPokemonsArray.push({
        id:`${pokemons[i].id}`,
        name: `${pokemons[i].name}`,
        imgSrc: `${pokemons[i].pokemonImg}`,
        firstTypeImgSrc: `${pokemons[i].firstType}`,
        secondTypeImgSrc: null,
        hp: pokemons[i].hp,
        attack: pokemons[i].attack,
        defense: pokemons[i].defense,
        });
      }
    }
  }
  if (foundPokemon) {
    document.getElementById("loadButtonDiv").style.display = "none";
    renderFoundPokemons(foundPokemonsArray);
  } else {
    document.getElementById("loadButtonDiv").style.display = "flex";
  }
}

function renderFoundPokemons(foundPokemonsArray) {
  let foundPokemonSection = document.getElementById("pokemonSection");
  foundPokemonSection.innerHTML = "";
  for (i = 0; i < foundPokemonsArray.length; i++) {
    if (foundPokemonsArray[i].secondTypeImgSrc == null) {
    foundPokemonSection.innerHTML += foundPokeDivTemplateForOneType(i);
    } else {
    foundPokemonSection.innerHTML += foundPokeDivTemplateForTwoTypes(i);
    }
    changeBackgroundColorToTypeColorFromFoundPokemon(i);
  }
}