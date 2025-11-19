let inventory = {
  "decor": [
    {
      id: "trashcan",
      name: "Standard Trash Can",
      src: "JADEtrashcan.png",
      attribute: "30% Chance for Raccoons, 5% Chance for Possums"
    },
    {
      id: "trashcan",
      name: "Cooler Trash Can",
      src: "JADEtrashcan.png",
      attribute: "40%% Chance for Raccoons, 5% Chance for Possums"
    },
    {
      id: "trashcan",
      name: "Food Bowl", //this is a TRASH CAN (pretend)
      src: "foodbowl.png",
      attribute: "30% Chance to yummy yummy"
    }
  ]
}

//displays all the decor in your inventory in the decorations tab
function loadDecorInventory(){
  const decorInventory = document.querySelector("#decorInventory")
  inventory.decor.forEach((item)=>{
    const newItemContainer = document.createElement("div");
    newItemContainer.className = "item";
    const newItemImg = document.createElement("img");
    newItemImg.src = item.src;
    newItemImg.alt = item.name;
    const itemName = document.createElement("span");
    itemName.className = "itemName";
    itemName.innerText = item.name;
    const itemAttribute = document.createElement("span");
    itemAttribute.className = "itemAttribute";
    itemAttribute.innerText = item.attribute;
    newItemContainer.appendChild(newItemImg);
    newItemContainer.appendChild(itemName);
    newItemContainer.appendChild(itemAttribute);
    newItemContainer.addEventListener("click", ()=>{
      pickDecoration(item);
    });
    decorInventory.appendChild(newItemContainer);
  })
}

//runs when you click a decoration to put in your zoo
function pickDecoration(itemObject){
  console.log("pick decoration: ", itemObject)
  localStorage.setItem("decorChoice", JSON.stringify(itemObject));
  window.location.href = "index.html";
}


window.addEventListener("load", ()=>{
  loadDecorInventory();
});