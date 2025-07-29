function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}" onclick="renderThisPokemoninOverlay(${i})">
            <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
            <br>
            <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
            <div id="typeRow${i}"></div>
        </div>
    `;
}

function pokemonTypesTemplate() {
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
        <button class="loadButton" onclick="loadMorePokemon()">Load more Pokemon</button>
  `;
}

function overlayTemplate(i) {
  return /*html*/ `
  <div class="pokemonDiv">
      <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
      <br>
      <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
      <p>HP: ${pokemons.pokemonHPAttackDefenseArray[i].hp} 
        Attack: ${pokemons.pokemonHPAttackDefenseArray[i].attack} 
        Defense: ${pokemons.pokemonHPAttackDefenseArray[i].defense}</p>
  </div>
  `;
}