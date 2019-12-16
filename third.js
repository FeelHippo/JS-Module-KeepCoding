// define the four possible suits
const suit = [{spades: "S"}, {hearts: "H"}, {clubs: "C"}, {diamonds: "D"}];
// define all possible card values
const values = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];
// create an empty pack
let pack = [];


// define a card object
class Card {
    constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    }
}

// ... and a player
class Player {
    constructor(name, hand) {
        this.name = name;
        this.hand = hand;
    }
}

// let's re-shuffle the pack
function shuffle() {
  
    for (i=0; i<52; i++) {
        let random_suit = suit[Math.floor(Math.random() * (3 - 0 + 1)) + 0],
            random_value = values[Math.floor(Math.random() * (12 - 0 + 1)) + 0],
            card = new Card(random_suit, random_value);
        if (!pack.some(x => (x.suit == card.suit) && (x.value == card.value))) {pack.push(card);}
      }
  return pack;
}


function showdown () {

    // create two separate and unique hands    
    
    let current_pack = shuffle();
    let hand_one = [],
        hand_two = [];
  
    for (i = 0; i < 5; i++) {
        hand_one.push(current_pack.splice((Math.floor(Math.random() * (3 - 0 + 1)) + 0), 1)[0]);
        hand_two.push(current_pack.splice((Math.floor(Math.random() * (3 - 0 + 1)) + 0), 1)[0]);
        }
    
    // create two separate and unique players

    let player_one = new Player(prompt("Please enter first player", "San Gennaro"), hand_one),
        player_two = new Player(prompt("Please enter second player", "Cheesus"), hand_two);

        


  }




* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, 
el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente. 

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. 
Si las dos manos tienen pareja, entonces gana la que tenga la pareja más alta. 
Si ambas parejas son iguales entonces gana el que tenga la carta más alta. 

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. 
Si las dos manos tienen dobles parejas diferentes entonces gana aquella que tenga la pareja más alta. 
Si las dos manos tienen las mismas parejas entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante. 

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. 
Gana la mano que tiene las 3 cartas con mayor valor. 

* Straight (Escalera): La mano contiene 5 cartas consecutivas. 
Si las dos manos tienen escalera entonces gana la que tiene la carta más alta. 

* Flush (Color): La mano tiene 5 cartas con la misma cara. 
Si ambas manos tienen escalera entonces gana el que tenga la carta más alta. 

* Full House (Full): La mano tiene un trío y una pareja. 
En caso de tener ambas manos full entonces gana el que tenga el trío más alto. 

* Four of a Kind (Poker): 4 cartas con el mismo valor. 
En caso de tener ambas manos poker gana el que tenga el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. 
En caso de tener escalera las dos manos entonces gana el que tenga el valor más alto.