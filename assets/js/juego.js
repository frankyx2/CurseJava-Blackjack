/**
 * 2C = 2 de Treboles (clubs)
 * 2D = 2 de Diamantes (Diamonds)
 * 2H = 2 de Corazones (Hearts)
 * 2S = 2 de Espadas (Spades)
 */

let deck = [];
const types = ["C", "D", "H", "S"];
const letter = ["A", "J", "Q", "K"];
let pountsPlayer = 0;
let pountsComputer = 0;

//Referencias HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
// const smallPounts = document.querySelector("#pount_player");
const smallPounts = document.querySelectorAll("small");
//Esta funcion crea un nuevo Deck o baraja
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  //Adicionamos las las cartas especiales que tiene letras
  for (let i = 0; i < letter.length; i++) {
    for (let type of types) {
      deck.push(letter[i] + type);
    }
  }
  //   console.log(deck);
  deck = _.shuffle(deck); // con la libreria undescore barajamos el arreglo
  console.log(deck);
  return deck;
};

createDeck();

//Esta funcion me permite tomar una carta
const orderChart = () => {
  if (deck.length === 0) {
    throw "No hay Cartas en el Deck";
  }
  const chart = deck.pop();
  return chart;
};
//orderChart();

//Esta funcion nos permite contar el valor de las cartas
const valueChart = (chart) => {
  const value = chart.substring(0, chart.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};
//##########Otra Forma##############
//   let pounts = 0;
//   !isNaN(value) ? (pounts = value * 1) : (pounts = value === "A" ? 11 : 10);
//   console.log(pounts);
// };
//##########Otra Forma##############
//   if (isNaN(value)) {
//     pounts = value === "A" ? 11 : 10;
//   } else {
//     pounts = value * 1;
//   }
//   console.log(pounts);
// };

//turno de la computadora
const turnComputer = (pountsMin) => {
  do {
    const chart = orderChart();
    pountsComputer = pountsComputer + valueChart(chart);
    smallPounts[1].innerHTML = pountsComputer;

    //<img class="cartas" src="assets/cartas/10D.png" alt="" />
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${chart}.png`;
    imgCarta.classList.add("cartas");
    divCartasComputadora.append(imgCarta);

    if (pountsMin > 21) {
      break;
    }
  } while (pountsComputer < pountsMin && pountsMin < 21);
  setTimeout(() => {
    //Instruccion utilizada para dar un tiempo para que la aplicacion reponda
    if (pountsMin > 21 || pountsComputer < pountsMin || pountsComputer === 21) {
      alert("Gana Computadora");
    } else if (pountsMin === 21 || pountsMin < pountsComputer) {
      alert("Gana Jugador");
    } else if (pountsComputer === pountsPlayer) {
      alert("Empate Tecnico");
    }
  }, 20);
};

//eventos
btnPedir.addEventListener("click", () => {
  const chart = orderChart();
  //   console.log(chart);
  pountsPlayer = pountsPlayer + valueChart(chart);
  //   console.log(pountsPlayer);
  smallPounts[0].innerHTML = pountsPlayer;
  //<img class="cartas" src="assets/cartas/10D.png" alt="" />
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${chart}.png`;
  imgCarta.classList.add("cartas");
  divCartasJugador.append(imgCarta);

  if (pountsPlayer > 21) {
    console.warn("Perdio Palomo");
    btnPedir.disabled = true;
    turnComputer(pountsPlayer);
    btnDetener.disabled = true;
  } else if (pountsPlayer === 21) {
    console.log("Coronaste palomo");
    btnPedir.disabled = true;
    turnComputer(pountsPlayer);
    btnDetener.disabled = true;
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnComputer(pountsPlayer);
});
btnNuevoJuego.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = createDeck();
  pountsPlayer = 0;
  pountsComputer = 0;
  smallPounts[0].innerText = 0;
  smallPounts[1].innerText = 0;
  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
