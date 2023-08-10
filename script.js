document.addEventListener("DOMContentLoaded", function() {
    const countElement = document.getElementById("count");
    const incrementButton = document.getElementById("incrementButton");

    // Retrieve the count from localStorage if available
    let count = parseInt(localStorage.getItem("count")) || 0;
    countElement.textContent = count;

    // Update the count on button click
    incrementButton.addEventListener("click", function() {
        count++;
        countElement.textContent = count;

        // Save the updated count to localStorage
        localStorage.setItem("count", count);
    });
});