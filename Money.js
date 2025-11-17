let money;

  // If JSON file does not yet exist, it makes one. If there is no stored value, it will set your balance to 0.
function setupPage() {
  const stored = localStorage.getItem("JADEMoney");
  money = stored !== null ? JSON.parse(stored) : 0; // only set to 0 if not found

  const numberElement = document.getElementById("money");

  
  //If an element has the ID of money. It will set the textContnet to your ballance.
  function updateMoneyDisplay() {
    numberElement.textContent = money;
  }

  // Saves money to JSON file.
  function save() {
    localStorage.setItem("JADEMoney", JSON.stringify(money));
    updateMoneyDisplay();
  }

  // Makes functions global, meaning functions outside setupPage() can use them.
  window.updateMoneyDisplay = updateMoneyDisplay;
  window.save = save;

  updateMoneyDisplay();
}

  // This function adds money, saves to the JSON, then updates the display.
function add(value) {
  money = money + value;
  save();
  updateMoneyDisplay();
  
//havent tested this but I assune it works
function getMoney() {
  return money;
  }
}