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
      let poker = 0;
      let ordered = this.hand.map(x => Object.values(x)[1]).sort();
      let first_four = ordered.splice(0, 4);
      ordered = this.hand.map(x => Object.values(x)[1]).sort();
      let last_four = ordered.splice(1, 4);
      poker = (first_four.every(x => first_four[0] == x)) 
        ? first_four.reduce((acc, curr) => acc + curr) 
        : (last_four.every(y => last_four[0] == y)) 
        ? last_four.reduce((acc, curr) => acc + curr) 
        : 0;
      return poker;
    }
    house() {
      let ordered = this.hand.map(x => Object.values(x)[1]).sort();
      
      let triplet = (ordered.slice(0, 3).every(x => ordered[0] == x)) ? ordered.slice(0, 3).reduce((acc, curr) => acc + values.indexOf(curr)) : (ordered.slice(2, 3).every(y => ordered[-1] == y)) ? ordered.slice(2, 3).reduce((acc, curr) => acc + values.indexOf(curr)) : 0;
      let double = (ordered.slice(0, 2).every(a => ordered[0] == a)) ? ordered.slice(0, 2).reduce((acc, curr) => acc + values.indexOf(curr)) : (ordered.slice(3).every(b => ordered[-1] == b)) ? ordered.slice(3).reduce((acc, curr) => acc + values.indexOf(curr)) : 0;      
      let result_house = ((triplet !=0) && (double !=0)) ? triplet + double : 0;
      
      return result_house;
      
    }
    flush() {
      let suits = this.hand.map(x => Object.values(x)[0]);
      let result_flush = (suits.every(x => x == suits[0])) ? suits.reduce(((acc, curr) => acc + suit.indexOf(curr)), suit.indexOf(suits[0])) : 0; 
      return result_flush;
    }
    straight() {
      let ordered = this.hand.map(x => Object.values(x)[1]).sort();
      let straight_result = (ordered.every((x, i) => x == Object.values(this.hand[i])[1])) ? ordered.reduce((acc, curr) => acc + curr) : 0;
      return straight_result;
    }
    three() {
      let ordered = this.hand.map(x => Object.values(x)[1]).sort();
      let three_result = (ordered.some((x, i) => x == ordered[i+1] && x == ordered[i+2])) ? ordered.filter((z, i) => z == ordered[i+1] && z == ordered[i+2]) : 0;
      return three_result;
    }
    two_pairs() {
      let pairs = [],
          ordered = this.hand.map(x => Object.values(x)[1]).sort();
      for (let i = 0; i < ordered.length; i++) {
        if ((ordered[i] == ordered[i+1]) && (ordered[i] != ordered[i+1])) {pairs.push(values.indexOf(ordered[i]))}
      }
      return pairs;
      
    }
    pair() {
      let ordered = this.hand.map(x => Object.values(x)[1]).sort(),
          result_pair = 0;
      for (let i = 0; i < ordered.length; i++) {
        if ((ordered[i] == ordered[i+1]) && (ordered[i] != ordered[i+1])) {result_pair = values.indexOf(ordered[i])}
      }
      return result_pair;
      
    }
    highest() {
      let ordered = this.hand.map(x => Object.values(x)[1]).sort();
      return values.indexOf(ordered[-1])
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
      console.log(`${winner} wins with a Straight Flush!`);
      window.alert(winner + " wins with a Straight Flush!");
      game_over = true;
    }
    else if ((p1_flush != false) || (p2_flush != false)){
      let winner = (p1_flush) ? p1.name : p2.name;
      console.log(`${winner} wins with a Straight Flush!`)
      window.alert(winner + " wins with a Straight Flush!");
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
      console.log(`${winner} wins with a Poker!`);
      window.alert(winner + " wins with a Poker!");
      game_over = true;
    }
    else if ((p1_poker != 0) || (p2_poker != 0)){
        let winner = (p1_poker != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Poker!`);
        window.alert(winner + " wins with a Poker!");
        game_over = true;
      }
    return game_over;
  }

  function full_house(p1, p2) {
  
    let p1_house = p1.house();
    let p2_house = p2.house();
    let game_over = false;
    
    if ((p1_house != 0) && (p2_house != 0)) {
      let winner = (p1_house > p2_house) ? p1.name : p2.name;
      console.log(`${winner} wins with a Full House!`);
      window.alert(winner + " wins with a Full House!");
      game_over = true;
    }
    else if ((p1_house != 0) || (p2_house != 0)){
        let winner = (p1_house != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Full House!`);
        window.alert(winner + " wins with a Full House!");
        game_over = true;
      }
    
    return game_over;
  }

  function flush (p1, p2) {
    let p1_flush = p1.flush();
    let p2_flush = p2.flush();
    let game_over = false;
    
    if ((p1_flush != 0) && (p2_flush != 0)) {
      let winner = (p1_flush > p2_flush) ? p1.name : p2.name;
      console.log(`${winner} wins with a Flush!`);
      window.alert(winner + " wins with a Flush!");
      game_over = true;
    }
    else if ((p1_flush != 0) || (p2_flush != 0)){
        let winner = (p1_flush != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Flush!`);
        window.alert(winner + " wins with a Flush!");
        game_over = true;
      }
    
    return game_over;
  }

  function straight(p1, p2) {
    let p1_straight = p1.straight();
    let p2_straight = p2.straight();
    let game_over = false;
    
    if ((p1_straight != 0) && (p2_straight != 0)) {
      let winner = (p1_straight > p2_straight) ? p1.name : p2.name;
      console.log(`${winner} wins with a Straight Hand!`);
      window.alert(winner + " wins with a Straight Hand!");
      game_over = true;
    }
    else if ((p1_straight != 0) || (p2_straight != 0)){
        let winner = (p1_straight != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Straight Hand!`);
        window.alert(winner + " wins with a Straight Hand!");
        game_over = true;
      }
    
    return game_over;
  }

  function three(p1, p2) {
    let p1_three = p1.three();
    let p2_three = p2.three();
    let game_over = false;
    
    if ((p1_three != 0) && (p2_three != 0)) {
      let winner = (p1_three > p2_three) ? p1.name : p2.name;
      console.log(`${winner} wins with a Three of a Kind!`);
      window.alert(winner + " wins with a Three of a Kind!");
      game_over = true;
    }
    else if ((p1_three != 0) || (p2_three != 0)){
        let winner = (p1_three != 0) ? p1.name : p2.name;
        console.log(`${winner} wins with a Three of a Kind!`);
        window.alert(winner + " wins with a Three of a Kind!");
        game_over = true;
      }
    
    return game_over;
  }

  function two_pairs(p1, p2) {
    let p1_two_pairs = p1.two_pairs();
    let p2_two_pairs = p2.two_pairs();
    let game_over = false;
    if ((p1_two_pairs == 0) && (p1_two_pairs == 0)) {return game_over}
    else if ((p1_two_pairs[0] != p2_two_pairs[0]) && (p1_two_pairs[1] != p2_two_pairs[1])) {
      let winner = (p1_two_pairs.reduce((acc, curr) => acc+curr) > p2_two_pairs.reduce((acc, curr) => acc+curr)) ? p1.name : p2.name;
      console.log(`${winner} wins with a Two Pairs!`);
      window.alert(winner + " wins with a Two Pairs!");
      game_over = true;
    }
    else if ((p1_two_pairs[0] == p2_two_pairs[0]) && (p1_two_pairs[1] == p2_two_pairs[1])){
      let remaining_p1 = p1.hand.map(x => Object.values(x)[1]).sort().filter(z => (z != p1_two_pairs[0]) && (z != p1_two_pairs[1]));
      let remaining_p2 = p2.hand.map(x => Object.values(x)[1]).sort().filter(z => (z != p1_two_pairs[0]) && (z != p1_two_pairs[1]));
      let winner = (remaining_p1 > remaining_p2) ? p1.name : p2.name;
        console.log(`${winner} wins with a Two pairs!`);
        window.alert(winner + " wins with a Two Pairs!");
        game_over = true;
      }
    else if (p1_two_pairs[0] == p2_two_pairs[0]) {
      let winner = (p1_two_pairs[0] > p2_two_pairs[0]) ? p1.name : p2.name;
      console.log(`${winner} wins with a Two Pairs!`);
      window.alert(winner + " wins with a Two Pairs!");
      game_over = true;}
    
    
    return game_over;
  }
      
  function pair(p1, p2) {
    let p1_pair = p1.pair();
    let p2_pair = p2.pair();
    let game_over = false;
    
    if ((p1_pair != 0) && (p2_pair != 0)) {
      let winner = (p1_pair > p2_pair) ? p1.name : p2.name;
      console.log(`${winner} wins with a Pair!`);
      window.alert(winner + " wins with a Pair!");
      game_over = true;
    }
    
    return game_over;
  }

  function highest(p1, p2) {
    let p1_highest = p1.highest();
    let p2_highest = p2.highest();
    let game_over = false;
    
    let winner = (p1_highest > p2_highest) ? p1.name : p2.name;
    if (winner) {
      console.log(`${winner} wins with a Highest!`);
      window.alert(winner + " wins with a Highest!");
      game_over = true;
    }
    
    return game_over;
  };

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
    
    let new_game = "no",
        play_array = [straight_flush, poker, full_house, flush, straight, three, two_pairs, pair, highest];
        
    for (let i = 0; i < play_array.length; i++) {
      if (play_array[i](player_one, player_two)) {
        new_game = prompt("Would you like to play again yes/no", "yes");
        break;
      }
    }    
    if (new_game == "yes") {return showdown ()}

    return new_game
  }

console.log(showdown())