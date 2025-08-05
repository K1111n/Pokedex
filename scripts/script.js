  /**
   * shows Loading Animation, fetches 20 Times, renders all already fetched and newly fetched Pokemon,
   * changes the Background Color, renders Button for loading more Pokemon, hides Loading Animation
   */
async function renderPokemon() {
  showLoadingScreen();
  for (i = 1; i <= 28; i++) {  
    await fetchAPI(i);  
  }
  for (i = 0; i < pokemons.length; i++) {
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
    changeBackgroundColorToTypeColor(i, pokemons, 'firstType', 'pokemonDiv');
  }
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.innerHTML += loadButtonTemplate();
  hideLoadingScreen();
}

/**
 * renders all Pokemon
 */
function onlyRenderPokemon() {
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.innerHTML = "";
  for (i = 0; i < pokemons.length; i++) {  
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    changeBackgroundColorToTypeColor(i, pokemons, 'firstType', 'pokemonDiv');
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
  }
}

/**
 * Change Background Color to their First Type
 * @param {number} i - Index of Pokemon in pokemonsArray
 */
function changeBackgroundColorToTypeColor(i, arr, typeField, targetId) {
  let typeName = arr[i][typeField];
  let backgroundColor = typeBackgroundStyles[typeName];
  if(backgroundColor) {
    document.getElementById(`${targetId}${i}`).style.backgroundImage = backgroundColor;
  }
}

/**
 * Capitalizes the first character of the given string.
 *
 * @param {string} s - The input string to capitalize.
 * @returns {string} The input string with the first character in uppercase.
 *
 * @example
 * capitalize("hello"); // "Hello"
 * capitalize("world"); // "World"
 */
function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

/**
 * shows Loading Animation, hides everything else
 */
function showLoadingScreen() {
  let loadingSection = document.getElementById("loadingSection");
  loadingSection.classList.remove("d_none");
  loadingSection.classList.add("showOnCentreOfThePage");
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.style.display = "none";
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.style.display = "none";
}

/**
 * hides Loading Animation, shows everything else
 */
function hideLoadingScreen() {
  let loadingSection = document.getElementById("loadingSection");
  loadingSection.classList.add("d_none");
  loadingSection.classList.remove("showOnCentreOfThePage");
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.style.display = "flex";
  let loadButtonSection = document.getElementById("loadButtonDiv");
  loadButtonSection.style.display = "flex";
}

/**
 * by pressing the Loading Button, changes the l-Variable to change the last Number in the API
 * clears everything
 */
function loadMorePokemon() {
  l = l + 28;
  document.getElementById("pokemonSection").innerHTML = "";
  document.getElementById("loadButtonDiv").innerHTML = "";
  renderPokemon();
}

/**
 * fetches every wanted Informations of a Pokemon and pushes it into the pokemons-Array
 * @param {number} i - last Number in the API Link
 * @returns pokemons-Array
 */
async function fetchAPI(i) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+l}/`);
  let responseAsJson = await response.json();
  let responseEvolvesFrom = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${responseAsJson.id}/`);
  let responseEvolvesFromAsJson = await responseEvolvesFrom.json();
  let numberForAPIOfNextPokemon = responseAsJson.id + 1;
  let responseEvolesTo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${numberForAPIOfNextPokemon}/`);
  let responseEvolesToAsJson = await responseEvolesTo.json();
  let speciesURL = responseAsJson.species.url;
  let responseNew = await fetch(speciesURL)
  let responseNewAsJson = await responseNew.json();
  pokemons = setAttributesToPushInArray(responseAsJson, responseEvolvesFromAsJson, responseEvolesToAsJson, responseNewAsJson);  
  return pokemons;
}

/**
 * Checks for second Type
 * Checks for second Ability
 * Checks for second Move
 * Pushes fetched data in pokemons-Array
 * @param {JSon Array} responseAsJson 
 * @param {JSon Array} responseEvolvesFromAsJson 
 * @param {JSon Array} responseEvolesToAsJson 
 * @returns pokemons-Array
 */
function setAttributesToPushInArray(responseAsJson, responseEvolvesFromAsJson, responseEvolesToAsJson, responseNewAsJson) {
    let pokemonName = capitalize(responseAsJson.forms[0].name);
    let firstTypeValue = capitalize(responseAsJson.types[0].type.name);
    let secondTypeValue = null; 
    let secondAbilityValue = null;
    let evolvesFrom = (responseEvolvesFromAsJson.evolves_from_species != null);
    let evolvesTo = (responseEvolesToAsJson.evolves_from_species != null);
    let moveSecond = 0;
    if (responseAsJson.types.length == 2) {
      secondTypeValue = capitalize(responseAsJson.types[1].type.name);
    } 
    if (responseAsJson.abilities.length == 2) {
      secondAbilityValue = responseAsJson.abilities[1].ability.name
    }    
    if (responseAsJson.moves.length >= 2) {
      moveSecond = responseAsJson.moves[1].move.name;
    } 
    pokemons.push({
      name: pokemonName,
      pokemonGif: responseAsJson.sprites.other.showdown.front_default,
      pokemonSmallImg: responseAsJson.sprites.front_default,
      pokemonImg: responseAsJson.sprites.other['official-artwork'].front_default,
      id: responseAsJson.id,
      firstType: firstTypeValue, 
      secondType: secondTypeValue,
      hp:responseAsJson.stats[0].base_stat,
      attack: responseAsJson.stats[1].base_stat,
      defense: responseAsJson.stats[2].base_stat,
      sp_attack: responseAsJson.stats[3].base_stat,
      sp_defense: responseAsJson.stats[4].base_stat,
      speed: responseAsJson.stats[5].base_stat,
      firstAbility: responseAsJson.abilities[0].ability.name,
      secondAbility: secondAbilityValue,
      weight: responseAsJson.weight,
      firstMove: responseAsJson.moves[0].move.name,
      secondMove: moveSecond,
      evolvesFrom: evolvesFrom,
      evolvesTo: evolvesTo,
      height: responseAsJson.height,
      habitat: responseNewAsJson.habitat.name,
      deutschName: responseNewAsJson.names[5].name,
      aboutText: responseNewAsJson.flavor_text_entries[i].flavor_text,
    });
  return pokemons;
}

/**
 * checks if input has three characters
 */
function checkIfInputIsAtleastThreeCharactersLong() {
  let input = document.getElementById("site-search");
  if (input.value.length >= 3) {
    searchForPokemon(input);
   } else if (input.value.length < 3) {
    onlyRenderPokemon();
    document.getElementById("loadButtonDiv").style.display = "flex";
  }
}

/**
 * filters all pokemon which includes input, searching for all found Pokemon in pokemons-Array,
 * pushes it to to foundPokemonsArray, load Button will be hidden
 * @param {string} input - typed in input in input field
 */
function searchForPokemon(input) {
  let searchTerm = capitalize(input.value);
  let foundPokemon = pokemons.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  foundPokemonsArray = [];
  let secondTypeImgSrcValue = null;
  let secondAbilityValue = null;
  for (i = 0; i < pokemons.length; i++) {   
    if (foundPokemon.some(p => p.name === pokemons[i].name)) {
      if (pokemons[i].secondType != null) {
      secondTypeImgSrcValue = pokemons[i].secondType;      
      } 
      if (pokemons[i].secondAbility != null) {
        secondAbilityValue = pokemons.secondAbility;
      }
      foundPokemonsArray.push({
        id:`${pokemons[i].id}`,
        name: `${pokemons[i].name}`,
        pokemonSmallImg: pokemons[i].pokemonSmallImg,
        pokemonImg: pokemons[i].pokemonImg,
        firstTypeImgSrc: `${pokemons[i].firstType}`,
        secondTypeImgSrc: secondTypeImgSrcValue,
        hp: pokemons[i].hp,
        attack: pokemons[i].attack,
        defense: pokemons[i].defense,
        sp_attack: pokemons[i].sp_attack,
        sp_defense: pokemons[i].sp_defense,
        speed: pokemons[i].speed,
        firstAbility: pokemons[i].firstAbility,
        secondAbility: pokemons[i].secondAbilityValue,
        weight: pokemons[i].weight,
        firstMove: pokemons[i].firstMove,
        secondMove: pokemons[i].secondMove,
        evolvesFrom: pokemons[i].evolvesFrom,
        evolvesTo: pokemons[i].evolvesTo,
        height: pokemons[i].height,
        habitat: pokemons[i].habitat,
        deutschName: pokemons[i].deutschName,
        aboutText: pokemons[i].aboutText,
      });
    }
  }
  if (foundPokemon) {
    document.getElementById("loadButtonDiv").style.display = "none";
    renderFoundPokemons(foundPokemonsArray);
  } else {
    document.getElementById("loadButtonDiv").style.display = "flex";
  }
  return foundPokemonsArray;
}

/**
 * Clears page, renders foundPokemons-Array
 * @param {arr} foundPokemonsArray - Array with newly pushed found Pokemons
 */
function renderFoundPokemons(foundPokemonsArray) {
  let foundPokemonSection = document.getElementById("pokemonSection");
  foundPokemonSection.innerHTML = "";
  for (i = 0; i < foundPokemonsArray.length; i++) {
    if (foundPokemonsArray[i].secondTypeImgSrc == null) {
    foundPokemonSection.innerHTML += foundPokeDivTemplateForOneType(i);
    } else {
    foundPokemonSection.innerHTML += foundPokeDivTemplateForTwoTypes(i);
    }
    changeBackgroundColorToTypeColor(i, foundPokemonsArray, 'firstTypeImgSrc', 'foundPokemonDiv');
  }
}

/**
 * by clicking on Impressum Button, Impressum will be displayed
 * by clicking on same Button. Pokedex will be displayed again
 */
function impressum() {  
  if (document.getElementById("impressumButton").innerHTML == "Impressum") {
    document.getElementById("impressum").style.display = "flex";
    document.getElementById("main").style.display = "none";
    document.getElementById("rightHeader").style.display = "none";
    document.getElementById("impressumButton").innerHTML = "Back to Pokedex";
  } else {
    document.getElementById("impressum").style.display = "none";
    document.getElementById("main").style.display = "flex";
    document.getElementById("rightHeader").style.display = "flex";
    document.getElementById("impressumButton").innerHTML = "Impressum";
  }
}
