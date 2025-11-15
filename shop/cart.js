window.addEventListener("load", ()=>{
  console.log(localStorage);
})

let cart = {};
if(localStorage.getItem("cart")){
  cart = JSON.parse(localStorage.getItem("cart"));
}
let total = 0;

const cartContents = document.querySelector("#cartContents");
Object.keys(cart).forEach((key)=>{
  cartContents.innerHTML += `<span><center>${cart[key].quantity} ${cart[key].name} - <img id="shopGem" src="./images/gem.png">${cart[key].price}</center></span>`;
  total += parseInt(cart[key].price)*cart[key].quantity;
})

const cartTotal = document.querySelector("#cartTotal");
cartTotal.innerHTML = `<br><span><center>Total: <img id="shopGem" src="./images/gem.png">${total}</center></span><span style="font-weight: bold"><center>Confirm Purchase?</center></span>`

//if no button is clicked, it saves your items and simply takes you back to the shop
function cancelItems(){
  window.location.href = 'index.html';
}