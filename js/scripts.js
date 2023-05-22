let pokemonList = [
  {
    name: 'Charizard',
    height: 1.7,
    types: ['fire', 'flying']
  },
  {
    name: 'Lucario',
    height: 1.2,
    types: ['steel', 'fighting']
  },
  {
    name: 'Altaria',
    height: 1.1,
    types: ['dragon', 'flying']
  },
];

/* looping through pokemonList to print name and height to the DOM using template literals */
// If pokemon.height is larger than 1.5, 'wow that's big' is added.

/* for (let i = 0; pokemonList[i]; i++) {
  if (pokemonList[i].height > 1.5) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that\'s big!</p>`);
  } else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
  }
} */

/* Using a forEach() loop instead of for loop to iterate over every Pokémon in the array) */

pokemonList.forEach(pokemon => {
  if (pokemon.height > 1.5) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that\'s big!</p>`);
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);
  }
});
