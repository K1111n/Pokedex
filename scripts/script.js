function searchForPokemonWhenThreeCharactersEntered() {
  if (input.value.length < 3) {
    return;
  } else {
    searchForPokemon();
  }
}

function searchForPokemon() {}

async function fetchPokemon() {
  let pokemonArray = [];
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  responseAsJson = await response.json();
  console.log(responseAsJson);
  pokemonArray.push(responseAsJson);
  console.log(pokemonArray[0].results);
  for (i = 1; i < pokemonArray[0].results.length; i++) {
    let pokemonSection = document.getElementById("pokemonSection");
    pokemonSection.innerHTML += /*html*/ `
        <div class="pokemonDiv">
            <p>#${i}</p>
            <p>${pokemonArray[0].results[i].name}</p>
        </div>
    `;
  }
  pokemonSection.innerHTML += /*html*/ `
    <div>
        <button class="loadButton">Load more Pokemon</button>
    </div>
  `;
}

function renderPokemon() {}
