document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
  
    if (!name || !price || !quantity || !category || !description) {
      alert('Please fill all fields.');
      return;
    }
  
    const newProduct = { name, price, quantity, category, description };
  
    try {
      const response = await fetch('http://localhost:3000/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully!');
        loadProducts(); // Refresh the product list
      } else {
        alert('Failed to add product: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  });
  
  document.getElementById('place-order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const product_id = document.getElementById('product_id').value;
    const quantity = document.getElementById('order_quantity').value;
  
    if (!product_id || !quantity) {
      alert('Please fill all fields.');
      return;
    }
  
    const newOrder = { product_id, quantity };
  
    try {
      const response = await fetch('http://localhost:3000/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  });
  
  // Load products on page load
  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const products = await response.json();
  
      const productList = document.getElementById('product-list');
      productList.innerHTML = ''; // Clear previous list
  
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.category} - $${product.price} - Quantity: ${product.quantity}`;
        productList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
  
  window.onload = loadProducts;
  