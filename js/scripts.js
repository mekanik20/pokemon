//pokemon array IIFE
let myVariable = 'pokemonList';
console.log(typeof myVariable);
let pokemonList = (function () { [
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
    },
]})();
console.log(pokemonList);

// forEach() loop logging details of pokemonList
//let pokemonList = ['Arcanine', 'Aggron', 'Scyther'];
pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + ' is ' + pokemon.height + ' meters tall ' + ' - ' + "types: " + pokemon.types);
});

//pokemonRepository variable
let pokemonRepository = (function () {
  let privatePokemonList= [];

  function add(item) {
    privatePokemonList.push(item);
  }

  function getAll() {
    return privatePokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Aggron' });
console.log(pokemonRepository.getAll());



// for loop for pokemonList
//for (let i = 0; i < pokemonList.length; i++){
//  const pokemon = pokemonList[i];
//  console.log(pokemon);
//  document.write(pokemon.name + pokemon.height);
// define specific pokemon as a big pokemon
//if (pokemon.height > 2.0) {
//  console.log("Wow, that\'s big!");
//  document.write("-" + "Wow that\'s big!");
//}
//}
