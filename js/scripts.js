//pokemon array IIFE
//let myVariable = 'pokemonList';
//console.log(typeof myVariable);
//loadList() and loadDetails() added
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
 
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
 
//register and validation for email and password
// (function() {
//   let form = document.querySelector('#register-form');
//   let emailInput = document.querySelector('#email');
//   let passwordInput = document.querySelector ('#password');

//   function showErrorMessage(input, message) {
//     let container = input.parentElement;
//     let error = container.querySelector('.error-message');
//     if (error) {
//       container.removeChild(error);
//     }
//     if (message) {
//       let error = document.createElement('div');
//       error.classList.add('error-message');
//       error.innerText = message;
//       container.appendChild(error);
//     }
//   }

//   function validateEmail() {
//    let value = emailInput.value;
//    if (!value) {
//      showErrorMessage(emailInput, 'Email is a required field.');
//      return false;
//    }

//    if (value.indexOf('@') === -1) {
//      showErrorMessage(emailInput, 'You must enter a valid email address.');
//      return false;
//    }

//    if (value.indexOf('.') === -1) {
//      showErrorMessage(emailInput, 'You must enter a valid email address.')
//      return false;
//     //return value && hasAtSign && hasDot;
//    }

//    showErrorMessage(emailInput, null);
//    return true;
//   }

//   function validatePassword() {
//    let value = passwordInput.value;

//    if (!value) {
//      showErrorMessage(passwordInput, 'Password is a required field');
//      return false;
//    }

//    if (value.length < 8){
//      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
//      return false;
//    }
  
//    showErrorMessage(passwordInput, null);
//    return true;
//   }

//   function validateForm() {
//     let isValidEmail = validateEmail();
//     let isValidPassword = validatePassword();
//     return isValidEmail && isValidPassword;
//   }

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (valiidateForm()) {
//       alert('Success!');
//     }
//   });
// }());

//   emailInput.addEventListener('input', validateEmail);
//   passwordInput.addEventListener('input', validatePassword);


//modal dialog
// Modal insert
//let pokemonRepository = (function() {
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

  //   if (dialogPromiseReject) {
  //     dialogPromiseReject();
  //     dialogPromiseReject = null;
  //   }
  // }

  // function showDialog(title, text) {
  //   showModal(title, text);
  //   let modal = modalContainer.querySelector('.modal');

  //   let confirmButton = document.createElement('button');
  //   confirmButton.classList.add('modal-confirm');
  //   confirmButton.innerText = 'Confirm';

  //   let cancelButton = document.createElement('button');
  //   cancelButton.classList.add('modal-cancel');
  //   cancelButton.innerText = 'Cancel';

  //   modal.appendChild(confirmButton);
  //   modal.appendChild(cancelButton);

  //   confirmButton.focus();

  //   return new Promise((resolve, reject) => {
  //     cancelButton.addEventListener('click', hideModal);
  //     confirmButton.addEventListener('click', () => {
  //       dialogPromiseReject = null; 
  //       hideModal();
  //       resolve();
  //     });

  //     dialogPromiseReject = reject;
  //   });
  // }

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

  // document.querySelector('#show-modal').addEventListener('click', () => {
  //   showModal('My Modal', 'This is my modal, there are many like it but this one is mine.');
  // });

  // document.querySelector('#show-dialog').addEventListener('click', () => {
  //   showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
  //     alert('confirmed!');
  //   }, () => {
  //     alert('not confirmed');
  //   });
  // });
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
