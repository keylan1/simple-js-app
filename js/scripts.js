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

for (let i = 0; pokemonList[i]; i++) {
  document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
}