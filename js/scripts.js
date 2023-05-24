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
    if (typeof item === "object" && "name" in item && "height" in item && "types" in item) {
        return pokemonList.push(item); //function that adds item to pokemonList
    } else {
      alert("Input error, wrong properties or not an object, please try again.");
    }
  }

  function getAll() {
    return pokemonList; //function that prints pokemonList
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener("click", function () { //console.log pokemon on click
      showDetails(pokemon);
    });
  }

  return {
    //return value of pokemonRepository
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

/* Using a forEach() loop to iterate over every Pokémon in the array) */

pokemonRepository.getAll().forEach((pokemon) => {
pokemonRepository.addListItem(pokemon);
});

/*  function add(item) {
    if (typeof item === "object") {
      if (Object.keys(pokemonList) == Object.keys(item)) {
        return pokemonList.push(item); //function that adds item to pokemonList
      } else {
        alert("Input error, keys do not match, please try again.");
      }
    } else {
      alert("Input error, not an object, please try again.");
    }
  }*/