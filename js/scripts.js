let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector('#modal-container');


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

  function addListItem(pokemon) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener("click", function () {
      //console.log pokemon on click
      showDetails(pokemon);
    });
  }

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
      modalContainer.classList.add('is-visible');
      let modal = document.createElement('div');
      modal.classList.add('modal');

      modalContainer.innerHTML = '';

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Pokemon height is ' + pokemon.height;

      let imgElement = document.createElement('img');
      imgElement.src = pokemon.imageUrl;

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(heightElement);
      modal.appendChild(imgElement);
      modalContainer.appendChild(modal);

    });
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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

  /* Using a forEach() loop to iterate over every Pokémon in the array) */
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
  });
