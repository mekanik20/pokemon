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
    button.classList.add("button", "btn-link", "group-list-item");
    button.setAttribute("data-target", "#pokemon-info");
    button.setAttribute("data-toggle", "modal");
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
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      $(".modal").innerHTML = "";
      let pokemonName = document.querySelector(".modal-header");
      pokemonName.innerHTML = item.name;
      let pokemonHeight = "<p>" + "Height: " + item.height + "<p>";
      let pokemonTypes = "<p>" + "Types: " + item.types.join(", ") + "</p>";
      document.querySelector(".modal-body").innerHTML = 
        `<img src=${item.imageUrl} />` + pokemonHeight + pokemonTypes;
    });
  }
 
  return {
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
