let pokemons = {
  'pokemonIDsArray' : [],
  'pokemonNamesArray' : [],
  'pokemonImgsArray' : [],
  'pokemonTypesArray' : [],
  'pokemonHPAttackDefenseArray' : [],
}

let l = 0;

let foundPokemonsArray = [];

async function renderPokemon() {
  showLoadingScreen()
  await fetchPokemonNames();
  let j = 0;
  for (i = 0; i < 20; i++) {    
    j++;
    await fetchPokemonImgs(j);
    await fetchPokemonIDs(j);    
    await fetchPokemonTypes(j);  
    await fetchPokemonHPAttackDefense(j);  
  }
  console.log(pokemons.pokemonTypesArray);
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {
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
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {  
    j++;
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    changeBackgroundColorToTypeColor(i);
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
  }
}

function changeBackgroundColorToTypeColor(i) {
  let firstType = `${pokemons.pokemonTypesArray[i].firstTypeImgSrc}`;
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
  let firstType = `${pokemons.pokemonTypesArray[i].firstTypeImgSrc}`;
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

async function fetchPokemonNames() {
  let responsePokemonNames = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${l}`
  );
  let responsePokemonNamesAsJson = await responsePokemonNames.json();
  for (k = 0; k < responsePokemonNamesAsJson.results.length; k++) {    
    let pushThisPokemonName = capitalize(responsePokemonNamesAsJson.results[k].name);
    pokemons.pokemonNamesArray.push(pushThisPokemonName);
  }
  return pokemons.pokemonNamesArray;
}

async function fetchPokemonImgs(j) {
  let responsePokemonImgs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+l}/`);
  let responsePokemonImgsAsJson = await responsePokemonImgs.json();
  pokemons.pokemonImgsArray.push(responsePokemonImgsAsJson.sprites.other['official-artwork'].front_default); 
  return pokemons.pokemonImgsArray;
}

async function fetchPokemonIDs(j) {
  let responsePokemonIDs = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+l}/`);
  let responsePokemonIDsAsJson = await responsePokemonIDs.json();
  pokemons.pokemonIDsArray.push(responsePokemonIDsAsJson.id);
  return pokemons.pokemonIDsArray;
}

async function fetchPokemonTypes(j) {  
    let responsePokemonTypes = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+l}/`);
    let responsePokemonTypesAsJson = await responsePokemonTypes.json();
    if (responsePokemonTypesAsJson.types.length == 1) {
      let pushThisType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      pokemons.pokemonTypesArray.push({firstTypeImgSrc: pushThisType, secondTypeImgSrc: null,});
      return pokemons.pokemonTypesArray;
    } else {
      let firstType = capitalize(responsePokemonTypesAsJson.types[0].type.name);
      let secondType = capitalize(responsePokemonTypesAsJson.types[1].type.name);
      pokemons.pokemonTypesArray.push({firstTypeImgSrc: firstType, secondTypeImgSrc: secondType,});      
      return pokemons.pokemonTypesArray;
    }
}

async function fetchPokemonHPAttackDefense(j) {
    let responseHPAttackDefense = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+l}/`);
    let responseHPAttackDefenseAsJson = await responseHPAttackDefense.json();
    pokemons.pokemonHPAttackDefenseArray.push({
      hp:responseHPAttackDefenseAsJson.stats[0].base_stat,
       attack: responseHPAttackDefenseAsJson.stats[1].base_stat,
        defense: responseHPAttackDefenseAsJson.stats[2].base_stat});
}

function renderThisPokemonInOverlay(i) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i);
  document.documentElement.classList.add("hideScrollbar");
  changeBackgroundColorOfOverlayToTypeColor(i);
}

function renderThisFoundPokemonInOverlay(i) {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplateForFoundPokemon(i);
  document.documentElement.classList.add("hideScrollbar");
  changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i);
}

function renderNextPokemonInOverlay(i) {
  let lastIndex = pokemons.pokemonNamesArray.length - 1;
  let overlay = document.getElementById("overlay");
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i);
  changeBackgroundColorOfOverlayToTypeColor(i);
}

function renderNextFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  let overlay = document.getElementById("overlay");
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplateForFoundPokemon(i);
  changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i);
}

function renderBeforePokemonInOverlay(i) {
  let lastIndex = pokemons.pokemonNamesArray.length - 1;
  let overlay = document.getElementById("overlay");
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i);
  changeBackgroundColorOfOverlayToTypeColor(i);
}

function renderBeforeFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  let overlay = document.getElementById("overlay");
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
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
  let foundPokemon = pokemons.pokemonNamesArray.filter((name) => {return name.includes(searchTerm)});
  foundPokemonsArray = [];
  for (i = 0; i < pokemons.pokemonNamesArray.length; i++) {   
    if (foundPokemon.includes(pokemons.pokemonNamesArray[i])) {
      if (pokemons.pokemonTypesArray[i].length == 2) {
      foundPokemonsArray.push({
        id:`${pokemons.pokemonIDsArray[i]}`,
        name: `${pokemons.pokemonNamesArray[i]}`,
        imgSrc: `${pokemons.pokemonImgsArray[i]}`,
        firstTypeImgSrc: `${pokemons.pokemonTypesArray[i].firstTypeImgSrc}`,
        secondTypeImgSrc: `${pokemons.pokemonTypesArray[i].secondTypeImgSrc}`,
        hp: pokemons.pokemonHPAttackDefenseArray[i].hp,
        attack: pokemons.pokemonHPAttackDefenseArray[i].attack,
        defense: pokemons.pokemonHPAttackDefenseArray[i].defense,
        });
      } else {
        foundPokemonsArray.push({
        id:`${pokemons.pokemonIDsArray[i]}`,
        name: `${pokemons.pokemonNamesArray[i]}`,
        imgSrc: `${pokemons.pokemonImgsArray[i]}`,
        firstTypeImgSrc: `${pokemons.pokemonTypesArray[i].firstTypeImgSrc}`,
        secondTypeImgSrc: null,
        hp: pokemons.pokemonHPAttackDefenseArray[i].hp,
        attack: pokemons.pokemonHPAttackDefenseArray[i].attack,
        defense: pokemons.pokemonHPAttackDefenseArray[i].defense,
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
    foundPokemonSection.innerHTML += foundPokeDivTemplate(i);
    changeBackgroundColorToTypeColorFromFoundPokemon(i);
  }
}