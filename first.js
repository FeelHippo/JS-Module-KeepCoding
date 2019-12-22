class Number{
  constructor (num) {
    this.num = num
  }
  
  contains_self(converted) {
    let repeats = {
          Foo: 0,
          Bar: 0,
          Quix: 0
        }
      repeats["Foo"] = converted.filter(x => x == 3).length;
      repeats["Bar"] = converted.filter(x => x == 5).length;
      repeats["Quix"] = converted.filter(x => x == 7).length;
      return repeats;
  }
  
  div_three() {
    return (this.num%3==0);
  }
  
  div_five() {
    return (this.num%5==0);
  }
  
  div_seven() {
    return (this.num%7==0);
  }
  
  div_both() {
    return ((this.num%5==0) && (this.num%7==0));
  }
  
  string() {
    let temp_string = (this.div_three()) ? "Foo " : "";
    temp_string += ((this.div_five()) && (this.div_seven())) ? "Bar Quix " : (this.div_five()) ? "Bar " : (this.div_seven()) ? "Quix " : "";
   
    if (this.num.toString().split("").some(x => x == "3"|| x == "5"|| x == "7")) {
          let times = this.contains_self(this.num.toString().split(""));
          temp_string = temp_string.split(" ");
          temp_string = temp_string.map(z => z.concat(z.repeat(times[z]))).join("").trim();
      
    }
    return temp_string;
  }

  result() {
    if (this.string()=="") {return this.num}
    else {return this.string()}
  }
}

function execute () {
  let iterations = prompt("Insert number of iterations", 10);
  let print = [];
  for (let i = 0; i < iterations; i++) {
    let temp_num = new Number(i + 1);
    print.push((i+1).toString() + " = " + temp_num.result());
  }
  return print;
}



console.log(execute ());