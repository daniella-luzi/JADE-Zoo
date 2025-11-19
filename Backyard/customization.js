let inventory = {
  "decor": [
    {
      id: "trashcan",
      name: "Standard Trash Can",
      src: "../assets/furniture/backyard/trashcans/JADEtrashcan.png",
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
      src: "../assets/furniture/backyard/foodbowls/foodbowl.png",
      attribute: "30% Chance to yummy yummy",
      slotGroup: "foodbowls"
    }
  ]
}

//getting the purchased items to show up in the customization section
//the function is used at the bottom of the file, when the window loads, it loads the purchased items and the decor inventory
function loadPurchasedItems(){
  
  //getting purchased items from local storage
  const purchasedInventory = localStorage.getItem('boughtItems');

      //checking the purchased items first
      if(purchasedInventory){
        const items = JSON.parse(purchasedInventory);
        
        //for each item, we will push it into the inventory decor array that emma has for customization section
        items.forEach((item)=>{
          
          inventory.decor.push(item);
        });
      }
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
  const decorChoice = {
    id: itemObject.id,
    name: itemObject.name,
    src: itemObject.src,
    slotGroup: itemObject.slotGroup || null  // e.g. "platform" or "bed"
  };

  localStorage.setItem("decorChoice", JSON.stringify(decorChoice));
  window.location.href = "index.html";
}


window.addEventListener("load", ()=>{
  loadPurchasedItems();
  loadDecorInventory();
});