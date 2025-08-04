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
const typeBackgroundStyles = {
  Fire: "linear-gradient(135deg, #ff7e00, #ff1a1a)",
  Normal: "linear-gradient(135deg, #d3d3d3, #8a867f)",
  Water: "linear-gradient(135deg, #44bbff, #0077be)",
  Electric: "linear-gradient(135deg, #fff700, #d1c000)",
  Grass: "linear-gradient(135deg, #a8e063, #56ab2f)",
  Ice: "linear-gradient(135deg, #e0ffff, #6cf7ff)",
  Fighting: "linear-gradient(135deg, #800000, #b22222)",
  Poison: "linear-gradient(135deg, #800080, #9932cc)",
  Ground: "linear-gradient(135deg, #c2b280, #dccd83)",
  Flying: "linear-gradient(135deg, #87cefa, #00bfff)",
  Psychic: "linear-gradient(135deg, #ff69b4, #ff1493)",
  Bug: "linear-gradient(135deg, #a0c400, #808000)",
  Rock: "linear-gradient(135deg, #c6a553, #8b7d6b)",
  Ghost: "linear-gradient(135deg, #6e4bb6, #4444aa)",
  Dragon: "linear-gradient(135deg, #6f42c1, #9176ff)",
  Dark: "linear-gradient(135deg, #2c2c2c, #1c0909)",
  Steel: "linear-gradient(135deg, #c0c0c0, #708090)",
  Fairy: "linear-gradient(135deg, #ffb6c1, #ff00ff)"
};