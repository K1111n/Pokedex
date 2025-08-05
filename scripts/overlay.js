
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
  if (i == lastIndex) {
    document.getElementById("evolveTo").style.display = "none";
  }
  document.getElementById("myBarATT").style.width = `${pokemons[i].attack}` + "%";
  document.getElementById("myBarDEF").style.width = `${pokemons[i].defense}` + "%";
  document.getElementById("myBarSP_Att").style.width = `${pokemons[i].sp_attack}` + "%";
  document.getElementById("myBarSP_Def").style.width = `${pokemons[i].sp_defense}` + "%";
  document.getElementById("myBarSpeed").style.width = `${pokemons[i].speed}` + "%";
  changeBackgroundColorToTypeColor(i, pokemons, 'firstType', 'pokemonOverlay');
  hideEvolutions(i);
}

/**
 * displays hidden overlay, for found Pokemon through searching
 * @param {number} i - Index of Pokemon in foundPokemons-Array 
 */
async function showOverlayForFoundPokemon(i) {
  let lastIndex = foundPokemonsArray.length - 1;
  let j = 1;
  let k = 1;
  if (i != 0) {
    j = `${foundPokemonsArray.id}` - 1;
  } 
  if (i != lastIndex) {
    k = `${foundPokemonsArray.id}` + 1;
  } 
  overlay.style.display = "flex";
  overlay.innerHTML = overlayTemplateForFoundPokemon(i);
  document.getElementById("myBarATTOverlay").style.width = `${foundPokemonsArray[i].attack}` + "%";
  document.getElementById("myBarDEFOverlay").style.width = `${foundPokemonsArray[i].defense}` + "%";
  document.getElementById("myBarSP_AttOverlay").style.width = `${foundPokemonsArray[i].sp_attack}` + "%";
  document.getElementById("myBarSP_DefOverlay").style.width = `${foundPokemonsArray[i].sp_defense}` + "%";
  document.getElementById("myBarSpeedOverlay").style.width = `${foundPokemonsArray[i].speed}` + "%";
  changeBackgroundColorToTypeColor(i, foundPokemonsArray, 'firstType', 'pokemonOverlay');
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
 * by clicking on About-Section in Overlay, its the only Section which is shown
 */
function about(event) {
  document.getElementById("about").style.display = "flex";
  document.getElementById("baseStats").style.display = "none";
  document.getElementById("moves").style.display = "none";
  event.stopPropagation();
}

/**
 * by clicking on Base Stats-Section in Overlay, its the only Section which is shown
 */
function baseStats(event) {
  document.getElementById("about").style.display = "none";
  document.getElementById("baseStats").style.display = "flex";
  document.getElementById("moves").style.display = "none";
  event.stopPropagation();
}

/**
 * by clicking on Moves-Section in Overlay, its the only Section which is shown
 */
function moves(event) {
  document.getElementById("about").style.display = "none";
  document.getElementById("baseStats").style.display = "none";
  document.getElementById("moves").style.display = "flex";
  event.stopPropagation();
}

/**
 * Checks if actual Pokemon has a Pokemon it is evolving from 
 * Checks if actual Pokemon has a Pokemon it is evolving to
 * Positions Pokemon in overlay
 * @param {number} i - index of Pokemon in pokemons
 */
function hideEvolutions(i) {  
  if (pokemons[i].evolvesFrom == false) {
  document.getElementById("evolveFrom").style.display = "none";
  }
  if (pokemons[i].evolvesTo == false) {
  document.getElementById("evolveTo").style.display = "none";
  }
}
