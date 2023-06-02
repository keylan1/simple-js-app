let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function add(item) {
    if (typeof item === "object" && "name" in item && "detailsUrl" in item) {
      return pokemonList.push(item); //function that adds item to pokemonList
    } else {
      alert(
        "Input error, wrong properties or not an object, please try again."
      );
    }
  }

  function getAll() {
    return pokemonList; //function that prints pokemonList
  }

  //tells the DOM how to structure and initially display the information in the pokemonList we want to show.
  //the button calls the showDetails for the modal.
  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    listItem.classList.add("list-group-item");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button", "btn", "btn-secondary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    button.setAttribute("data-pokemon", pokemon.name);
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener("click", function () {
      //console.log pokemon on click
      showDetails(pokemon);
    });
  }

  //shows the list of pokemon to click on for further ino
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          //.results is a JSON property
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon); //comes from the add function in this IIFE
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //loads the details we then see in the modal
  function loadDetails(item) {
    let url = item.detailsUrl; //comes from the detailsUrl in our pokemon item (loadList)
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default; //command F in the url to find the sprite image and 1 option is front_default
        item.height = details.height; //also in the JSON file
        item.types = details.types; //idem
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modal = document.querySelector(".modal");
      let modalBody = document.querySelector(".modal-body");
      let modalTitle = document.querySelector(".modal-title");

      modalTitle.innerHTML = "";
      modalBody.innerHTML = ""; //necessary otherwise modals staple

      let titleElement = document.createElement("h1");
      titleElement.innerHTML = pokemon.name;

      let heightElement = document.createElement("p");
      heightElement.innerHTML =
        "Pokemon height is " + pokemon.height / 10 + " m.";

      let imgElement = document.createElement("img");
      imgElement.src = pokemon.imageUrl;

      modalTitle.appendChild(titleElement);
      modalBody.appendChild(heightElement);
      modalBody.appendChild(imgElement);
    });
  }

  function search(event) {
    event.preventDefault();

    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.toLowerCase();

    const pokemonListItems = document.querySelectorAll(
      ".pokemon-list .list-group-item"
    );

    let foundPokemon = null;

    pokemonListItems.forEach((listItem) => {
      const pokemonButton = listItem.querySelector(".pokemon-button");
      const pokemonName = pokemonButton.getAttribute("data-pokemon");

      if (pokemonName.toLowerCase() === searchTerm) {
        foundPokemon = listItem;
      }
    });

    pokemonListItems.forEach((listItem) => {
      const pokemonButton = listItem.querySelector(".pokemon-button");
      pokemonButton.classList.remove("highlight");
    });

    if (foundPokemon) {
      const offsetTop = foundPokemon.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });

      // Add highlight to the found Pokemon button
      const foundPokemonButton = foundPokemon.querySelector(".pokemon-button");
      foundPokemonButton.classList.add("highlight");
    }

    searchInput.value = "";
  }

  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", search);

  return {
    //return value of pokemonRepository
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

/* Using a forEach() loop to iterate over every Pokémon in the array). Without this,
  nothing is displayed on the screen*/
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
