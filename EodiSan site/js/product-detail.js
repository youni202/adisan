/**
 * 어디산 - 상품 상세 페이지 JavaScript
 */

let currentProduct = null;
let currentQuantity = 1;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId && typeof products !== 'undefined') {
        currentProduct = products.find(p => p.id === productId);
        if (currentProduct) {
            renderProductDetail();
            renderRelatedProducts();
            updateCartCount();
        } else {
            showError404();
        }
    } else {
        showError404();
    }
});

// 상품 상세 렌더링
function renderProductDetail() {
    const container = document.getElementById('product-detail-container');
    if (!container || !currentProduct) return;

    // 페이지 제목 업데이트
    document.title = `${currentProduct.name} - 어디산`;
    document.getElementById('product-category').textContent = currentProduct.category;

    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-12">
            <!-- 이미지 갤러리 -->
            <div>
                <div class="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img src="${currentProduct.images[0]}" 
                         alt="${currentProduct.name}" 
                         class="w-full h-[500px] object-cover"
                         id="main-image">
                    
                    <!-- 찜하기 버튼 -->
                    <button onclick="toggleWishlist(${currentProduct.id})" 
                            class="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition">
                        <i class="far fa-heart text-2xl text-gray-600" id="wishlist-icon"></i>
                    </button>
                    
                    <!-- 배지 -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                        ${currentProduct.organic ? `
                            <span class="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold">
                                <i class="fas fa-leaf"></i> 유기농 인증
                            </span>
                        ` : ''}
                        ${currentProduct.isNew ? `
                            <span class="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold">
                                <i class="fas fa-star"></i> 신상품
                            </span>
                        ` : ''}
                    </div>
                </div>
                
                <!-- 썸네일 (현재는 1개만 있지만 확장 가능) -->
                <div class="flex gap-2 overflow-x-auto">
                    ${currentProduct.images.map((img, index) => `
                        <img src="${img}" 
                             alt="${currentProduct.name} ${index + 1}" 
                             class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${index === 0 ? 'border-primary' : 'border-gray-200'}"
                             onclick="changeMainImage('${img}')">
                    `).join('')}
                </div>
            </div>
            
            <!-- 상품 정보 -->
            <div>
                <!-- 카테고리 & 태그 -->
                <div class="flex items-center gap-2 mb-4">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${currentProduct.category}</span>
                    ${currentProduct.certified ? '<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"><i class="fas fa-certificate"></i> 인증 생산자</span>' : ''}
                </div>
                
                <!-- 상품명 -->
                <h1 class="text-3xl font-bold text-gray-800 mb-4">${currentProduct.name}</h1>
                
                <!-- 별점 & 리뷰 -->
                <div class="flex items-center mb-6">
                    <div class="rating-stars mr-3 text-lg">
                        ${renderStars(currentProduct.rating)}
                    </div>
                    <span class="text-lg font-semibold text-gray-800">${currentProduct.rating}</span>
                    <span class="text-gray-500 ml-2">(리뷰 ${currentProduct.reviews}개)</span>
                </div>
                
                <!-- 가격 -->
                <div class="bg-gray-50 rounded-xl p-6 mb-6">
                    <div class="flex items-baseline gap-3 mb-2">
                        <span class="text-4xl font-bold text-primary">${currentProduct.price.toLocaleString()}원</span>
                        <span class="text-lg text-gray-500">/ ${currentProduct.unit}</span>
                    </div>
                    <p class="text-sm text-gray-600">30,000원 이상 구매 시 무료배송</p>
                </div>
                
                <!-- 원산지 (필수 표시) -->
                <div class="border-2 border-yellow-400 rounded-xl p-4 mb-6 bg-yellow-50">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-map-marker-alt text-yellow-600 text-xl"></i>
                        <span class="font-bold text-gray-800">원산지 (필수 표시)</span>
                    </div>
                    <p class="text-lg font-semibold text-gray-800">${currentProduct.origin}</p>
                </div>
                
                <!-- 생산자 정보 -->
                <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                        <i class="fas fa-user-check text-primary"></i>
                        생산자 정보
                    </h3>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xl font-bold text-gray-800 mb-1">${currentProduct.farmer}</p>
                            <p class="text-sm text-gray-600">${currentProduct.farmerGrade}</p>
                        </div>
                        <div class="grade-badge">
                            ${getGradeIcon(currentProduct.farmerGrade)} ${currentProduct.farmerGrade}
                        </div>
                    </div>
                    <button class="mt-4 text-primary hover:text-secondary text-sm font-semibold">
                        농가 스토리 보기 <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <!-- 농산물 특성 안내 (POLICY-002) -->
                <div class="border-2 border-blue-400 rounded-xl p-4 mb-6 bg-blue-50">
                    <details class="cursor-pointer">
                        <summary class="font-bold text-gray-800 flex items-center gap-2">
                            <i class="fas fa-exclamation-triangle text-blue-600"></i>
                            농산물 특성 안내 (구매 전 필수 확인)
                        </summary>
                        <div class="mt-3 text-sm text-gray-700 space-y-2">
                            <p>농산물은 자연 상태에서 재배되어 다음과 같은 개체차가 있을 수 있습니다:</p>
                            <ul class="list-disc list-inside pl-4 space-y-1">
                                <li>중량 ±10%, 크기 ±15% 허용 범위</li>
                                <li>색상 및 당도의 자연적 편차</li>
                                <li>작은 벌레 1~2마리 혼입 가능 (자연 재배)</li>
                            </ul>
                            <p class="mt-3 text-xs text-gray-500">
                                📄 <a href="javascript:void(0)" onclick="showPolicy('refund')" class="text-blue-600 hover:underline">환불/취소 정책 (POLICY-002) 상세보기</a>
                            </p>
                        </div>
                    </details>
                </div>
                
                <!-- 수량 선택 & 주문 -->
                <div class="border-t pt-6">
                    <div class="flex items-center justify-between mb-4">
                        <span class="font-semibold text-gray-800">수량</span>
                        <div class="quantity-selector">
                            <button onclick="changeQuantity(-1)" class="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-100">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="quantity" value="1" min="1" max="${currentProduct.stock}" readonly 
                                   class="w-16 text-center border-t border-b border-gray-300 py-2 font-semibold">
                            <button onclick="changeQuantity(1)" class="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-100">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between mb-6 text-xl">
                        <span class="font-semibold">총 금액</span>
                        <span class="text-3xl font-bold text-primary" id="total-price">${currentProduct.price.toLocaleString()}원</span>
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="addToCartFromDetail()" class="flex-1 py-4 border-2 border-primary text-primary rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                            <i class="fas fa-shopping-cart"></i> 장바구니
                        </button>
                        <button onclick="buyNowFromDetail()" class="flex-1 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-secondary transition shadow-lg">
                            <i class="fas fa-credit-card"></i> 바로 구매
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 상품 상세 설명 -->
        <div class="mt-16">
            <div class="border-b mb-8">
                <button class="px-6 py-4 border-b-2 border-primary text-primary font-semibold">상품 설명</button>
                <button class="px-6 py-4 text-gray-600 hover:text-primary">리뷰 (${currentProduct.reviews})</button>
                <button class="px-6 py-4 text-gray-600 hover:text-primary">문의</button>
            </div>
            
            <div class="prose max-w-none">
                <h2 class="text-2xl font-bold mb-6">상품 소개</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-8">${currentProduct.description}</p>
                
                <div class="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 class="text-xl font-bold mb-4">💡 특별 안내</h3>
                    <p class="text-gray-700">${currentProduct.notice}</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 rounded-xl p-6">
                        <h4 class="font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-truck text-blue-600"></i>
                            배송 안내
                        </h4>
                        <ul class="text-sm space-y-2 text-gray-700">
                            <li>• 주문 후 2~3일 내 배송</li>
                            <li>• 30,000원 이상 무료배송</li>
                            <li>• 신선 상품은 냉장 배송</li>
                        </ul>
                    </div>
                    
                    <div class="bg-green-50 rounded-xl p-6">
                        <h4 class="font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-undo text-green-600"></i>
                            환불/교환 안내
                        </h4>
                        <ul class="text-sm space-y-2 text-gray-700">
                            <li>• 배송 완료 후 7일 이내 가능</li>
                            <li>• 상품 하자 시 전액 환불</li>
                            <li>• 단순 변심 시 배송비 고객 부담</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 찜 아이콘 업데이트
    updateWishlistIcon();
}

// 메인 이미지 변경
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// 수량 변경
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput || !currentProduct) return;

    currentQuantity = Math.max(1, Math.min(currentQuantity + delta, currentProduct.stock));
    quantityInput.value = currentQuantity;

    // 총 금액 업데이트
    document.getElementById('total-price').textContent =
        (currentProduct.price * currentQuantity).toLocaleString() + '원';
}

// 장바구니 담기
function addToCartFromDetail() {
    if (!currentProduct) return;

    // main.js의 addToCart 함수 활용
    for (let i = 0; i < currentQuantity; i++) {
        addToCart(currentProduct.id);
    }

    showToast(`${currentProduct.name} ${currentQuantity}개가 장바구니에 추가되었습니다! 🛒`, 'success');
}

// 바로 구매
function buyNowFromDetail() {
    addToCartFromDetail();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// 탭 전환 로직
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => {
                b.classList.remove('active', 'border-primary', 'text-primary');
                b.classList.add('border-transparent', 'text-gray-700');
            });

            // Add active class to clicked button
            btn.classList.add('active', 'border-primary', 'text-primary');
            btn.classList.remove('border-transparent', 'text-gray-700');

            // Hide all contents
            tabContents.forEach(content => content.classList.add('hidden'));

            // Show target content
            const targetId = 'tab-' + btn.dataset.tab;
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // 농가 스토리 버튼 연결
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') && e.target.closest('button').innerText.includes('농가 스토리 보기')) {
            window.location.href = 'stories.html';
        }
    });
});

// 찜하기 토글
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
    updateWishlistIcon();
}

// 찜 아이콘 업데이트
function updateWishlistIcon() {
    if (!currentProduct) return;

    const wishlist = JSON.parse(localStorage.getItem('eodisan_wishlist') || '[]');
    const heartIcon = document.getElementById('wishlist-icon');

    if (heartIcon) {
        if (wishlist.includes(currentProduct.id)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas', 'text-red-500');
        } else {
            heartIcon.classList.remove('fas', 'text-red-500');
            heartIcon.classList.add('far');
        }
    }
}

// 연관 상품 렌더링
function renderRelatedProducts() {
    if (!currentProduct || typeof products === 'undefined') return;

    const relatedProducts = products
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .slice(0, 4);

    const container = document.getElementById('related-products');
    if (!container) return;

    container.innerHTML = relatedProducts.map(product => `
        <div class="product-card" onclick="goToProduct(${product.id})">
            <div class="relative overflow-hidden rounded-t-xl">
                <img src="${product.images[0]}" 
                     alt="${product.name}" 
                     class="w-full h-48 object-cover hover:scale-110 transition-transform duration-300">
            </div>
            <div class="p-4">
                <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="rating-stars text-sm mr-1">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-xs text-gray-500">(${product.reviews})</span>
                </div>
                <p class="text-xl font-bold text-primary">${product.price.toLocaleString()}원</p>
            </div>
        </div>
    `).join('');
}

// 상품으로 이동
function goToProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// 404 에러 표시
function showError404() {
    const container = document.getElementById('product-detail-container');
    if (container) {
        container.innerHTML = `
            <div class="text-center py-20">
                <i class="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">상품을 찾을 수 없습니다</h1>
                <p class="text-gray-600 mb-8">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
                <a href="products.html" class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition inline-block">
                    상품 목록으로 돌아가기
                </a>
            </div>
        `;
    }
}

// 별점 렌더링
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

// 등급 아이콘
function getGradeIcon(grade) {
    const icons = {
        '초보 농부': '🌱',
        '일반 농부': '🌾',
        '우수 농부': '⭐',
        '명인 농부': '👑'
    };
    return icons[grade] || '🌾';
}

console.log('✅ 상품 상세 페이지 JavaScript가 로드되었습니다.');
