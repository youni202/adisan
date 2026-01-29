/**
 * 어디산 - 관리자 페이지 JavaScript
 */

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    // 상품 관리 페이지 로직
    if (window.location.pathname.includes('admin-products.html')) {
        initProductManagement();
    }

    // 주문 관리 페이지 로직
    if (window.location.pathname.includes('admin-orders.html')) {
        initOrderManagement();
    }
});

// Mock Data Load (실제 서비스에서는 서버 API 호출)
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    // If empty (first time), try to use default products from products.js (simulated)
    // In a real static site setup without a build step bundling JS, we might not have access to 'products' variable 
    // from products.js unless it's included. We will ensure simulated data for admin.
    if (products.length === 0) {
        // Fallback default simulation
        return [
            { id: 1, name: "유기농 쌈채소 세트", price: 15000, stock: 50, category: "채소", status: "판매중" },
            { id: 2, name: "성주 참외 3kg", price: 25000, stock: 30, category: "과일", status: "판매중" },
            { id: 3, name: "무항생제 계란 30구", price: 12000, stock: 100, category: "계란", status: "품절" },
        ];
    }
    return products;
}

// ---------------------------------------------------------
// Product Management Logic
// ---------------------------------------------------------
function initProductManagement() {
    const tableBody = document.getElementById('product-list-body');
    const products = loadProducts();

    if (!tableBody) return;

    renderProducts(products);

    // Search Logic
    const searchInput = document.getElementById('search-product');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
            renderProducts(filtered);
        });
    }
}

function renderProducts(products) {
    const tableBody = document.getElementById('product-list-body');
    if (!tableBody) return;

    tableBody.innerHTML = products.map(p => `
        <tr class="border-b last:border-0 hover:bg-gray-50">
            <td class="py-3 px-4 font-mono text-gray-600">${p.id}</td>
            <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                    <img src="images/product-placeholder.jpg" class="w-10 h-10 rounded object-cover bg-gray-200">
                    <span class="font-semibold text-gray-800">${p.name}</span>
                </div>
            </td>
            <td class="py-3 px-4">${p.category}</td>
            <td class="py-3 px-4 font-bold text-gray-700">${p.price.toLocaleString()}원</td>
            <td class="py-3 px-4">${p.stock}개</td>
            <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${p.status === '판매중' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }">${p.status || '판매중'}</span>
            </td>
            <td class="py-3 px-4">
                <button onclick="editProduct(${p.id})" class="text-blue-500 hover:bg-blue-50 p-2 rounded transition"><i class="fas fa-edit"></i></button>
                <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:bg-red-50 p-2 rounded transition"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function openAddProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('hidden');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.add('hidden');
}

function saveProduct() {
    alert('상품이 저장되었습니다. (데모)');
    closeProductModal();
    // Refresh list logic here
}

function deleteProduct(id) {
    if (confirm('정말 삭제하시겠습니까?')) {
        alert('삭제되었습니다. (데모)');
        // Remove logic here
    }
}

function editProduct(id) {
    alert(id + '번 상품 수정 모달을 엽니다.');
    openAddProductModal();
}


// ---------------------------------------------------------
// Order Management Logic
// ---------------------------------------------------------
function initOrderManagement() {
    // ... impl
}
