//pokemon array IIFE
let pokemonRepository = (function () {  
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  //adding of pokemon(s)
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is incorrect");
    }
  }

    //show the pokemon list
  function getAll() {
     return pokemonList;
   }

  //buttons added for pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

   // event listener for button click
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //load list for pokemon from URL
  function loadList(pokemon) {
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

  //load the details for each pokemon from the URL
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = [];
      details.types.forEach(function (pokemonTypes) {
        pokemon.types.push(pokemonTypes.type.name);
      });
    })
    .catch(function (e) {
      console.error(e);
    });
  }
 
  //function for loadDetails and showDetails
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
 

  //modal creation point
  let modalContainer = document.querySelector("#modal-container");
  function showModal(pokemon) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");
  
    let pokemonImage = document.createElement("img");
    pokemonImage.classList.add("modal-img");
    pokemonImage.setAttribute("src", pokemon.imageUrl);

    // add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "height: " + pokemon.height;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  //eventListener for escape key pressed or click event to exit modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
