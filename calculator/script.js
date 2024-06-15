// Accessing the DOM elements

const inputBox = document.getElementById("input");  
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");
// console.log(inputBox, expressionDiv, resultDiv) 

// create variables 
let expression = "";
let result = "";

// event handler for handling the button clicks

inputBox.addEventListener("click", buttonClick);

function buttonClick(event){
    const targetdata = event.target; // teturn taget
    const action = targetdata.dataset.action; //This line retrieves the value of the data-action attribute from the clicked element
    const value = targetdata.dataset.value;//, this line retrieves the value of the data-value attribute from the clicked element. 

    switch(action){
        case "number":
            addValue(value);
            break;
        case "clear":
            clearDisplay();
            break;

        case "backspace":
            backspace();
            break;
        case "addition":
        case "subtraction":
        case "multiplication":
        case "division":
            if(expression == "" && result != ""){
                startFromResult(value);
            }else if(expression != "" && !isLastCharOperator()){
                addValue(value);
            }
            break;
        case "submit":
            submit();
            break;
        case "negate":
            negate();
            break;
        case "modulus":
            percentage();
            break;
        case "decimal":
            decimal(value);
            break;
    }

    updateDisplay(expression,result)

}

// values will be appended to the expression varibale.

function updateDisplay(expression,result){
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}
function addValue(value){
    expression += value;
}

//  making display empty
function clearDisplay(){
    expression = "";
    result = "";
}
function backspace(){
    expression = expression.slice(0,-1)
}
function startFromResult(value){
    expression += result + value;
    result = "";
}
function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)));

}
function submit(){
    result = evaluateExpression();
    expression = "";
}
function evaluateExpression(){
    // multiple ternary operator.
    let evalResult = eval(expression); // evaluate the expression
    return isNaN(evalResult) || !isFinite(evalResult)? "": // if result is not finite or not a number return empty string
    evalResult < 1 ? parseFloat(evalResult.toFixed(10)) : parseFloat(evalResult.toFixed(2));
    // if result is less than 1 fix the decimal place to 10 digits, else if reult is > 1 set the decimal digits to 2.
}

function negate(){
    if(expression == "" && result != ""){
        result = -result
    }else if(!expression.startsWith("-")){
        expression = -expression;
    }else if(expression.startsWith("-")){
        expression = expression.slice(1);
    }
}
function percentage(){
    if(expression != ""){
        result = evaluateExpression();
        expression = "";
        if(!isNaN(result) && isFinite(result)){
            result /= 100
        }else{
            result = "";
        }
    }else if(result != ""){
        result = parseFloat(result) / 100;
    }
}

function decimal(value){
    if(!expression.endsWith(".") && !isNaN(expression.slice(-1))){
        expression += value;
    }
}
