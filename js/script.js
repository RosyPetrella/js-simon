// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input
// in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri,
// il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// NOTA:
// non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

const divCountEl = document.getElementById("countdown");
const numberListEl = document.getElementById("numbers-list");
const formEl = document.getElementById("answers-form");
const inputEl = document.querySelectorAll("input");

let numbers = [];
let listItems = "";
let timer = 30;

// Generazione di 5 numeri casuali
function generateRandomNumber() {
  numbers = [];
  for (let i = 0; i < 5; i++) {
    const thisNumber = Math.round(Math.random() * 50) + 1;
    numbers.push(thisNumber);
    listItems += `<li>${thisNumber}</li>`;
  }
  console.log(numbers);

  // Aggiunta dei numeri generati alla lista in pagina
  numberListEl.innerHTML = `<ul>${listItems}</ul>`;

  //Aggiunta countdown
  const intervalID = setInterval(function () {
    timer--;
    divCountEl.innerText = timer;

    if (timer === 0) {
      clearInterval(intervalID);
      numberListEl.classList.add("d-none");
      formEl.classList.remove("d-none");
    }
  }, 1000);
}

generateRandomNumber();

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  let userInput = [];

  for (let i = 0; i < inputEl.length; i++) {
    userInput.push(parseInt(inputEl[i].value));
  }

  let correctNumbers = [];
  let wrongNumbers = [];

  for (let i = 0; i < userInput.length; i++) {
    if (numbers.includes(userInput[i])) {
      correctNumbers.push(userInput[i]);
    } else {
      wrongNumbers.push(userInput[i]);
    }
  }

  if (correctNumbers.length > 0) {
    alert(`Hai indovinato i seguenti numeri: ${correctNumbers.join(", ")}`);
  } else {
    alert("Non hai indovinato nessun numero!");
  }

  console.log(
    `Hai indovinato ${correctNumbers.length} numeri: ${correctNumbers.join(
      ", "
    )}`
  );
});
