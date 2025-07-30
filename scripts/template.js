function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}" onclick="renderThisPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
            <br>
            <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
            <div id="typeRow${i}"></div>
        </div>
    `;
}

function pokemonTypesTemplate(i) {
  if (pokemons.pokemonTypesArray[i].length == 2) {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i][0]}.png" alt="${pokemons.pokemonTypesArray[0]}" class="typeImgs">
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i][1]}.png" alt="${pokemons.pokemonTypesArray[1]}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i]}.png" alt="${pokemons.pokemonTypesArray}" class="typeImgs">
      `}
}

function loadButtonTemplate() {
  return /*html*/ `    
        <button class="loadButton" onclick="loadMorePokemon()">Load more Pokemon</button>
  `;
}

function foundPokeDivTemplate(m) {
  if (foundPokemonsArray[m].secondTypeImgSrc == null) {
  return /*html*/ `
    <div class="pokemonDiv">
            <h3>#${foundPokemonsArray[m].id} ${foundPokemonsArray[m].name}</h3>
            <br>
            <img src="${foundPokemonsArray[m].imgSrc}" alt="pokemon${m}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[m].firstTypeImgSrc}.png" alt="${foundPokemonsArray[m].firstTypeImgSrc}" class="typeImgs">
            </div>
    </div>    
  `
  } else {
    return /*html*/ `
    <div class="pokemonDiv">
            <h3>#${foundPokemonsArray[m].id} ${foundPokemonsArray[m].name}</h3>
            <br>
            <img src="${foundPokemonsArray[m].imgSrc}" alt="pokemon${m}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[m].firstTypeImgSrc}.png" alt="${foundPokemonsArray[m].firstTypeImgSrc}" class="typeImgs">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[m].secondTypeImgSrc}.png" alt="${foundPokemonsArray[m].secondTypeImgSrc}" class="typeImgs">
            </div>
    </div>  
    `
  };
}

function overlayTemplate(i) {
  return /*html*/ `
  <div class="pokemonDiv" id="pokemonOverlay${i}">
      <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
      <br>
      <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
      <p>HP: ${pokemons.pokemonHPAttackDefenseArray[i].hp} 
        Attack: ${pokemons.pokemonHPAttackDefenseArray[i].attack} 
        Defense: ${pokemons.pokemonHPAttackDefenseArray[i].defense}</p>
  </div>
  <div class="buttons">
    <img src="data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
      <polyline points='14 6 8 12 14 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>" alt="Pfeil links" class="arrow-img" onclick="renderBeforePokemonInOverlay(${i}); dontcloseOverlay(event);">

    <img src="data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
      <polyline points='10 6 16 12 10 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>" alt="Pfeil rechts" class="arrow-img" onclick="renderNextPokemonInOverlay(${i}); dontcloseOverlay(event);">
  </div>
  `;
}