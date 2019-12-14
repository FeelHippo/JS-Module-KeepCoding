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
      console.log(priority[0]["roman"])
      
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