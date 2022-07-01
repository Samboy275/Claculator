const display = document.getElementById('display');
const buttonsPlace = document.getElementById('buttons');

const symbols = ['clear','0', '=','+', '/', 'x', '-'];

// variable to store result

var result = 0;

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
            button.addEventListener('click', (e) => ShowOnDisplay(e.target));
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
                button.addEventListener('click', (e) => ShowOnDisplay(e.target));
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
function ShowOnDisplay(button)
{
    if (isNaN(result))
    {
        result = 0;
    }
    if (symbols.includes(button.id) && button.id !== '0')
    {
        switch(button.id)
        {
            case 'clear':
                display.textContent = '';
                break;
            case '=':
                let sequence = display.textContent.split(' ');
                let operation = '';
                for (let i = 0; i < sequence.length; i++)
                {
                    if (isNaN(sequence[i]))
                    {
                        operation = sequence[i];
                    }
                    else
                    {
                        console.log(sequence[i]);
                        console.log(result);
                        let number = 0;
                        if (sequence[i] !== undefined)
                            number = parseFloat(sequence[i]);
                        else
                            number = 0;
                        switch(operation)
                        {
                            case '+':
                                result += number;
                                break;
                            case '-':
                                result -= number;
                                break;
                            case '/':
                                result /= number;
                                break;
                            case 'x':
                                result *= number;
                                break;
                            default:
                                result = number;
                                break;
                        }
                    }
                    display.textContent = '';
                    display.textContent = result;
                }
                break;
            default:
                display.textContent += ` ${button.id} `;
                break;
        }
    }
    else
    {
        display.textContent += button.id;
    }
}