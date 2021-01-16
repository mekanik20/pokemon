//pokemon array IIFE
let myVariable = 'pokemonList';
console.log(typeof myVariable);
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: ' Arcanine- ',
      height: 1.9,
      types: [' flashfire', ' intimidate', ' justified'],
    },
    {
      name: ' Aggron- ',
      height: 2.1,
      types: [' sturdy', ' rock-head', ' heavy-metal'],
    },
    {
      name: ' Scyther- ',
      height: 1.5,
      types: [' swarm', ' steadfast ', ' technician'],
    }
  ];
  
  function add(item) {
    pokemonList.push(item);
  }

  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll
  };
})();

// forEach() loop logging details of pokemonList
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<h1>" + pokemon.name + pokemon.types + "</h1>")
});

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll());

