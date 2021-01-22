//pokemon array IIFE
//let myVariable = 'pokemonList';
//console.log(typeof myVariable);
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: ' Arcanine ',
      height: 1.9,
      types: [' flashfire', ' intimidate', ' justified'],
    },
    {
      name: ' Aggron ',
      height: 2.1,
      types: [' sturdy', ' rock-head', ' heavy-metal'],
    },
    {
      name: ' Scyther ',
      height: 1.5,
      types: [' swarm', ' steadfast ', ' technician'],
    }
  ];
 
  //adding of pokemon(s)
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
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
  function addListItem(pokemon){
    let pokemonFile = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button");
    listpokemon.appendChild(button);
    pokemonFile.appendChild(listpokemon);  
   // event listener for button click
    button.addEventListener('click', function(event){
      showDetails(pokemon.name)
      showDetails(pokemon)
    })
  }

  function showDetails(pokemon){
    console.log(pokemon)
  }
 
  //for adding new pokemon into the array
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: [' electric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });