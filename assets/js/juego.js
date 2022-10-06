(() => {
  "use strict";

  let deck = [];

  const types = ["C", "D", "H", "S"],
    letter = ["A", "J", "Q", "K"];

  let pountsPlayers = [];

  //Referencias HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevoJuego = document.querySelector("#btnNuevo");

  const divChartsPlayer = document.querySelectorAll(".divCharts"),
    smallPounts = document.querySelectorAll("small");

  const inizializeGame = (numPlayers = 2) => {
    deck = createDeck();
    for (let i = 0; i < numPlayers; i++) {
      pountsPlayers.push(0);
    }
  };

  //Esta funcion crea un nuevo Deck o baraja
  const createDeck = () => {
    let deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    for (let i = 0; i < letter.length; i++) {
      for (let type of types) {
        deck.push(letter[i] + type);
      }
    }
    return _.shuffle(deck); // con la libreria undescore barajamos el arreglo
  };
  //Esta funcion me permite tomar una carta
  const orderChart = () => {
    if (deck.length === 0) {
      throw "No hay Cartas en el Deck";
    }
    return deck.pop();
  };
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

  //turno 0: Primer jugador, Ultimo la pc
  const accumulatePoints = (chart, turn) => {
    pountsPlayers[turn] = pountsPlayers[turn] + valueChart(chart);
    smallPounts[turn].innerText = pountsPlayers[turn];
    return pountsPlayers[turn];
  };

  const createChart = (chart, turn) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${chart}.png`;
    imgCarta.classList.add("cartas");
    divChartsPlayer[turn].append(imgCarta);
  };
  //turno de la computadora
  const turnComputer = (pountsMin) => {
    let pountsComputer = 0;
    do {
      const chart = orderChart();
      pountsComputer = accumulatePoints(chart, pountsPlayers.length - 1);
      createChart(chart, pountsPlayers.length - 1);
      // const imgCarta = document.createElement("img");
      // imgCarta.src = `assets/cartas/${chart}.png`;
      // imgCarta.classList.add("cartas");
      // divCartasComputadora.append(imgCarta);

      if (pountsMin > 21) {
        break;
      }
    } while (pountsComputer < pountsMin && pountsMin < 21);
    setTimeout(() => {
      //Instruccion utilizada para dar un tiempo para que la aplicacion reponda
      if (
        pountsMin > 21 ||
        pountsComputer < pountsMin ||
        pountsComputer === 21
      ) {
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
    const pountsPlayer = accumulatePoints(chart, 0);
    createChart(chart, 0);

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
    // console.clear();
    // deck = [];
    inizializeGame();
    deck = createDeck();
    // pountsPlayer = 0;
    // pountsComputer = 0;
    // smallPounts[0].innerText = 0;
    // smallPounts[1].innerText = 0;
    // divCartasJugador.innerHTML = "";
    // divCartasComputadora.innerHTML = "";
    // btnPedir.disabled = false;
    // btnDetener.disabled = false;
  });
})();
