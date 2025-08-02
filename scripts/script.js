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

/**
 * To set the Background Color there is a color set to each type of a Pokemon
 */
 const typeBackgroundColors = {
    Fire: "red",
    Normal: "#8a867f",
    Water: "#44bbff",
    Electric: "#D1C000",
    Grass: "green",
    Ice: "#6cf7ff",
    Fighting: "darkred",
    Poison: "purple",
    Ground: "#dccd83ff",
    Flying: "#00BFFF",
    Psychic: "#FF1493",
    Bug: "#808000",
    Rock: "#c6a553",
    Ghost: "#7777d9",
    Dragon: "#9176ff",
    Dark: "#1c0909ff",
    Steel: "#B0C4DE",
    Fairy: "#FF00FF"
  };

  /**
   * shows Loading Animation, fetches 20 Times, renders all already fetched and newly fetched Pokemon,
   * changes the Background Color, renders Button for loading more Pokemon, hides Loading Animation
   */
async function renderPokemon() {
  showLoadingScreen();
  for (i = 1; i <= 20; i++) {  
    await fetchAPI(i);  
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

/**
 * renders all Pokemon
 */
function onlyRenderPokemon() {
  let pokemonSection = document.getElementById("pokemonSection");
  pokemonSection.innerHTML = "";
  for (i = 0; i < pokemons.length; i++) {  
    pokemonSection.innerHTML += pokeDivTemplate(i);
    let pokeDiv = document.getElementById(`typeRow${i}`);
    changeBackgroundColorToTypeColor(i);
    pokeDiv.innerHTML += pokemonTypesTemplate(i);
  }
}

/**
 * Change Background Color to their First Type
 * @param {number} i - Index of Pokemon in pokemonsArray
 */
function changeBackgroundColorToTypeColor(i) {
  let firstType = `${pokemons[i].firstType}`;
  let backgroundColor = typeBackgroundColors[firstType];
  if(backgroundColor) {
    document.getElementById(`pokemonDiv${i}`).style.backgroundColor = backgroundColor;
  }
}

/**
 * Change Background Color, to their First, Type in Ovelay
 * @param {number} i - Index of Pokemon in pokemonsArray
 */
function changeBackgroundColorOfOverlayToTypeColor(i) {
  let firstType = `${pokemons[i].firstType}`;
  let backgroundColor = typeBackgroundColors[firstType];
  if(backgroundColor) {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = backgroundColor;
  }
}

/**
 * Change Background Color to their First Type after a pokemon is found through searching
 * @param {number} i - Index of Pokemon in foundPokemonsArray
 */
function changeBackgroundColorToTypeColorFromFoundPokemon(i) {
  let firstType = `${foundPokemonsArray[i].firstTypeImgSrc}`;
  let backgroundColor = typeBackgroundColors[firstType];
  if(backgroundColor) {
    document.getElementById(`foundPokemonDiv${i}`).style.backgroundColor = backgroundColor;
  }
}

/**
 * Change Background Color to their First Type after a pokemon is found through searching, in Ovelay
 * @param {number} i - Index of Pokemon in foundPokemonsArray
 */
function changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i) {
  let firstType = `${foundPokemonsArray[i].firstTypeImgSrc}`;
  let backgroundColor = typeBackgroundColors[firstType];
  if(backgroundColor) {
    document.getElementById(`pokemonOverlay${i}`).style.backgroundColor = backgroundColor;
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
  l = l + 20;
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
  let pokemons = setAttributesToPushInArray(responseAsJson, responseEvolvesFromAsJson, responseEvolesToAsJson);  
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
 * @returns 
 */
function setAttributesToPushInArray(responseAsJson, responseEvolvesFromAsJson, responseEvolesToAsJson) {
    let pokemonName = capitalize(responseAsJson.forms[0].name);
    let firstTypeValue = capitalize(responseAsJson.types[0].type.name);
    let secondTypeValue = null; 
    let secondAbilityValue = null;
    let secondMoveofPokemon = null;
    let evolvesFrom = (responseEvolvesFromAsJson.evolves_from_species != null);
    let evolvesTo = (responseEvolesToAsJson.evolves_from_species != null);
    if (responseAsJson.types.length == 2) {
      secondTypeValue = capitalize(responseAsJson.types[1].type.name);
    } 
    if (responseAsJson.abilities.length == 2) {
      secondAbilityValue = responseAsJson.abilities[1].ability.name
    }
    if (responseAsJson.moves.length == 2) {
      secondMoveofPokemon = responseAsJson.moves[1].move.name;
    }
    pokemons.push({
      name: pokemonName,
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
      secondMove: secondMoveofPokemon,
      evolvesFrom: evolvesFrom,
      evolvesTo: evolvesTo,
    });
  return pokemons;
}

/**
 * Hides Scrollbar when Overlay is open
 * @param {number} i
 */
function renderThisPokemonInOverlay(i) {
  document.documentElement.classList.add("hideScrollbar");
  showOverlay(i);
}

/**
 * Hides Scrollbar when Overlay is open
 * @param {number} i 
 */
function renderThisFoundPokemonInOverlay(i) {
  document.documentElement.classList.add("hideScrollbar");
  showOverlayForFoundPokemon(i);
}

/**
 * Click on right Arrow, increases the Index
 * @param {number} i - Index of Pokemon in pokemons-Array
 */
function renderNextPokemonInOverlay(i) {
  let lastIndex = pokemons.length - 1;
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  showOverlay(i);
}

/**
 * Click on right Arrow, increases the Index, for found Pokemon through searching
 * @param {number} i - Index of Pokemon in foundPokemons-Array
 */
function renderNextFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  if (i != lastIndex) {
    i++;
  } else {
    i = 0;
  }
  showOverlayForFoundPokemon(i);
}

/**
 * Click on left Arrow, decreases the Index
 * @param {number} i - Index of Pokemon in pokemons-Array
 */
function renderBeforePokemonInOverlay(i) {
  let lastIndex = pokemons.length - 1;
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
  showOverlay(i);
}

/**
 * Click on left Arrow, decreases the Index, for found Pokemon through searching
 * @param {number} i - Index of Pokemon in foundPokemons-Array
 */
function renderBeforeFoundPokemonInOverlay(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  if (i != 0) {
    i--;
  } else {
    i = lastIndex;
  }
  showOverlayForFoundPokemon(i);
}

/**
 * displays hidden overlay
 * @param {number} i - Index of Pokemon in pokemons-Array
 */
function showOverlay(i) {
  let overlay = document.getElementById("overlay");
  let lastIndex = pokemons.length - 1;
  let j = 1;
  let k = 1;
  if (i != 0) {
    j = i - 1;
  } 
  if (i != lastIndex) {
    k = i + 1;
  } 
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplate(i,j,k);
  document.getElementById("myBarATT").style.width = `${pokemons[i].attack}` + "%";
  document.getElementById("myBarDEF").style.width = `${pokemons[i].defense}` + "%";
  document.getElementById("myBarSP_Att").style.width = `${pokemons[i].sp_attack}` + "%";
  document.getElementById("myBarSP_Def").style.width = `${pokemons[i].sp_defense}` + "%";
  document.getElementById("myBarSpeed").style.width = `${pokemons[i].speed}` + "%";
  changeBackgroundColorOfOverlayToTypeColor(i);
  hideEvolutions(i);
}

/**
 * displays hidden overlay, for found Pokemon through searching
 * @param {number} i - Index of Pokemon in foundPokemons-Array 
 */
function showOverlayForFoundPokemon(i) {
  let overlay = document.getElementById("overlay");
  let lastIndex = foundPokemonsArray.length - 1;
  let j = 1;
  let k = 1;
  if (i != 0) {
    j = i - 1;
  } 
  if (i != lastIndex) {
    k = i + 1;
  } 
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplateForFoundPokemon(i,j,k);
  document.getElementById("myBarATTOverlay").style.width = `${foundPokemonsArray[i].attack}` + "%";
  document.getElementById("myBarDEFOverlay").style.width = `${foundPokemonsArray[i].defense}` + "%";
  document.getElementById("myBarSP_AttOverlay").style.width = `${foundPokemonsArray[i].sp_attack}` + "%";
  document.getElementById("myBarSP_DefOverlay").style.width = `${foundPokemonsArray[i].sp_defense}` + "%";
  document.getElementById("myBarSpeedOverlay").style.width = `${foundPokemonsArray[i].speed}` + "%";
  changeBackgroundColorOfOverlayToTypeColorFromFoundPokemon(i);
  hideEvolutionsForFoundPokemons(i);
}

/**
 * closes any Overlay, displays hidden Scrollbar
 */
function closeOverlay() {  
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  document.documentElement.classList.remove("hideScrollbar");
}

/**
 * Clicking Arrow wont call closeOverlay()
 * @param {onclick} event 
 */
function dontcloseOverlay(event) {  
  event.stopPropagation();
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
      if (pokemons.secondAbility != null) {
        secondAbilityValue = pokemons.secondAbility;
      }
      foundPokemonsArray.push({
        id:`${pokemons[i].id}`,
        name: `${pokemons[i].name}`,
        imgSrc: `${pokemons[i].pokemonImg}`,
        firstTypeImgSrc: `${pokemons[i].firstType}`,
        secondTypeImgSrc: secondTypeImgSrcValue,
        hp: pokemons[i].hp,
        attack: pokemons[i].attack,
        defense: pokemons[i].defense,
        sp_attack: pokemons[i].sp_attack,
        sp_defense: pokemons[i].sp_defense,
        speed: pokemons[i].speed,
        firstAbility: pokemons[i].firstAbility,
        secondAbility: secondAbilityValue,
        weight: pokemons[i].weight,
        firstMove: pokemons[i].firstMove,
        secondMove: pokemons[i].secondMove,
        evolvesFrom: pokemons[i].evolvesFrom,
        evolvesTo: pokemons[i].evolvesTo,
        });
      }
  }
  if (foundPokemon) {
    document.getElementById("loadButtonDiv").style.display = "none";
    renderFoundPokemons(foundPokemonsArray);
  } else {
    document.getElementById("loadButtonDiv").style.display = "flex";
  }
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
    changeBackgroundColorToTypeColorFromFoundPokemon(i);
  }
}

/**
 * by clicking on About-Section in Overlay, its the only Section which is shown
 */
function about(event) {
  document.getElementById("about").style.display = "block";
  document.getElementById("baseStats").style.display = "none";
  document.getElementById("moves").style.display = "none";
  event.stopPropagation();
}

/**
 * by clicking on Base Stats-Section in Overlay, its the only Section which is shown
 */
function baseStats(event) {
  document.getElementById("about").style.display = "none";
  document.getElementById("baseStats").style.display = "block";
  document.getElementById("moves").style.display = "none";
  event.stopPropagation();
}

/**
 * by clicking on Moves-Section in Overlay, its the only Section which is shown
 */
function moves(event) {
  document.getElementById("about").style.display = "none";
  document.getElementById("baseStats").style.display = "none";
  document.getElementById("moves").style.display = "block";
  event.stopPropagation();
}

/**
 * Checks if actual Pokemon has a Pokemon it is evolving from 
 * Checks if actual Pokemon has a Pokemon it is evolving to
 * Checks if actual Pokemon has not any Evolution
 * Positions Pokemon in overlay
 * @param {number} i - index of Pokemon in pokemons
 */
function hideEvolutions(i) {
  if (pokemons[i].evolvesFrom == false) {
  document.getElementById("evolveFrom").style.display = "none";
  document.getElementById("evolutionChain").style.justifyContent = "flex-end";
  }
  if (pokemons[i].evolvesTo == false) {
  document.getElementById("evolveTo").style.display = "none";
  document.getElementById("evolutionChain").style.justifyContent = "flex-start";
  }
  if (pokemons[i].evolvesTo == false && pokemons[i].evolvesFrom == false) {
  document.getElementById("evolutionChain").style.justifyContent = "center";
  }
}

/**
 * Checks if actual found Pokemon has a Pokemon it is evolving from 
 * Checks if actual found Pokemon has a Pokemon it is evolving to
 * Checks if actual found Pokemon has not any Evolution
 * Positions Pokemon in overlay
 * @param {number} i - index of Pokemon in foundPokemonsArray
 */
function hideEvolutionsForFoundPokemons(i) {
  if (foundPokemonsArray[i].evolvesFrom == false) {
  document.getElementById("evolveFrom").style.display = "none";
  document.getElementById("evolutionChain").style.justifyContent = "flex-end";
  }
  if (foundPokemonsArray[i].evolvesTo == false) {
  document.getElementById("evolveTo").style.display = "none";
  document.getElementById("evolutionChain").style.justifyContent = "flex-start";
  }
  if (foundPokemonsArray[i].evolvesTo == false && foundPokemonsArray[i].evolvesFrom == false) {
  document.getElementById("evolutionChain").style.justifyContent = "center";
  }
}