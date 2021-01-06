//pokemon array IIFE
(function () {
let myVariable = 'pokemonList';
console.log(typeof myVariable);
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
    },
]})();
console.log(pokemonList);

// forEach() loop logging details of pokemonList
let pokemonList = ['Arcanine', 'Aggron', 'Scyther'];
funtion myLoopFunction(pokemon) {
  console.log(pokemon.name + ' is ' + pokemon.height + ' meters tall ' + ' - ' + "types: " + pokemon.types);
}
pokemonList.forEach(myLoopFunction);

//pokemonRepository variable
let pokemonRepository = (function () {
  let pokemonList= [];

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
