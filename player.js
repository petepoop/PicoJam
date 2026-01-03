let maxHealth = 10;
let health = maxHealth;

function displayHealth() {
    const text = document.getElementById("health-slider");
    text.innerText = "0".repeat(health) + "-".repeat(maxHealth - health);
}

function changeHealth(amount) {
    health += amount;
    displayHealth()
}
