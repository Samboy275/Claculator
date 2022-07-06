const display = document.getElementById('display');
const buttonsPlace = document.getElementById('buttons');

const symbols = ['clear','0', '=','+', '/', 'x', '-'];
let sequence = '';
// variable to store result
let result = NaN;
let operation = '';
let num1 = NaN;
let num2 = NaN;
function drawButtons()
{
    let symbolsDrawn = 0;
    // loop through to make the buttons in a square grid
    for (let i  = 2; i >= 0; i--)
    {
        const rowDiv = document.createElement('div');
        for (let j = 1; j <= 4; j++)
        {
            const button = document.createElement('button');
            button.addEventListener('click', (e) => ButtonPressed(e.target));
            // if column is the last column then add the last three symbols
            if (j < 4)
            {
                button.id = j + (i * 3);
                button.textContent = button.id;
            }
            else
            {
                symbolsDrawn++;
                button.id = symbols[symbols.length - 1 - i];
                button.textContent = button.id;
            }
            rowDiv.appendChild(button);
        }
        buttonsPlace.appendChild(rowDiv);

        // if row is the last row add the remaining symbols
        if (i === 0)
        {
            const lastRow = document.createElement('div');
            for (let s = 0; s < symbols.length - symbolsDrawn; s++)
            {
                const button = document.createElement('button');
                button.addEventListener('click', (e) => ButtonPressed(e.target));
                button.id = symbols[s];
                button.textContent = button.id;
                lastRow.appendChild(button);
            }
            buttonsPlace.appendChild(lastRow);
        }
        
    }
    
}


drawButtons();



// function to add pressed button to display
function ButtonPressed(button)
{
    if (button.id === 'clear')
    {
        display.textContent = '';
        num1 = NaN;
        result = NaN;
        num2 = NaN;
        operation = '';
    }
    else if (isNaN(button.id))
    {
        if (isNaN(result))
        {
            result = parseFloat(display.textContent);
        }
        else
        {
            num1 = parseFloat(display.textContent);
        }
        display.textContent = '';
        if (!isNaN(num1) && operation !== '')
            {
                console.log('why is this evaluating');
                result = operate(operation, result, num1);
                num1 = NaN;
                operation = '';
            }

        if (button.id === '=')
        {
            display.textContent = result;
        }
        else
        {
            operation = button.id;
        }
    }
    else 
    {
        display.textContent += button.id;
    }
}


// operation functions
function operate(operation, num1, num2)
{
    console.log(`${num1} ${operation} ${num2}`);
    let returnValue = 0;
    switch(operation)
    {
        case '+':
            returnValue = add(num1, num2);
            break;
         case '-':
            returnValue = subtract(num1, num2);
            break;
        case '/':
            returnValue = divide(num1, num2);
            break;
        case 'x':
            returnValue = multiply(num1, num2);
            break;
    }
    return returnValue;
}
function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}


function divide(a, b)
{
    if (b === 0)
    {
        return '0 division Error';
    }

    return a / b;
}