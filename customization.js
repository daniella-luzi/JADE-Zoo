
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
  loadDecorInventory();
});