let products = [
    { name: "Laptop", price: 1200, stock: 5 },
    { name: "Smartphone", price: 700, stock: 12 },
    { name: "Headphones", price: 150, stock: 3 },
  ];
  
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (id === 'dashboard') renderChart();
    if (id === 'inventory') renderInventory();
  }
  
  function renderChart() {
    const orders = products.length;
    const revenue = products.reduce((sum, p) => sum + (p.price * (10 - p.stock)), 0);
    document.getElementById('totalOrders').textContent = orders;
    document.getElementById('totalRevenue').textContent = revenue;
  
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: products.map(p => p.name),
        datasets: [{
          label: 'Revenue',
          data: products.map(p => p.price * (10 - p.stock)),
          backgroundColor: '#4caf50'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
  
  function renderInventory() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach((p, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>$${p.price}</td>
        <td class="${p.stock < 5 ? 'low-stock' : ''}">${p.stock}</td>
        <td><input type="number" onchange="updateStock(${index}, this.value)" value="${p.stock}" /></td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function updateStock(index, value) {
    products[index].stock = parseInt(value);
    renderInventory();
  }
  
  function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(row => {
      const name = row.cells[0].textContent.toLowerCase();
      row.style.display = name.includes(query) ? '' : 'none';
    });
  }
  
  document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const desc = document.getElementById('productDesc').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    products.push({ name, price, stock });
    this.reset();
    alert('Product added successfully');
  });
  