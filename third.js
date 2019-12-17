// define the four possible suits
const suit = ["S", "H", "C", "D"];
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
    straight_flush_order() {
        let result = 0;
        let ordered = this.hand.map(x => Object.values(x)[1]).sort();
        if (values.join("").includes(ordered.join(""))) {result = ordered.reduce((acc, curr) => acc + values.indexOf(curr))}
        return result;
        
    }
    straight_flush_suit() {
    let all_equal = false;
    let first = Object.values(this.hand[0]);
    if (this.hand.every(x => first[0] == Object.values(x)[0])) {all_equal = true}
    return all_equal;
    }
    poker() {
        let poker = 0,
            ordered = this.hand.map(x => Object.values(x)[1]).sort(),
            first_four = this.hand.splice(0, 4),
            last_four = this.hand.splice(1, 4);
            poker += (first_four.every(x => first_four[0] == x)) ? first_four.reduce((acc, curr) => acc + curr) : (last_four.every(y => last_four[0] == y)) ? last_four.reduce((acc, curr) => acc + curr) : 0;
        return poker;
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

function straight_flush(p1, p2) {
    
    let p1_flush = ((!p1.straight_flush_order() == 0) && (p1.straight_flush_suit())) ? p1.straight_flush_order() : false;
    let p2_flush = ((!p2.straight_flush_order() == 0) && (p2.straight_flush_suit())) ? p2.straight_flush_order() : false;
    let game_over = false;
    
    if ((p1_flush != false) && (p2_flush != false)) {
      let winner = (p1_flush > p2_flush) ? p1.name : p2.name;
      console.log(`${winner} wins with a Straight Flush!`)
      game_over = true;
    }
    else if ((p1_flush != false) || (p2_flush != false)){
      let winner = (p1_flush) ? p1.name : p2.name;
      console.log(`${winner} wins with a Straight Flush!`)
      game_over = true;
    }
  return game_over;
  }

  function poker(p1, p2) {
    let p1_poker = p1.poker();
    let p2_poker = p2.poker();
    let game_over = false;
    if ((p1_poker != 0) && (p2_poker != 0)) {
      let winner = (p1_poker > p2_poker) ? p1.name : p2.name;
      console.log(`${winner} wins with a Poker!`)
      game_over = true;
    }
    else if ((p1_poker != 0) || (p2_poker != 0)){
        let winner = (p1_poker != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Poker!`)
        game_over = true;
      }
    return game_over;
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

    straight_flush(player_one, player_two);
    poker(player_one, player_two);


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