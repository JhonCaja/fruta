document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    const whatsappNumber = '51937273210';
    const ADMIN_PASSWORD = 'admin123'; // Contraseña para el modal de admin

    // --- VARIABLES ---
    const productGrid = document.getElementById('product-grid');
    const cartModal = document.getElementById('cart-modal');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');
    const whatsappFab = document.getElementById('whatsapp-fab');
    const cartView = document.getElementById('cart-view');
    const deliveryFormView = document.getElementById('delivery-form-view');
    const proceedToDeliveryBtn = document.getElementById('proceed-to-delivery-btn');
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    const deliveryForm = document.getElementById('delivery-form');
    const cartTitle = document.getElementById('cart-title');
    const addressField = document.getElementById('address-field');
    const addressInput = document.getElementById('address');
    
    // Variables para el Modal de Admin Login
    const adminLoginLink = document.getElementById('admin-login-link');
    const adminLoginOverlay = document.getElementById('admin-login-overlay');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoginError = document.getElementById('admin-login-error');

    let products = [];
    let cart = [];

    // --- LÓGICA DE DATOS DE PRODUCTOS ---
    function loadProducts() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts && JSON.parse(storedProducts).length > 0) {
            products = JSON.parse(storedProducts);
        } else {
            const defaultProducts = [
                { id: 1, name: 'Piña', price: 3.00, image: '/imagenes/piña.jpg' },
                { id: 2, name: 'Durazno', price: 5.00, image: '/imagenes/durazno.jpg' },
                { id: 3, name: 'Naranja (4x S/1)', price: 0.25, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop' },
                { id: 4, name: 'Arándanos', price: 17.00, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1972&auto=format&fit=crop' },
                { id: 5, name: 'Bellako', price: 3.50, image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop' },
                { id: 6, name: 'Granadilla', price: 5.00, image: '/imagenes/granadilla.jpg' },
                { id: 7, name: 'Biscochito', price: 2.50, image: '/imagenes/bizcochito.jpg' },
                { id: 8, name: 'Manzana Chilena', price: 7.00, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1974&auto=format&fit=crop' },
                { id: 9, name: 'Manzana Roger', price: 7.00, image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?q=80&w=2070&auto=format&fit=crop' },
                { id: 10, name: 'Papaya', price: 5.00, image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1887&auto=format&fit=crop' },
                { id: 11, name: 'Plátano Isla', price: 3.50, image: '/imagenes/isla.jpg' },
                { id: 12, name: 'Plátano Seda', price: 3.00, image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop' },
                { id: 13, name: 'Plátano Seda Selva', price: 3.50, image: '/imagenes/selva.jpeg' },
                { id: 14, name: 'Lima Dulce (5x S/1)', price: 0.20, image: '/imagenes/lima.jpg' },
                { id: 15, name: 'Uva Negra', price: 7.00, image: '/imagenes/negra.jpg' },
                { id: 16, name: 'Uva Verde', price: 7.00, image: '/imagenes/verde.jpg' },
                { id: 17, name: 'Chirimoya', price: 7.00, image: '/imagenes/chiri.jpg' },
                { id: 18, name: 'Fresa', price: 8.00, image: '/imagenes/fresa.jpg' },
                { id: 19, name: 'Mandarina con Pepa', price: 2.00, image: '/imagenes/selvam.jpg' },
                { id: 20, name: 'Mandarina sin Pepa', price: 3.00, image: '/imagenes/mandarina.jpg' },
                { id: 21, name: 'Capuli', price: 8.00, image: '/imagenes/capuli.jpg' },
                { id: 22, name: 'Naranja Huando', price: 6.00, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop' },
                { id: 23, name: 'Manzana Israel', price: 3.00, image: '/imagenes/israel.jpg' },
                { id: 24, name: 'Kiwi', price: 10.00, image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=1964&auto=format&fit=crop' },
                { id: 25, name: 'Mango Papaya', price: 10.00, image: '/imagenes/mango.jpg' },
                { id: 26, name: 'Kaki', price: 7.00, image: '/imagenes/kaki.jpg' },
                { id: 27, name: 'Tangelo', price: 2.50, image: '/imagenes/tangelo.jpg' },
            ];
            products = defaultProducts;
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    // --- FUNCIONES E-COMMERCE (CARRITO, ETC.) ---
    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = `
            <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
                <div class="h-64 w-full bg-cover bg-center overflow-hidden" style="background-image: url('${product.image}')">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-gray-800">${product.name}</h3>
                    <p class="mt-2 text-2xl font-extrabold text-green-600">S/ ${product.price.toFixed(2)}</p>
                    <div class="mt-auto pt-4">
                        <button data-id="${product.id}" class="add-to-cart-btn w-full bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>`;
            productGrid.innerHTML += productCard;
        });
    }
    function updateCartView() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = ''; let total = 0; let totalItems = 0;
        if (cart.length === 0) { 
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-10">Tu carrito está vacío.</p>';
            proceedToDeliveryBtn.disabled = true;
            proceedToDeliveryBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            proceedToDeliveryBtn.disabled = false;
            proceedToDeliveryBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id); total += product.price * item.quantity; totalItems += item.quantity;
                const cartItemHTML = `<div class="flex items-center justify-between gap-4 mb-4 pb-4 border-b last:border-b-0"><img src="${product.image}" alt="${product.name}" class="w-20 h-20 rounded-lg object-cover"><div class="flex-grow"><h4 class="font-bold text-gray-800">${product.name}</h4><p class="text-gray-500">S/ ${product.price.toFixed(2)}</p><div class="flex items-center gap-3 mt-2"><button data-id="${product.id}" class="quantity-change-btn decrease-btn bg-gray-200 w-7 h-7 rounded-full font-bold hover:bg-gray-300">-</button><span class="font-bold">${item.quantity}</span><button data-id="${product.id}" class="quantity-change-btn increase-btn bg-gray-200 w-7 h-7 rounded-full font-bold hover:bg-gray-300">+</button></div></div><div class="text-right"><p class="font-extrabold text-lg text-gray-800">S/ ${(product.price * item.quantity).toFixed(2)}</p><button data-id="${product.id}" class="remove-item-btn text-red-500 hover:text-red-700 text-sm font-semibold mt-1">Quitar</button></div></div>`;
                cartItemsContainer.innerHTML += cartItemHTML;
            });
        }
        cartTotal.textContent = `S/ ${total.toFixed(2)}`; cartCounter.textContent = totalItems;
    }
    function addToCart(productId, buttonElement) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) { existingItem.quantity++; } else { cart.push({ id: productId, quantity: 1 }); }
        updateCartView();
        // Efecto visual en el botón
        if (!buttonElement.classList.contains('item-added')) {
            buttonElement.textContent = '¡Añadido!';
            buttonElement.classList.add('item-added');
            setTimeout(() => {
                buttonElement.textContent = 'Añadir al carrito';
                buttonElement.classList.remove('item-added');
            }, 1500);
        }
    }
    function changeQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) { item.quantity += change; if (item.quantity <= 0) { cart = cart.filter(cartItem => cartItem.id !== productId); } }
        updateCartView();
    }
    function removeItem(productId) { cart = cart.filter(item => item.id !== productId); updateCartView(); }
    
    function sendOrderToWhatsApp(customerData) {
        let message = '¡Hola Fruteria Luna! 👋\n\nQuisiera confirmar mi pedido:\n\n';
        message += `*DATOS DEL CLIENTE:*\n`;
        message += `*Nombre:* ${customerData.name}\n`;
        message += `*Móvil:* ${customerData.phone}\n`;
        message += `*Opción de Entrega:* ${customerData.delivery_option === 'domicilio' ? 'A domicilio' : 'Para llevar'}\n`;
        if (customerData.delivery_option === 'domicilio') {
            message += `*Dirección:* ${customerData.address}\n`;
        }
        if (customerData.note) {
            message += `*Nota:* ${customerData.note}\n`;
        }
        message += '\n*RESUMEN DEL PEDIDO:*\n';
        let total = 0;
        cart.forEach(item => { const product = products.find(p => p.id === item.id); const subtotal = item.quantity * product.price; total += subtotal; message += `• ${item.quantity}x ${product.name} - *S/ ${subtotal.toFixed(2)}*\n`; });
        message += `--------------------\n*Total del Pedido: S/ ${total.toFixed(2)}*\n\n`;
        message += 'Por favor, confírmenme la disponibilidad. ¡Gracias! 😊';
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }

    function openCart() { cartBackdrop.classList.remove('hidden'); cartModal.classList.add('cart-open'); }
    function closeCart() { 
        cartBackdrop.classList.add('hidden'); 
        cartModal.classList.remove('cart-open');
        setTimeout(showCartView, 300);
    }

    function showDeliveryForm() {
        cartView.classList.add('hidden');
        deliveryFormView.classList.remove('hidden');
        cartTitle.textContent = "Opción de entrega";
    }

    function showCartView() {
        deliveryFormView.classList.add('hidden');
        cartView.classList.remove('hidden');
        cartTitle.textContent = "Tu Carrito";
    }
    
    // --- ANIMACIÓN EN SCROLL ---
    const initScrollAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.2 });

        return observer;
    };

    // --- INICIALIZACIÓN Y EVENT LISTENERS ---
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
    proceedToDeliveryBtn.addEventListener('click', showDeliveryForm);
    backToCartBtn.addEventListener('click', showCartView);

    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData.entries());
        sendOrderToWhatsApp(customerData);
    });

    document.querySelectorAll('input[name="delivery_option"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'domicilio') {
                addressField.style.display = 'block';
                addressInput.required = true;
            } else {
                addressField.style.display = 'none';
                addressInput.required = false;
            }
        });
    });
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) { addToCart(parseInt(e.target.dataset.id), e.target); }
        if (e.target.closest('.quantity-change-btn')) { const btn = e.target.closest('.quantity-change-btn'); changeQuantity(parseInt(btn.dataset.id), btn.classList.contains('increase-btn') ? 1 : -1); }
        if (e.target.closest('.remove-item-btn')) { removeItem(parseInt(e.target.closest('.remove-item-btn').dataset.id)); }
    });
    const genericWhatsappMessage = encodeURIComponent('Hola Biolife, quisiera más información sobre sus productos.');
    whatsappFab.href = `https://wa.me/${whatsappNumber}?text=${genericWhatsappMessage}`;
    
    loadProducts();
    renderProducts();
    updateCartView();
    
    const scrollObserver = initScrollAnimations();
    document.querySelectorAll('.product-card, .category-card').forEach(card => {
        scrollObserver.observe(card);
    });

    // --- LÓGICA DEL MODAL DE ADMIN ---
    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            adminLoginOverlay.classList.remove('hidden');
            setTimeout(() => {
                adminLoginModal.style.opacity = '1';
                adminLoginModal.style.transform = 'scale(1)';
            }, 50);
        });

        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            if (password === ADMIN_PASSWORD) {
                window.location.href = 'admin.html';
            } else {
                adminLoginError.classList.remove('hidden');
            }
        });

        adminLoginOverlay.addEventListener('click', (e) => {
            if (e.target === adminLoginOverlay) {
                adminLoginModal.style.opacity = '0';
                adminLoginModal.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    adminLoginOverlay.classList.add('hidden');
                    adminLoginError.classList.add('hidden');
                    adminLoginForm.reset();
                }, 300);
            }
        });
    }
});
