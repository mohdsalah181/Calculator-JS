"use strict"

var input = document.getElementById('input'), 
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    
    resultDisplayed = false;
    
    // add click handlers to number buttons
    for (var i=0; i<number.length; i++){
        number[i].addEventListener("click", function(e){

            // store current value in the screen
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length - 1]; //check

            if (resultDisplayed === false) {
                input.innerHTML += e.target.innerHTML;
            } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" ||
               lastChar === "×" || lastChar === "÷"){
                resultDisplayed = false;
                input.innerHTML += e.target.innerHTML;
            } else {
                resultDisplayed = false;
                input.innerHTML = "";
                input.innerHTML += e.target.innerHTML;
            }
        });
    }

    // add click handlers to operation buttons
    for (var i=0; i<operator.length; i++){
        operator[i].addEventListener("click", function(e) {

            //store current input string
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length - 1];

            if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
                var newString = currentString.substring(0, currentString.length - 1) +
                e.target.innerHTML;
                input.innerHTML = newString;
            }
            else if(currentString.length === 0){
                // do nothing
            } else {
                input.innerHTML += e.target.innerHTML;
            }

        });
    }

    // on click of 'equal' button
    result.addEventListener("click", function() {

        // String to be proceed 1+2+10-5x7
        var inputString = input.innerHTML;

        // put numbers in array
        var numbers = inputString.split(/\+|\-|\×|\÷/g);

        // put operators in array but we've to replace 
        // all numbers and dot with empty string
        var operators = inputString.replace(/[0-9]|\./g, "").split("");


        console.log(inputString);
        console.log(operators);
        console.log(numbers);
        console.log("----------------------------");



        // do divide first, then multiplication, subtraction and addition
        var divide = operators.indexOf("÷"); // get the index of first ÷
        while (divide != -1) { // to check if ÷ is detected
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }

        var multiply = operators.indexOf("×"); 
        while (multiply != -1) { 
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }

        var subtract = operators.indexOf("-"); 
        while (subtract != -1) { 
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }

        var addition = operators.indexOf("+"); 
        while (addition != -1) { 
            numbers.splice(addition, 2, parseFloat(numbers[addition]) + parseFloat(numbers[addition + 1]));
            operators.splice(addition, 1);
            addition = operators.indexOf("+");
        }

        input.innerHTML = numbers[0]; // display the result

        resultDisplayed = true;

    });

    clear.addEventListener("click", function() {
        input.innerHTML = "";
    })
