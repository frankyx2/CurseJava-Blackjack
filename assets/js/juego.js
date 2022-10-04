/**
 * 2C = 2 de Treboles (clubs)
 * 2D = 2 de Diamantes (Diamonds)
 * 2H = 2 de Corazones (Hearts)
 * 2S = 2 de Espadas (Spades)
 */

let deck = [];
const types = ["C", "D", "H", "S"];
const letter = ["A", "J", "Q", "K"];

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
  console.log(deck);
  console.log(chart); // carta deve de ser de la baraja
  return chart;
};
orderChart();
