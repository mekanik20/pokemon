//pokemon array IIFE
//let myVariable = 'pokemonList';
//console.log(typeof myVariable);
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Arcanine ',
      height: 1.9,
      types: ['flashfire', 'intimidate', 'justified'],
    },
    {
      name: ' Aggron ',
      height: 2.1,
      types: ['sturdy', 'rock-head', 'heavy-metal'],
    },
    {
      name: ' Scyther ',
      height: 1.5,
      types: ['swarm', 'steadfast', 'technician'],
    }
  ];

// forEach() loop logging details of pokemonList
pokemonList.forEach(function(pokemon) {
  document.write("<h1>" + pokemon.name + "</h1>")
});
  
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

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll());

