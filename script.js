let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

function displayCart() {
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  if (!container || !totalDisplay) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.name}</strong> - ₹${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
  });

  totalDisplay.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
}

// Initialize cart count and display if on cart page
updateCartCount();
document.addEventListener("DOMContentLoaded", displayCart);
