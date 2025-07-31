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
  if (pokemons.pokemonTypesArray[i].secondTypeImgSrc != null) {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i].firstTypeImgSrc}.png" alt="${pokemons.pokemonTypesArray[i].firstTypeImgSrc}" class="typeImgs">
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i].secondTypeImgSrc}.png" alt="${pokemons.pokemonTypesArray[i].secondTypeImgSrc}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons.pokemonTypesArray[i].firstTypeImgSrc}.png" alt="${pokemons.pokemonTypesArray[i].firstTypeImgSrc}" class="typeImgs">
      `}
}

function loadButtonTemplate() {
  return /*html*/ `    
        <button class="loadButton" onclick="loadMorePokemon()">Load more Pokemon</button>
  `;
}

function foundPokeDivTemplate(i) {
  if (foundPokemonsArray[i].secondTypeImgSrc == null) {
  return /*html*/ `
    <div class="pokemonDiv" id="foundPokemonDiv${i}" onclick="renderThisFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
            <br>
            <img src="${foundPokemonsArray[i].imgSrc}" alt="pokemon${i}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
            </div>
    </div>    
  `
  } else {
    return /*html*/ `
    <div class="pokemonDiv" id="foundPokemonDiv${i}">
            <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
            <br>
            <img src="${foundPokemonsArray[i].imgSrc}" alt="pokemon${i}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].secondTypeImgSrc}.png" alt="${foundPokemonsArray[i].secondTypeImgSrc}" class="typeImgs">
            </div>
    </div>  
    `
  };
}

function overlayTemplate(i) {
  return /*html*/ `
  <div class="pokemonOverlay" id="pokemonOverlay${i}">
      <h3>#${pokemons.pokemonIDsArray[i]} ${pokemons.pokemonNamesArray[i]}</h3>
      <br>
      <img src="${pokemons.pokemonImgsArray[i]}" alt="pokemon${i}">
      <p>HP: ${pokemons.pokemonHPAttackDefenseArray[i].hp} 
        Attack: ${pokemons.pokemonHPAttackDefenseArray[i].attack} 
        Defense: ${pokemons.pokemonHPAttackDefenseArray[i].defense}</p>
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
  </div>
  `;
}

function overlayTemplateForFoundPokemon(i) {
  return /*html*/ `
  <div class="pokemonOverlay" id="pokemonOverlay${i}">
      <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
      <br>
      <img src="${foundPokemonsArray[i].imgSrc}" alt="pokemon${i}">
      <p>HP: ${foundPokemonsArray[i].hp} 
        Attack: ${foundPokemonsArray[i].attack} 
        Defense: ${foundPokemonsArray[i].defense}</p>
        <div class="buttons">
          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='14 6 8 12 14 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil links" class="arrow-img" onclick="renderBeforeFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">

          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='10 6 16 12 10 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil rechts" class="arrow-img" onclick="renderNextFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
        </div>
  </div>
  `;
}