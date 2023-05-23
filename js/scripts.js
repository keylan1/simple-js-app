let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Charizard",
      height: 1.7,
      types: ["fire", "flying"],
    },
    {
      name: "Lucario",
      height: 1.2,
      types: ["steel", "fighting"],
    },
    {
      name: "Altaria",
      height: 1.1,
      types: ["dragon", "flying"],
    },
  ];

  function add(item) {
    if (typeof item === "object") {
      if (Object.keys === item.keys) {
        return pokemonList.push(item); //function that adds item to pokemonList
      } else {
        alert("Input error, keys do not match, please try again.");
      }
    } else {
      alert("Input error, not an object, please try again.");
    }
  }

  function getAll() {
    return pokemonList; //function that prints pokemonList
  }

  return {
    //return value of pokemonRepository
    add: add,
    getAll: getAll,
  };
})();

/* Using a forEach() loop instead of for loop to iterate over every Pokémon in the array) */

document.write(
  '<div style="display: flex; justify-content: center;"><ul style="list-style-type: none;">'
);

pokemonRepository.getAll().forEach((pokemon) => {
  if (pokemon.height > 1.5) {
    document.write(
      `<li>${pokemon.name} (height: ${pokemon.height}) - Wow, that\'s big!</p>`
    );
  } else {
    document.write(`<li>${pokemon.name} (height: ${pokemon.height})</p>`);
  }
});

document.write("</ul></div>");