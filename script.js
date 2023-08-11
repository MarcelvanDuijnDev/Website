document.addEventListener("DOMContentLoaded", function() {
    let money = parseFloat(localStorage.getItem("money")) || 0;
    let moneyPerSecond = parseFloat(localStorage.getItem("moneyPerSecond")) || 0;
    let workers = parseInt(localStorage.getItem("workers")) || 0;

    const moneyElement = document.getElementById("money");
    const moneyPerSecondElement = document.getElementById("moneyPerSecond");
    const earnMoneyButton = document.getElementById("earnMoneyButton");
    const buyWorkerButton = document.getElementById("buyWorkerButton");
    const workersElement = document.getElementById("workers");

    function saveGame() {
        localStorage.setItem("money", money);
        localStorage.setItem("moneyPerSecond", moneyPerSecond);
        localStorage.setItem("workers", workers);
    }

    function loadGame() {
        moneyElement.textContent = money.toFixed(2);
        moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
        workersElement.textContent = workers.toFixed(0);
    }

    function resetGame() {
        money = 0;
        workers = 0;
        moneyPerSecond = 0;
    }

    resetGameButton.addEventListener("click", function() {
        resetGame();
    })

    earnMoneyButton.addEventListener("click", function() {
        money += 1;
        updateMoneyDisplay();
        saveGame();
    });

    buyWorkerButton.addEventListener("click", function() {
        if (money >= 10) {
            money -= 10;
            workers += 1;
            updateMoneyDisplay();
            updateMoneyPerSecondDisplay();
            saveGame();
        } else {
            alert("Not enough money to buy a worker!");
        }
    });

    function updateMoneyDisplay() {
        moneyElement.textContent = money.toFixed(2);
    }

    function updateMoneyPerSecondDisplay() {
        moneyPerSecond = 0;
        moneyPerSecond += workers * 1;
        workersElement.textContent = workers.toFixed(0);
        moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
    }

    function updateMoneyPerSecond() {
        money += workers;
        updateMoneyDisplay();
        saveGame();
        setTimeout(updateMoneyPerSecond, 1000);
    }

    // Save the game when the user leaves the page
    window.addEventListener("beforeunload", function() {
        saveGame();
    });

    // Load the game on page load
    loadGame();

    // Start the game loop
    updateMoneyPerSecond();
});
