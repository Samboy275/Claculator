/* -------------Calculator By Samual Mohamed------------- 
    Code of a symbol calculator to made using js and html with some css styles
            this code is part of the projects in The Odin Project
            
    TODOS
    Add a res symbol to save previous result
    add a way for a user to correct the number if entered wrong
    add % operator               
            
*/

const display = document.getElementById('display');
const buttonsPlace = document.getElementById('buttons');

const symbols = ['clear','%','^','<','.','0', '=','+', '/', 'x', '-'];
let sequence = '';

// variable to store result
let newOp = false;
let result = NaN;
let operation = '';
let num1 = NaN;


function drawButtons()
{
    let symbolsDrawn = 0;
    let symbolIndex = 0;
    // loop through to make the buttons in a square grid
    for (let i  = 3; i >= 0; i--)
    {
        const rowDiv = document.createElement('div');

        if (i === 3)
        {
            for (let j = 0; j < 4; j++)
            {
                const button = document.createElement('button');
                button.addEventListener('click', (e) => ButtonPressed(e.target));
                button.id = symbols[j];
                button.textContent = symbols[j];
                if (symbols[j] === 'clear' || symbols[j] === '<')
                {
                    button.classList.add('instruction');
                }
                else
                {
                    button.classList.add('operation');
                }
                symbolIndex++;
                rowDiv.appendChild(button);
            }
            buttonsPlace.appendChild(rowDiv);
            continue;
        }
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
                button.classList.add('operation');
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
            for (let s = symbolIndex; s < symbols.length - symbolsDrawn; s++)
            {
                const button = document.createElement('button');
                button.addEventListener('click', (e) => ButtonPressed(e.target));
                if (symbols[s] !== '0')
                {
                    if (symbols[s] === 'clear')
                    {
                        button.classList.add('instruction');
                    }
                    else
                    {
                        button.classList.add('operation');
                    }
                }
                button.id = symbols[s];
                button.textContent = button.id;
                lastRow.appendChild(button);
            }
            buttonsPlace.appendChild(lastRow);
        }
        
    }
    
}


drawButtons();

// function to clear data
function clear(clearDisplay = true)
{
    const toggledButtons = document.querySelectorAll('.toggle');
    toggledButtons.forEach( element => element.classList.remove('toggle'));
    result = NaN;
    num1 = NaN;
    operation = '';
    if (clearDisplay)
    {
        display.textContent = '';
    }
}

// function to add pressed button to display
function ButtonPressed(button)
{
    if (button.id === 'clear')
    {
        clear();
    }
    else if (button.id == '<')
    {
        if (display.textContent !== '')
        {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
    else if (button.id === '.')
    {
        if (display.textContent.includes('.'))
        {
            return;
        }
        display.textContent += button.id;
    }
    else if (isNaN(button.id))
    {
        
        if (isNaN(result))
        {
            result = parseFloat(display.textContent);
            if (operation === '-')
                result = -result;
        }
        else
        {
            num1 = parseFloat(display.textContent);
        }
        display.textContent = '';
        if (!isNaN(num1) && operation !== '')
        {
            //console.log('why is this evaluating');
            result = operate(operation, result, num1);
            num1 = NaN;
            operation = '';
        }

        if (button.id === '=')
        {
            display.textContent = isNaN(result) ? '' : result;
            clear(false);
            newOp = true;
        }
        else
        {
            button.classList.add('toggle');
            operation = button.id;
        }
    }
    else 
    {
        if (newOp)
        {
            display.textContent = '';
            newOp = false;
        }
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