if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeItemButton = document.getElementsByClassName("button-remove");
  for (var i = 0; i < removeItemButton.length; i++) {
    var button = removeItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInput = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChange);
  }
  var addToCartButton = document.getElementsByClassName("button-buy");
  for (var i = 0; i < addToCartButton.length; i++) {
    var button = addToCartButton[i];
    button.addEventListener("click", addToCartClick);
  }

  document
    .getElementsByClassName("button-purchase")[0]
    .addEventListener("click", purchaseClick);

  var likeButton = document.getElementsByClassName("heart-icon");
  for (var i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", likeIt);
  }
}

function likeIt(event) {
  var button = event.target;
  button.classList.toggle("heart-like");
}

function purchaseClick() {
  alert("Enjoy your Bubble Tea 🧋");
  cartItem = document.getElementsByClassName("cart-items")[0];
  while (cartItem.hasChildNodes()) {
    cartItem.removeChild(cartItem.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotal();
}

function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function addToCartClick(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("bubble-tea-title")[0].innerText;
  var price = shopItem.getElementsByClassName("price")[0].innerText;
  var imageParent = button.parentElement.parentElement.parentElement;
  var imageSrc = imageParent.getElementsByClassName("image-bubble-tea")[0].src;
  addItemToCart(title, price, imageSrc);
  updateTotal();
}

function addItemToCart(title, price, imageSrc) {
  var newItem = document.createElement("div");
  newItem.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemName = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("This Bubble Tea is already added to the cart 🧋");
      return;
    }
  }
  var newItemContent =
    '<div class="cart-item cart-column">' +
    '<img src="' +
    imageSrc +
    '" class="cart-item-image" alt="' +
    title +
    '" width="80" height="80"/>' +
    '<span class="cart-item-title">' +
    title +
    "</span>" +
    "</div>" +
    '<span class="cart-price-item cart-column">' +
    price +
    "</span>" +
    '<div class="cart-quantity cart-column">' +
    '<input class="cart-quantity-input" type="number" value="1" />' +
    '<button role="button" class="button-remove">remove</button>' +
    "</div>";
  newItem.innerHTML = newItemContent;
  cartItems.append(newItem);
  newItem
    .getElementsByClassName("button-remove")[0]
    .addEventListener("click", removeCartItem);
  newItem
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChange);
}

function updateTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRow = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRow.length; i++) {
    var row = cartRow[i];
    var priceElement = row.getElementsByClassName("cart-price-item")[0];
    var quantityElement = row.getElementsByClassName("cart-quantity-input")[0];
    console.log(priceElement, quantityElement);
    var price = parseFloat(priceElement.innerText.replace("CFA", " "));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + " CFA";
}
