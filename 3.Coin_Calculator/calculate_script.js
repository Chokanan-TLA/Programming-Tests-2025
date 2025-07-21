function calculateTokens() {
    const amount = parseInt(document.getElementById('amount').value);
    const desiredColorsInput = document.getElementById('desiredColors').value;
    const outputElement = document.getElementById('output');

    if (isNaN(amount) || amount <= 0) {
        outputElement.textContent = "Please enter a valid amount (a positive number).";
        return;
    }

    const tokenValues = {
        "White": 100,
        "Pink": 300,
        "Red": 500,
        "Blue": 1000,
        "Green": 5000,
        "Black": 10000
    };

    const sortedTokenTypes = Object.entries(tokenValues).sort((a, b) => b[1] - a[1]); // Sort by value descending

    let remainingAmount = amount;
    const result = {};

    const desiredColorsArray = desiredColorsInput.split(',').map(color => color.trim()).filter(color => color !== '');

    // Prioritize desired colors first, from highest value to lowest
    const prioritizedTokens = [];
    for (const [color, value] of sortedTokenTypes) {
        if (desiredColorsArray.includes(color)) {
            prioritizedTokens.push({ color, value });
        }
    }

    // Add remaining tokens (not explicitly desired) for change, from highest value to lowest
    for (const [color, value] of sortedTokenTypes) {
        if (!desiredColorsArray.includes(color)) {
            prioritizedTokens.push({ color, value });
        }
    }


    for (const { color, value } of prioritizedTokens) {
        if (remainingAmount >= value) {
            const count = Math.floor(remainingAmount / value);
            result[color] = (result[color] || 0) + count;
            remainingAmount -= count * value;
        }
    }

    let outputText = "";
    desiredColorsArray.forEach(color => {
        outputText += `${color}: ${result[color] || 0}\n`;
    });

    outputText += `Change: ${remainingAmount}`;
    outputElement.textContent = outputText;
}