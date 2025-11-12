let inventory = {
  "decor": [
    {
      id: "bench",
      name: "Wooden Bench",
      src: "../assets/furniture/benches/bench.png",
      attribute: "Gives an extra $3 tip"
    },
    {
      id: "catTree",
      name: "Plant Cat Tree",
      src: "../assets/furniture/cat trees/plant cat tree.png",
      attribute: "+5% Tip Chance"
    },
    {
      id: "window",
      name: "Basic Window",
      src: "../assets/furniture/wall/windows/window.png",
      attribute: "Gives an extra $1 tip"
    },
    {
      id: "window",
      name: "Flower Window",
      src: "../assets/furniture/wall/windows/flowerWindow.png",
      attribute: "Gives an extra $5 tip"
    },
    {
      id: "bench",
      name: "Basic Bench",
      src: "../assets/furniture/benches/basicbench.png",
      attribute: "Gives an extra $1 tip"
    },
    {
      id: "catTree",
      name: "Basic Cat Tree",
      src: "../assets/furniture/cat trees/basic cat tree.png",
      attribute: "+1% Tip Chance"
    },
    {
      id: "painting1",
      name: "Flower Painting",
      src: "../assets/furniture/wall/paintings/flowerPainting.png",
      attribute: "+1% Tip Chance"
    }
  ],
  "animals": []
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