const  priority = [
    {roman: "IV", arabic: 4},
    {roman: "IX", arabic: 9},
    {roman: "XL", arabic: 40},
    {roman: "XC", arabic: 90}
          ];
  
  const  single_digit =[
    {roman: "V", arabic: 5},
    {roman: "X", arabic: 10},
    {roman: "L", arabic: 50},
    {roman: "C", arabic: 100},
    {roman: "D", arabic: 500},
    {roman: "M", arabic: 1000}
     ]

  // Roman to Arabic
  
  function roman_arabic (str) {
      str = str.split("");    
      let arabic = [];
      
      while (!str.length==0) {
      if (priority.some(x => x.roman == str.slice(-2).join(""))) {
        arabic.push(str.slice(-2).join(""));
        str.splice(-2, 2);
      } else{
        arabic.push(str[str.length-1]);
        str.pop();
      }
    }
    
    
    for (const priority_temp of priority) {
      for (const single_temp of single_digit ) {
        for (i = 0; i < arabic.length; i++) {
          if (arabic[i] == priority_temp.roman) {arabic[i] = priority_temp.arabic}
          else if (arabic[i] == single_temp.roman) {arabic[i] = single_temp.arabic}
        }
      }  
    }
    
    
    return arabic.reduce((acc, curr) => acc + curr)
    
  };
  
  
  console.log(roman_arabic ("MCCXLIV"))

  // Arabic to Roman

  
function arabic_roman (num) {
    num = num.toString().split("");
    let roman = [];
    
    while (!num.length==0) {
      if (priority.some(x => x.arabic == num.slice(-2).join(""))) {
        roman.push(num.slice(-2).join(""));
        num.splice(-2, 2);
      } else {
        roman.push(num[num.length-1]);
        num.pop();
      }
    }
    
    roman[0] = (roman[0]==4) 
    ? priority[0].roman : (roman[0]==9) 
    ? priority[1].roman : (roman[0]==5) 
    ? single_digit[1].roman : (roman[0]<5) 
    ? single_digit[0].roman.repeat(Number(roman[0])) 
    : single_digit[1].roman + single_digit[0].roman.repeat(Number(roman[0])%5);

  
    oman[1] = (roman[1]==4) 
    ? priority[2].roman : (roman[1]==9) 
    ? priority[3].roman : (roman[1]==5) 
    ? single_digit[3].roman : (roman[1]<5) 
    ? single_digit[2].roman.repeat(Number(roman[1]))
    : single_digit[3].roman + single_digit[2].roman.repeat(Number(roman[1])%5);
  
    roman[2] = (roman[2]==5) 
    ? single_digit[5].roman : (roman[2]<5) 
    ? single_digit[4].roman.repeat(parseInt(roman[2])) 
    : single_digit[5].roman + single_digit[4].roman.repeat(parseInt(roman[2])%5);
 
    roman[3] = single_digit[6].roman.repeat(parseInt(roman[3]));
  
  
    return roman.reverse().join("");
  
}

console.log(arabic_roman (1246))

// Roman Validator

function roman_validate(str) {
    let valid = true;
    if ((str.includes("IIII")) || (str.includes("XXXX")) || (str.includes("CCCC"))) {valid = false}
    
    str = str.split("").reverse();
    
    for (let [i, letter] of str.entries()) {
      console.log(i, letter, str[i+2])
      if (((letter == "V") || (letter == "X")) && ("I" == str[i+2])) {valid = false};
      if (((letter == "L") || (letter == "C")) && ("X" == str[i+2])) {valid = false};
      
    }
    
    return valid;
    
  }
  
  console.log(roman_validate("MCCXXLIV"))