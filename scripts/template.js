function pokeDivTemplate(i) {
  return /*html*/ `
        <div class="pokemonDiv" id="pokemonDiv${i}" onclick="renderThisPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <div style="display:flex; flex-direction: row; justify-content: space-between; width: 100%; font-weight: bold;">
              <p>#${pokemons[i].id}</p> <p>${pokemons[i].name}</p> <p class="german">${pokemons[i].deutschName}</p>
            </div>
            <br>
            <img src="${pokemons[i].pokemonSmallImg}" alt="pokemon${i}" class="pokemon">
            <div id="typeRow${i}" class="typeRow"></div>
        </div>
    `;
}

function pokemonTypesTemplate(i) {
  if (pokemons[i].secondType != null) {
    return /*html*/ `
      <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${pokemons[i].firstType}.png" alt="${pokemons[i].firstType}" class="typeImgs">
      <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${pokemons[i].secondType}.png" alt="${pokemons[i].secondType}" class="typeImgs">
      `
  } else {
    return /*html*/ `
      <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${pokemons[i].firstType}.png" alt="${pokemons[i].firstType}" class="typeImgs">
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
            <img src="${foundPokemonsArray[i].pokemonSmallImg}" alt="pokemon${i}" class="pokemon">
            <div class="typeRow">
              <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
            </div>
    </div>    
  `;
}

function foundPokeDivTemplateForTwoTypes(i) {
    return /*html*/ `
    <div class="pokemonDiv" id="foundPokemonDiv${i}" onclick="renderThisFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
            <h3>#${foundPokemonsArray[i].id} ${foundPokemonsArray[i].name}</h3>
            <br>
            <img src="${foundPokemonsArray[i].pokemonSmallImg}" alt="pokemon${i}" class="pokemon">
            <div class="typeRow">
              <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${foundPokemonsArray[i].firstTypeImgSrc}.png" alt="${foundPokemonsArray[i].firstTypeImgSrc}" class="typeImgs">
              <img src="https://kajanan-yoganathan.developerakademie.net/Pokedex/Assets/${foundPokemonsArray[i].secondTypeImgSrc}.png" alt="${foundPokemonsArray[i].secondTypeImgSrc}" class="typeImgs">
            </div>
    </div>  
    `
}

function overlayTemplate(i,j,k) {
  return /*html*/ `
  <div class="pokemonOverlay" id="pokemonOverlay${i}">
     <div style="width: 100%; height: 50%; display:flex; flex-direction: column; justify-content: space-between;">
      <div class="firstRowInCard">
        <div>
          <h2 class="english">${pokemons[i].name}</h2>
        </div>
        <div style="display:flex; gap:5px; align-items:center">
          <p style="font-size:16px">HP:</p><h2> ${pokemons[i].hp}</h2>
        </div>
      </div>

      <div id="evolutionChain">
        <div style="display: flex; justify-content: flex-end; flex-direction: column; gap: 10px; height: 100px"> 
          <img src="${pokemons[j].pokemonImg}" alt="pokemon${j}" class="evolvePokemonImg" id="evolveFrom" onclick="renderBeforePokemonInOverlay(${i}); dontcloseOverlay(event);">
          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='14 6 8 12 14 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil links" class="arrow-img" onclick="renderBeforePokemonInOverlay(${i}); dontcloseOverlay(event);">
        </div>

        <div>
          <img src="${pokemons[i].pokemonImg}" alt="pokemon${i}" id="actualPokemonImg">
        </div>

        <div style="display: flex; justify-content: flex-end; flex-direction: column; gap: 10px; height: 100px">
          <img src="${pokemons[k].pokemonImg}" alt="pokemon${k}" class="evolvePokemonImg" id="evolveTo" onclick="renderNextPokemonInOverlay(${i}); dontcloseOverlay(event);">
          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='10 6 16 12 10 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil rechts" class="arrow-img" onclick="renderNextPokemonInOverlay(${i}); dontcloseOverlay(event);">
        </div>
      </div>
      
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
        Habitat: ${pokemons[i].habitat}
        <br><br>
        Weight: ${pokemons[i].weight}
        <br><br>
        Height: ${pokemons[i].height}  
        <br><br>
        Trivia: <br> ${pokemons[i].aboutText}
      </div>

      <div id="moves" style="display:none; justify-content: space-around;">
        <div style="border-right: solid 1px black; width: 100%;">
          <p>Abilities: <br><br>${pokemons[i].firstAbility} <br><br> ${pokemons[i].secondAbility}</p>
        </div>
        <br>
        <div style="width: 100%;">
          <p>Moves: <br><br>${pokemons[i].firstMove} <br><br> ${pokemons[i].secondMove}</p>
        </div>
      </div>
  </div>
  `;
}

function overlayTemplateForFoundPokemon(i) {
  return /*html*/ `
  <div class="pokemonOverlay" id="pokemonOverlay${i}">
      <div style="width: 100%; height: 100%; display:flex; flex-direction: column; justify-content: space-between;">
        <div style="height: 50%; width: 100%; display:flex; flex-direction: column; justify-content: space-between;">
      <div class="firstRowInCard">
        <div>
          <h2>${foundPokemonsArray[i].name}</h2>
        </div>
        <div style="display:flex; gap:5px; align-items:center">
          <p style="font-size:16px">HP:</p><h2> ${foundPokemonsArray[i].hp}</h2>
        </div>
      </div>

      <div id="evolutionChain">
        <div style="display: flex; justify-content: flex-end; flex-direction: column; gap: 10px; height: 100px">
          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='14 6 8 12 14 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil links" class="arrow-img" onclick="renderBeforeFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
        </div>
        <img src="${foundPokemonsArray[i].pokemonImg}" alt="pokemon${i}" id="actualPokemonImg">
        <div style="display: flex; justify-content: flex-end; flex-direction: column; gap: 10px; height: 100px">
          <img src="data:image/svg+xml;utf8,
            <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='12' fill='rgba(8,33,41,0.7)'/>
              <polyline points='10 6 16 12 10 18' fill='none' stroke='%234fa1c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
            </svg>" alt="Pfeil rechts" class="arrow-img" onclick="renderNextFoundPokemonInOverlay(${i}); dontcloseOverlay(event);">
        </div>
      </div>   
    
    <nav class="navBar">
      <p onclick="about(event)">About</p><p onclick="baseStats(event)">Base Stats</p><p onclick="moves(event)">Moves</p>
    </nav>    
</div>
      <div id="baseStats">
          <div class="showProgressBars">
            <div><p>ATTACK: ${foundPokemonsArray[i].attack}</p></div>
            <div class="myProgress">
              <div id="myBarATTOverlay" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>DEFENSE: ${foundPokemonsArray[i].defense}</p></div>
            <div class="myProgress">
              <div id="myBarDEFOverlay" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SP-ATT: ${foundPokemonsArray[i].sp_attack}</p></div>
            <div class="myProgress">
              <div id="myBarSP_AttOverlay" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SP-DEF: ${foundPokemonsArray[i].sp_defense}</p></div>
            <div class="myProgress">
              <div id="myBarSP_DefOverlay" class="myBar"></div>
            </div>
          </div>
          <div class="showProgressBars">
            <div><p>SPEED: ${foundPokemonsArray[i].speed}</p></div>
            <div class="myProgress">
              <div id="myBarSpeedOverlay" class="myBar"></div>
            </div>
          </div>
      </div>

      <div id="about" style="display:none;">
        Habitat: ${foundPokemonsArray[i].habitat}
        <br><br>
        Weight: ${foundPokemonsArray[i].weight}
        <br><br>
        Height: ${foundPokemonsArray[i].height}        
        <br><br>
        Trivia: <br> ${foundPokemonsArray[i].aboutText}
      </div>
      
      <div id="moves" style="display:none; justify-content: space-around;">
        <div style="border-right: solid 1px black; width: 100%;">
          <p>Abilities:<br><br> ${foundPokemonsArray[i].firstAbility} <br><br> ${foundPokemonsArray[i].secondAbility}</p>
        </div>  
        <br>
        <div style="width: 100%;">
          <p>Moves: <br><br> ${foundPokemonsArray[i].firstMove} <br><br> ${foundPokemonsArray[i].secondMove}</p>
        </div>
      </div>
  </div>
  `;
}