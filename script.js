// Carrinho de compras
let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartIcon = document.getElementById('cart-icon');

// Elementos do produto
const addToCartBtn = document.getElementById('add-to-cart');
const sizeSelect = document.getElementById('size');
const quantityInput = document.getElementById('quantity');

// Botões do carrinho
const checkoutBtn = document.getElementById('checkout-button');
const closeCartBtn = document.getElementById('close-cart');

// Adicionar ao carrinho
addToCartBtn.addEventListener('click', () => {
    const product = {
        name: "DTF Personalizado",
        size: sizeSelect.value,
        quantity: parseInt(quantityInput.value),
        price: 39.99,
        id: Date.now() // ID único para cada item
    };
    
    cart.push(product);
    updateCart();
    showNotification('✔️ Item adicionado ao carrinho!');
    cartModal.style.display = 'flex';
});

// Atualizar carrinho
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <p><strong>${item.name}</strong></p>
                <p>Tamanho: ${item.size} | ${item.quantity}x R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <p>R$ ${itemTotal.toFixed(2)}</p>
                <button onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remover item do carrinho
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    if (cart.length === 0) {
        cartModal.style.display = 'none';
    }
}

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('❌ Carrinho vazio!');
        return;
    }
    alert('Compra finalizada! Valor total: R$ ' + 
          cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});

// Fechar carrinho
closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Abrir carrinho
cartIcon.addEventListener('click', () => {
    if (cart.length > 0) {
        cartModal.style.display = 'flex';
    } else {
        showNotification('🛒 Carrinho vazio!');
    }
});

// Fechar ao clicar fora do modal
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Inicializar
updateCart();
