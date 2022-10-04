/**
 * 2C = 2 de Treboles (clubs)
 * 2D = 2 de Diamantes (Diamonds)
 * 2H = 2 de Corazones (Hearts)
 * 2S = 2 de Espadas (Spades)
 */

let deck = [];
const types = ["C", "D", "H", "S"];
const letter = ["A", "J", "Q", "K"];

const createDeck = () => {
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
  console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};
createDeck();
