function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}" onclick="renderThisPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${pokemons[i].id} ${pokemons[i].name}</h3>
            <br>
            <img src="${pokemons[i].pokemonImg}" alt="pokemon${i}">
            <div id="typeRow${i}"></div>
        </div>
    `;
}

function pokemonTypesTemplate(i) {
  if (pokemons[i].secondType != null) {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons[i].firstType}.png" alt="${pokemons[i].firstType}" class="typeImgs">
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons[i].secondType}.png" alt="${pokemons[i].secondType}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://play.pokemonshowdown.com/sprites/types/${pokemons[i].firstType}.png" alt="${pokemons[i].firstType}" class="typeImgs">
      `}
}

function loadButtonTemplate() {
  return /*html*/ `    
        <button class="loadButton" onclick="loadMorePokemon()">Load more Pokemon</button>
  `;
}

function foundPokeDivTemplateForOneType(i) {
  return /*html*/ `
    <div class="pokemonDiv" id="foundPokemonDiv${i}" onclick="renderThisFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
            <br>
            <img src="${foundPokemonsArray[i].imgSrc}" alt="pokemon${i}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
            </div>
    </div>    
  `;
}

function foundPokeDivTemplateForTwoTypes(i) {
    return /*html*/ `
    <div class="pokemonDiv" id="foundPokemonDiv${i}" onclick="renderThisFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
            <br>
            <img src="${foundPokemonsArray[i].imgSrc}" alt="pokemon${i}">
            <div class="typeRow">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
              <img src="https://play.pokemonshowdown.com/sprites/types/${foundPokemonsArray[i].secondTypeImgSrc}.png" alt="${foundPokemonsArray[i].secondTypeImgSrc}" class="typeImgs">
            </div>
    </div>  
    `
}

function overlayTemplate(i) {
  return /*html*/ `
  <div class="pokemonOverlay" id="pokemonOverlay${i}">
     <div style="width: 100%;">
      <div class="firstRowInCard">
        <div>
          <h2>${pokemons[i].name}</h2>
        </div>
        <div style="display:flex; gap:5px; align-items:center">
          <p style="font-size:16px">HP:</p><h2> ${pokemons[i].hp}</h2>
        </div>
      </div>
      <img src="${pokemons[i].pokemonImg}" alt="pokemon${i}">
      <nav class="navBar">
        <p onclick="about(event)">About</p><p onclick="baseStats(event)">Base Stats</p><p onclick="moves(event)">Moves</p>
      </nav>
    </div> 
      <div id="baseStats">
          <div class="showProgressBars">
            <div><p>ATTACK: ${pokemons[i].attack}</p></div>
            <div class="myProgress">
              <div id="myBarATT" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>DEFENSE: ${pokemons[i].defense}</p></div>
            <div class="myProgress">
              <div id="myBarDEF" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SP-ATT: ${pokemons[i].sp_attack}</p></div>
            <div class="myProgress">
              <div id="myBarSP_Att" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SP-DEF: ${pokemons[i].sp_defense}</p></div>
            <div class="myProgress">
              <div id="myBarSP_Def" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SPEED: ${pokemons[i].speed}</p></div>
            <div class="myProgress">
              <div id="myBarSpeed" class="myBar"></div>
            </div>
          </div>
      </div>
      <div id="about" style="display:none;">
        Weight: ${pokemons[i].weight}
      </div>
      <div id="moves" style="display:none;">
        <p>Abilities: <br>${pokemons[i].firstAbility},${pokemons[i].secondAbility}</p>
        <br>
        <p>Moves: <br>${pokemons[i].firstMove},${pokemons[i].secondMove}</p>
      </div>
      <div class="buttons" id="buttons">
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
        <br>
        ATT: ${foundPokemonsArray[i].attack} 
        <br>
        DEF: ${foundPokemonsArray[i].defense}
        <br>
        SP-ATT: ${foundPokemonsArray[i].sp_attack} 
        <br>
        SP-DEF: ${foundPokemonsArray[i].sp_defense}
        <br>
        SPEED: ${foundPokemonsArray[i].speed}
        <br>
        Abilities: ${foundPokemonsArray[i].firstAbility},${foundPokemonsArray[i].secondAbility}
        <br>
        Weight: ${foundPokemonsArray[i].weight}
        <br>
        Moves: ${foundPokemonsArray[i].firstMove},${foundPokemonsArray[i].secondMove}
      </p>
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