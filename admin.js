document.addEventListener('DOMContentLoaded', () => {
    let products = [];

    // --- Lista de productos por defecto (solo se usa si no hay nada guardado) ---
    const defaultProducts = [
        { id: 1, name: 'Piña', price: 3.00, image: '/imagenes/piña.jpg' },
        { id: 2, name: 'Durazno', price: 5.00, image: '/imagenes/durazno.jpg' },
        { id: 3, name: 'Naranja (4x S/1)', price: 0.25, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop' },
        { id: 4, name: 'Arándanos', price: 17.00, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1972&auto=format&fit=crop' },
        { id: 5, name: 'Bellako', price: 3.50, image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop' }, // Usando imagen de plátano
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

    function loadProducts() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = defaultProducts;
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    function renderProducts() {
        const productList = document.getElementById('admin-product-list');
        if (!productList) return;
        productList.innerHTML = '';
        products.forEach(product => {
            const row = `
                <tr id="product-${product.id}">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <img class="h-10 w-10 rounded-full object-cover" src="${product.image}" alt="">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${product.name}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="number" step="0.01" value="${product.price.toFixed(2)}" class="price-input w-24 border border-gray-300 rounded-md p-1">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button data-id="${product.id}" class="save-btn text-green-600 hover:text-green-900 mr-4">Guardar</button>
                        <button data-id="${product.id}" class="delete-btn text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                </tr>
            `;
            productList.innerHTML += row;
        });
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
        alert('¡Lista de productos actualizada!');
    }

    // --- Event Listeners ---
    const adminProductList = document.getElementById('admin-product-list');
    if (adminProductList) {
        adminProductList.addEventListener('click', (e) => {
            if (e.target.classList.contains('save-btn')) {
                const productId = parseInt(e.target.dataset.id);
                const productRow = document.getElementById(`product-${productId}`);
                const newPrice = parseFloat(productRow.querySelector('.price-input').value);

                const productToUpdate = products.find(p => p.id === productId);
                if (productToUpdate && !isNaN(newPrice)) {
                    productToUpdate.price = newPrice;
                    saveProducts();
                    renderProducts(); // Re-render to confirm change
                } else {
                    alert('Precio inválido.');
                }
            }

            if (e.target.classList.contains('delete-btn')) {
                const productId = parseInt(e.target.dataset.id);
                if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                    products = products.filter(p => p.id !== productId);
                    saveProducts();
                    renderProducts();
                }
            }
        });
    }
    
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('new-product-name').value;
            const price = parseFloat(document.getElementById('new-product-price').value);
            const image = document.getElementById('new-product-image').value;
            
            if (name && !isNaN(price) && image) {
                // CORRECCIÓN: Cargar los productos existentes antes de añadir uno nuevo
                loadProducts(); 
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({ id: newId, name, price, image });
                saveProducts();
                renderProducts();
                e.target.reset(); // Limpiar el formulario
            } else {
                alert('Por favor, completa todos los campos correctamente.');
            }
        });
    }

    // --- LÓGICA DEL BOTÓN DE CERRAR SESIÓN ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // --- Initialization ---
    loadProducts();
    renderProducts();
});
