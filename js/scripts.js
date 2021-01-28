//pokemon array IIFE
//let myVariable = 'pokemonList';
//console.log(typeof myVariable);
//loadList() and loadDetails() added
let pokemonRepository = (function () {  
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.com/api/v2/pokemon/?limit=150';
  
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
    button.addEventListener("click", function(event){
      showDetails(pokemon.name);
      showDetails(pokemon);
    });
  }

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
    })
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
 
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(funciton () {
    console.log(pokemon);
    });
  }
 
  //for adding new pokemon into the array
  return {
    add: add,
    getAll: getAll,
    loadLIst: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});