let pokemonRepository = (function() {
  
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

return {}

})();

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

/*In the “scripts.js” file of your project, wrap your pokemonList array in an IIFE to avoid accidentally accessing the global state.
Before anything else, create a new pokemonRepository variable to hold what your IIFE will return, then assign the IIFE to that variable.
The IIFE should return an object with the following public functions assigned as keys:

    getAll: return all items (pokemonRepository.getAll(); should return the pokemonList array)
    add: add a single item to the pokemonList array (calling pokemonRepository.add(item); should add the Pokémon referred to with item to the pokemonList array)

Make sure both functions are defined separately with the function keyword. Also, the IIFE returns only an object with the same names for keys as values (see the last paragraph of the Exercise)
Outside of and below the IIFE, you should already have a forEach() loop that iterates over each Pokémon in the repository. But since you’ve limited access to the pokemonList array that’s inside the IIFE (so that it’s only accessible through one of the two functions returned by the IIFE), you need to update the loop code to cope with the new changes. Essentially, you need to use one of the two functions returned by the IIFE in order to retrieve the pokemonList array.
*/