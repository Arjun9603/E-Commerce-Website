let cartBtn = document.querySelectorAll('.add-to-cart');
let cartCountElement = document.querySelector('#cart-count');
let cartCount = 0;

cartBtn.forEach(btn => {
    btn.addEventListener('click', addToCart);
});

function addToCart() {
    cartCount++;
    cartCountElement.textContent = cartCount;
    alert('Product added to cart');
}
let cartItems = [];
let totalAmount = 0;

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-cart');
        const name = product.querySelector('h2').innerText;
        const price = parseFloat(product.querySelector('p').innerText.replace('$', ''));

        cartItems.push({ name, price });
        totalAmount += price;

        document.getElementById('cart-count').innerText = cartItems.length;
        alert(`${name} has been added to your cart.`);
    });
});

document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);
    });
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
    document.getElementById('cart-modal').style.display = 'flex';
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
});

document.getElementById('cancel-payment').addEventListener('click', () => {
    document.getElementById('payment-section').style.display = 'none';
});

document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment Successful!');
    cartItems = [];
    totalAmount = 0;
    document.getElementById('cart-count').innerText = '0';
    document.getElementById('payment-section').style.display = 'none';
});

let discountAmount = 0;

// Show checkout box
document.getElementById('checkout-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
    showCheckoutBox();
});

function showCheckoutBox() {
    const checkoutList = document.getElementById('checkout-items');
    checkoutList.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        checkoutList.appendChild(listItem);
    });

    document.getElementById('subtotal-amount').innerText = totalAmount.toFixed(2);
    document.getElementById('discount-amount').innerText = discountAmount.toFixed(2);
    document.getElementById('checkout-total-amount').innerText = (totalAmount - discountAmount).toFixed(2);
    document.getElementById('checkout-box').style.display = 'block';
}

// Close checkout box
document.getElementById('close-checkout').addEventListener('click', () => {
    document.getElementById('checkout-box').style.display = 'none';
});

// Apply discount code
document.getElementById('apply-discount').addEventListener('click', () => {
    const discountCode = document.getElementById('discount-code').value.trim();
    applyDiscount(discountCode);
});

function applyDiscount(code) {
    const validCodes = { "SAVE10": 0.10, "SAVE20": 0.20 }; // Example codes with discount percentages
    if (validCodes[code]) {
        discountAmount = totalAmount * validCodes[code];
        document.getElementById('discount-amount').innerText = discountAmount.toFixed(2);
        document.getElementById('checkout-total-amount').innerText = (totalAmount - discountAmount).toFixed(2);
        alert(`Discount code applied! You saved $${discountAmount.toFixed(2)}`);
    } else {
        alert("Invalid discount code");
    }
}

// Proceed to payment
document.getElementById('proceed-to-payment').addEventListener('click', () => {
    document.getElementById('checkout-box').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
});


// Event listener for "Proceed to Payment" button in the checkout box
document.getElementById('proceed-to-payment').addEventListener('click', () => {
    document.getElementById('checkout-box').style.display = 'none';
    document.getElementById('payment-section').style.display = 'block';
    document.getElementById('final-amount').innerText = (totalAmount - discountAmount).toFixed(2);
});

// Event listener for "Cancel" button in the payment section
document.getElementById('cancel-payment').addEventListener('click', () => {
    document.getElementById('payment-section').style.display = 'none';
});

// Event listener for payment form submission
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect payment details (for demo purposes only; do not use in production)
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardName && cardNumber && expiryDate && cvv) {
        alert("Payment Successful!");
        
        // Reset cart and totals
        cartItems = [];
        totalAmount = 0;
        discountAmount = 0;
        document.getElementById('cart-count').innerText = '0';

        // Hide payment section
        document.getElementById('payment-section').style.display = 'none';
    } else {
        alert("Please complete all payment fields.");
    }
});
