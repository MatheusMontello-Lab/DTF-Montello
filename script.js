// Recupera o carrinho do localStorage ou cria um novo
const cart = JSON.parse(localStorage.getItem('montello-cart')) || {
  items: [],
  total: 0
};

// Seleciona elementos principais
const cartIcon = document.querySelector('.cart-icon-container');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContent = document.querySelector('.cart-content');
const cartCount = document.querySelector('.cart-count');
const continueShoppingBtn = document.querySelector('.continue-shopping');

// Notificação (toast)
function showToast(message) {
  const toast = document.getElementById('cart-toast');
  const toastMsg = document.getElementById('cart-toast-message');

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // 3 segundos
}

// Atualiza carrinho (contador e conteúdo)
function updateCart() {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.items.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-message">
        <p>Seu carrinho está vazio.</p>
        <a href="#produtos" class="view-products">Ver Produtos</a>
      </div>
    `;
  } else {
    cartContent.innerHTML = `
      <p>${totalItems} itens no carrinho.</p>
      ${cart.items.map(item => `
        <div class="cart-item" data-name="${item.name}">
          <h4>${item.name}</h4>
          <div class="item-controls">
            <button class="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="increase">+</button>
          </div>
          <p class="item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
          <button class="remove-item">×</button>
        </div>
      `).join('')}
      <div class="cart-total">
        <h3>Total: R$ ${cart.total.toFixed(2).replace('.', ',')}</h3>
      </div>
    `;
  }

  localStorage.setItem('montello-cart', JSON.stringify(cart));
}

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
  const existingItem = cart.items.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ name, price, quantity: 1 });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  updateCart();
  showToast(`${name} foi adicionado ao carrinho!`);
}

// Botões "Adicionar ao carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    addToCart(name, price);
  });
});

// Controles dentro do carrinho (aumentar, diminuir, remover)
cartContent.addEventListener('click', e => {
  const itemElement = e.target.closest('.cart-item');
  if (!itemElement) return;

  const itemName = itemElement.dataset.name;
  const item = cart.items.find(i => i.name === itemName);
  if (!item) return;

  if (e.target.classList.contains('increase')) {
    item.quantity++;
  } else if (e.target.classList.contains('decrease')) {
    item.quantity = Math.max(1, item.quantity - 1);
  } else if (e.target.classList.contains('remove-item')) {
    cart.items = cart.items.filter(i => i.name !== itemName);
  }

  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  updateCart();
});

