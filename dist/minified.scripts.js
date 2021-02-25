let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150";return{getAll:function(){return t},loadList:function(n){return fetch(e).then(function(t){return t.json()}).then(function(e){e.results.forEach(function(e){!function(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("pokemon is incorrect")}({name:e.name,detailsUrl:e.url})})}).catch(function(t){console.error(t)})},loadDetails:function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=[],e.types.forEach(function(e){t.types.push(e.type.name)})}).catch(function(t){console.error(t)})},addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li"),o=document.createElement("button");o.innerText=t.name,o.classList.add("button","btn","btn-link","btn-block"),o.setAttribute("data-target","#pokemon-info"),o.setAttribute("data-toggle","modal"),n.appendChild(o),n.classList.add("list-group-item"),e.appendChild(n),o.addEventListener("click",function(e){var n;n=t,pokemonRepository.loadDetails(n).then(function(){$(".modal").innerHTML="";let t=document.querySelector(".modal-header");t.innerHTML=n.name;let e="<p>Height: "+n.height+"<p>",o="<p>Types: "+n.types.join(", ")+"</p>";document.querySelector(".modal-body").innerHTML=`<img src=${n.imageUrl} />`+e+o})})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});