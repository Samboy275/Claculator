const display = document.getElementById('display');
const buttonsPlace = document.getElementById('buttons');

const symbols = ['clear','0', '=','+', '/', 'x', '-'];


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
            // if column is the last column then add the last three symbols
            if (j < 4)
            {
                button.id = j + (i * 3);
                button.textContent = button.id;
            }
            else
            {
                symbolsDrawn++;
                console.log(symbols.length - 1 - i);
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
                button.id = symbols[s];
                button.textContent = button.id;
                lastRow.appendChild(button);
            }
            buttonsPlace.appendChild(lastRow);
        }
        
    }
    
}


drawButtons();