//loading local storage
// window.addEventListener("load", ()=>{
// })

//setting up the cart
let cart = {};
if(localStorage.getItem("cart")){
  cart = JSON.parse(localStorage.getItem("cart"));
}
let total = 0;

//getting the items in the cart to display from the clicking add to cart button
const cartContents = document.querySelector("#cartContents");
Object.keys(cart).forEach((key)=>{
  cartContents.innerHTML += `<span><center>${cart[key].quantity} ${cart[key].name} - <img id="shopGem" src="./images/gem.png">${cart[key].price}</center></span>`;
  total += parseInt(cart[key].price)*cart[key].quantity;
})

//displaying the total and confirm purchase
const cartTotal = document.querySelector("#cartTotal");
cartTotal.innerHTML = `<br><span><center>Total: <img id="shopGem" src="./images/gem.png">${total}</center></span><span style="font-weight: bold"><center>Confirm Purchase?</center></span>`

//if no button is clicked, it saves your items and simply takes you back to the shop
function cancelItems(){
  window.location.href = 'index.html';
}

//setting the bought items up
let boughtItems = {};
if(localStorage.getItem("boughtItems")){
  boughtItems = JSON.parse(localStorage.getItem("boughtItems"));
}

//getting items from the cart, and putting it into a separate variable
//getting amount of money from local storage, and calling it gems for accuracy
function purchaseItems(){
  fullCart = JSON.parse(localStorage.getItem('cart'));

  const gems = Number(localStorage.getItem('JADEMoney'));

  //checking if there's enough gems to purchase items
  if (gems < total){
    alert('Sorry! Not enough gems!');
    return;
  }

  //subtracting the total from your gems. actually buying the items
  localStorage.setItem('JADEMoney', String(gems - total));
  
  //creating a bought items category if there isn't one, or loading one
  let boughtItems = JSON.parse(localStorage.getItem('boughtItems') || '[]');
  if(!Array.isArray(boughtItems)) boughtItems = [];
  
  //adding the items to the bought items section
  Object.keys(fullCart).forEach((key)=>{
    const item = fullCart[key];
    // Add each item multiple times based on quantity
    for(let i = 0; i < item.quantity; i++){
      boughtItems.push(item);
    }
  });
  
  //saving the bought items to local storage
  localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
  
  //clearing the cart from local storage, since we bought the items
  localStorage.removeItem("cart");
  cart = {};

  //alert that lets you know the purchase was completed
  alert("Yay! You bought these items.");

  //taking you back to the main shop page
  window.location.href = 'index.html';
}












