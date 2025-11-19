
let inventory = {
  "decor": [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "../assets/furniture/benches/bench.png",
      attribute: "Gives an extra $3 tip",
      slotGroup: null
    },
    {
      id: "bench",
      name: "Paw Bench",
      src: "../assets/furniture/benches/pawbench.png",
      attribute: "Gives an extra $3 tip",
      slotGroup: null
    },
    {
      id: "rug",
      name: "Paw Rug",
      src: "../assets/furniture/rugs/pawrug.png",
      attribute: "Gives an extra $3 tip",
      slotGroup: null
    },
    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "../assets/furniture/cat trees/plant cat tree.png",
      attribute: "+5% Tip Chance",
      slotGroup: null
    },
    {
      id: "window",
      name: "Flower Window",
      src: "../assets/furniture/wall/windows/flowerWindow.png",
      attribute: "Gives an extra $5 tip",
      slotGroup: null
    },
    {
      id: "platform",
      name: "Basic Platform",
      src: "../assets/furniture/wall/platforms/platform.png",
      attribute: "+5% Tip Chance",
      category: "zooMisc",
      slotGroup: "platform"
    },
    {
      id: "fluffyBed",
      name: "Fluffy Bed",
      src: "../assets/furniture/beds/fluffy bed.png",
      attribute: "+5% Tip Chance",
      category: "Beds",
      slotGroup: "bed"
    },
    {
      id: "painting1",
      name: "Cat Painting",
      src: "assets/furniture/wall/paintings/painting.png",
      attribute: "+1% Tip Chance",
      category: "Paintings",
      slotGroup: null
    },
    {
      id: "painting1",
      name: "Dog Painting",
      src: "assets/furniture/wall/paintings/dogpainting.png",
      attribute: "+1% Tip Chance",
      category: "Paintings",
      slotGroup: null
    }

  ],
  "animals": [
    {
      name: "Johnathan",
      breed: "PersianCat",
      src: "assets/animals/cat.jpg"
    },
    {
      name: "Kelsey",
      breed: "CavalierKingCharlesSpaniel",
      src: "assets/animals/cavalier_dog.png"
    },
    {
      name: "Silly",
      breed: "LaboradorRetriever",
      src: "assets/animals/lab_puppy.png"
    }
  ]
}

//getting the purchased items to show up in the customization section
//the function is used at the bottom of the file, when the window loads, it loads the purchased items and the decor inventory
function loadPurchasedItems(){
  if(!localStorage.getItem("inventory")){
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }else{
    inventory = JSON.parse(localStorage.getItem("inventory"));
  }
  //getting purchased items from local storage
  const purchasedInventory = localStorage.getItem('boughtItems');

      //checking the purchased items first
      if(purchasedInventory){
        const items = JSON.parse(purchasedInventory);
        
        //for each item, we will push it into the inventory decor array that emma has for customization section
        items.forEach((item)=>{
          const blacklisted = ["trashcan", "foodbowl", "foodbowl1"]
          if(!blacklisted.includes(item.id)){
            inventory.decor.push(item);
          }
        });
        //saving the inventory
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.removeItem('boughtItems');
      }
  }


//displays all the decor in your inventory in the decorations tab
function loadDecorInventory(){
  if(!localStorage.getItem("inventory")){
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }else{
    inventory = JSON.parse(localStorage.getItem("inventory"));
  }
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