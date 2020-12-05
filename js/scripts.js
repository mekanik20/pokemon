//pokemon array
let myVariable = 'pokemonList';
console.log(typeof myVariable);
let pokemonList = [
    {
      name: 'Arcanine ',
      height: 1.9,
      types: ['flashfire', 'intimidate', 'justified']
    },
    {
      name: ' Aggron ',
      height: 2.1,
      types: ['sturdy', 'rock-head', 'heavy-metal']
    },
    {
      name: ' Scyther ',
      height: 1.5,
      types: ['swarm', 'steadfast', 'technician']
    }
];

for (let i = 0; i < pokemonList.length; i++){
    const pokemon = pokemonList[i];
    console.log(pokemon);
    document.write(pokemon.name + pokemon.height);
}
// define specific pokemon as a big pokemon
let pokemon = {name: 'Aggron', height: 2.1}

if (pokemon.height > 2.0 || pokemon === 1){
    console.log(' Wow, that\'s big!');
    document.write(pokemon + 'Wow, that\'s big!');
  }
