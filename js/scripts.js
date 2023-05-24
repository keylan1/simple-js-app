let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(item) {
    if (typeof item === "object" && "name" in item && "detailsUrl" in item) {
        return pokemonList.push(item); //function that adds item to pokemonList
    } else {
      alert("Input error, wrong properties or not an object, please try again.");
    }
  }

  function getAll() {
    return pokemonList; //function that prints pokemonList
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
    console.log(loadDetails);
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    //return value of pokemonRepository
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem
  };
})();

/* Using a forEach() loop to iterate over every Pokémon in the array) */
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach((pokemon)=>{
    pokemonRepository.addListItem(pokemon);
  });
});
