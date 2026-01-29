/**
 * 어디산 - 상품몰 페이지 JavaScript
 */

// 전역 변수
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 9;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
});

// 상품 데이터 로드 (main.js에서 가져오기)
function loadProducts() {
    // main.js의 products 배열 사용
    if (typeof products !== 'undefined') {
        allProducts = [...products];
        filteredProducts = [...products];
        renderProducts();
        renderPagination();
    }
}

// 상품 렌더링
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    const productCount = document.getElementById('product-count');
    
    if (!productsGrid) return;
    
    // 페이지네이션 계산
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayProducts = filteredProducts.slice(startIndex, endIndex);
    
    // 결과 없음 처리
    if (filteredProducts.length === 0) {
        productsGrid.classList.add('hidden');
        noResults.classList.remove('hidden');
        productCount.textContent = '검색 결과가 없습니다';
        return;
    }
    
    productsGrid.classList.remove('hidden');
    noResults.classList.add('hidden');
    productCount.textContent = `총 ${filteredProducts.length}개의 상품`;
    
    // 상품 카드 렌더링
    productsGrid.innerHTML = displayProducts.map(product => `
        <div class="product-card group" onclick="goToProductDetail(${product.id})">
            <div class="relative overflow-hidden rounded-t-xl">
                <img src="${product.images[0]}" 
                     alt="${product.name}" 
                     class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 300%27%3E%3Crect fill=%27%232D5D3F%27 width=%27400%27 height=%27300%27/%3E%3Ctext fill=%27%23fff%27 font-family=%27Arial%27 font-size=%2720%27 x=%27200%27 y=%27150%27 text-anchor=%27middle%27%3E${product.name}%3C/text%3E%3C/svg%3E'">
                
                <!-- 배지 -->
                <div class="absolute top-3 left-3 flex flex-col gap-2">
                    ${product.organic ? `
                        <span class="product-badge organic">
                            <i class="fas fa-leaf"></i> 유기농
                        </span>
                    ` : ''}
                    ${product.isNew ? `
                        <span class="product-badge new">
                            <i class="fas fa-star"></i> NEW
                        </span>
                    ` : ''}
                </div>
                
                <!-- 찜하기 버튼 -->
                <button onclick="event.stopPropagation(); toggleWishlist(${product.id})" 
                        class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition">
                    <i class="far fa-heart text-gray-600"></i>
                </button>
            </div>
            
            <div class="p-5">
                <!-- 원산지 & 인증 -->
                <div class="flex items-center justify-between mb-3">
                    <span class="origin-badge">
                        <i class="fas fa-map-marker-alt"></i> ${product.origin}
                    </span>
                    ${product.certified ? '<i class="fas fa-certificate text-primary text-sm" title="인증된 생산자"></i>' : ''}
                </div>
                
                <!-- 상품명 -->
                <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    ${product.name}
                </h3>
                
                <!-- 별점 & 리뷰 -->
                <div class="flex items-center mb-3">
                    <div class="rating-stars mr-2">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-500">(${product.reviews})</span>
                </div>
                
                <!-- 가격 -->
                <div class="mb-4">
                    <div class="flex items-baseline gap-2">
                        <span class="text-2xl font-bold text-primary">${product.price.toLocaleString()}원</span>
                        <span class="text-sm text-gray-500">/ ${product.unit}</span>
                    </div>
                </div>
                
                <!-- 생산자 -->
                <div class="farmer-badge mb-4 text-sm">
                    <i class="fas fa-user-check"></i>
                    <span>${product.farmer}</span>
                </div>
                
                <!-- 장바구니 버튼 -->
                <button 
                    onclick="event.stopPropagation(); addToCart(${product.id})" 
                    class="w-full btn btn-primary ${product.stock === 0 ? 'btn-disabled' : ''}"
                    ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock > 0 ? '장바구니 담기' : '품절'}
                </button>
            </div>
        </div>
    `).join('');
}

// 페이지네이션 렌더링
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // 이전 버튼
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" 
                class="px-3 py-2 border rounded-lg hover:bg-gray-100 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // 페이지 번호
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" 
                    class="px-4 py-2 border rounded-lg ${i === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-100'}">
                ${i}
            </button>
        `;
    }
    
    // 다음 버튼
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" 
                class="px-3 py-2 border rounded-lg hover:bg-gray-100 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// 페이지 변경
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 필터 적용
function applyFilters() {
    // 카테고리 필터
    const categoryFilters = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(input => input.value);
    
    // 지역 필터
    const regionFilters = Array.from(document.querySelectorAll('.region-filter:checked'))
        .map(input => input.value);
    
    // 인증 필터
    const certFilters = Array.from(document.querySelectorAll('.cert-filter:checked'))
        .map(input => input.value);
    
    // 가격 필터
    const priceFilter = document.querySelector('.price-filter:checked');
    let minPrice = 0, maxPrice = Infinity;
    if (priceFilter) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        minPrice = min;
        maxPrice = max;
    }
    
    // 필터 적용
    filteredProducts = allProducts.filter(product => {
        // 카테고리 필터
        if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
            return false;
        }
        
        // 지역 필터
        if (regionFilters.length > 0 && !regionFilters.some(region => product.origin.includes(region))) {
            return false;
        }
        
        // 인증 필터
        if (certFilters.length > 0) {
            if (certFilters.includes('유기농') && !product.organic) return false;
            if (certFilters.includes('무농약') && !product.organic) return false;
            if (certFilters.includes('GAP') && !product.certified) return false;
        }
        
        // 가격 필터
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// 필터 초기화
function resetFilters() {
    // 모든 체크박스 해제
    document.querySelectorAll('.category-filter, .region-filter, .cert-filter, .price-filter')
        .forEach(input => input.checked = false);
    
    // 검색어 초기화
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    // 정렬 초기화
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'popular';
    
    // 필터 재적용
    filteredProducts = [...allProducts];
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// 정렬
function sortProducts(sortType) {
    switch(sortType) {
        case 'popular':
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        case 'low-price':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'high-price':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// 검색
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    if (!searchTerm) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.farmer.toLowerCase().includes(searchTerm) ||
            product.origin.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// 엔터키로 검색
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// 상품 상세 페이지로 이동
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// 찜하기 토글 (LocalStorage 사용)
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('eodisan_wishlist') || '[]');
    
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('찜 목록에서 삭제되었습니다', 'info');
    } else {
        wishlist.push(productId);
        showToast('찜 목록에 추가되었습니다 ❤️', 'success');
    }
    
    localStorage.setItem('eodisan_wishlist', JSON.stringify(wishlist));
    
    // 하트 아이콘 업데이트
    updateWishlistIcons();
}

// 찜 아이콘 업데이트
function updateWishlistIcons() {
    const wishlist = JSON.parse(localStorage.getItem('eodisan_wishlist') || '[]');
    
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = parseInt(card.getAttribute('onclick').match(/\d+/)[0]);
        const heartIcon = card.querySelector('button i');
        
        if (wishlist.includes(productId)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas', 'text-red-500');
        } else {
            heartIcon.classList.remove('fas', 'text-red-500');
            heartIcon.classList.add('far');
        }
    });
}

// 별점 렌더링 (main.js와 동일)
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-yellow-400"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-yellow-400"></i>';
    }
    
    return stars;
}

console.log('✅ 상품몰 페이지 JavaScript가 로드되었습니다.');
