
// DOM elements
let allItems = document.querySelectorAll(".item");
let resultBox = document.getElementById("result-text");
let clearBtn = document.getElementById("clear-btn");
let numbers = document.querySelectorAll(".num")
let expressions = document.querySelectorAll(".orange");
let equalBtn = document.getElementById("equal-btn");

// important variables
let sum = "";
let previousResult = 0; // Store the result of the previous calculation
let clicked = false;
let checked = false;

// for clear btn functionality
clearBtn.addEventListener("click", () => {
    resultBox.innerHTML = "";
    sum = "";
    previousResult = 0; // Reset the previous result

    expressions.forEach(element => {
        element.classList.remove("invoked");
    });

    checked = false;
    clicked = false;
});

// for adding event listeners to numbers
numbers.forEach(element => {
    element.addEventListener("click", () => {
        if (clicked && !checked) {
            resultBox.innerHTML = "";
            checked = true;

            expressions.forEach(element => {
                if (element.classList.contains("invoked")) {
                    element.classList.remove("invoked");
                }
            });
        }

        resultBox.innerHTML += element.innerHTML;
        sum += element.innerHTML;
    });
});

// for adding event listeners to expressions
expressions.forEach(expression => {
    expression.addEventListener("click", () => {

        if (checked) {
            callingCalculator();
            sum = resultBox.innerHTML;
            checked = false; 
        }

        expressions.forEach(element => {
            if (element.classList.contains("invoked")) {
                expression.classList.remove("invoked");
            }
        });

        sum += expression.innerHTML;
        expression.classList.add("invoked");
        clicked = true;
    });
});

equalBtn.addEventListener("click", callingCalculator);

// setting up to call calculator()
function callingCalculator() {
    const separators = /(\+|\-|x|÷)/;
    const values = sum.split(separators);

    let v1 = previousResult !== 0 && !checked ? previousResult : values[0]; // Use previous result as v1 if available and not continuing the calculation
    let exp = values[1];
    let v2 = values[2];

    calculator(exp, v1, v2);

    expressions.forEach(element => {
        element.classList.remove("invoked");
    });

    clicked = false;
}

// main calculator function 
function calculator(expression, value1, value2) {
    if (expression == "+") {
        previousResult = parseInt(value1) + parseInt(value2);
    } else if (expression == "-") {
        previousResult = parseInt(value1) - parseInt(value2);
    } else if (expression == "x") {
        previousResult = parseInt(value1) * parseInt(value2);
    } else if (expression == "÷") {
        previousResult = parseInt(value1) / parseInt(value2);
    } else {
        console.log("not found")
    }

    resultBox.innerHTML = previousResult; 
}


