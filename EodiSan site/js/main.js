/**
 * 어디산 - 농산물 직거래 플랫폼
 * 메인 JavaScript 파일
 */

// ==========================================
// 전역 변수 및 상태 관리
// ==========================================

let cart = [];
let currentUser = null;
let products = [];
let farmers = [];

// ==========================================
// 초기화
// ==========================================
// Toast 알림 표시
function showToast(message, type = 'success') {
    // ... existing toast logic if any, or create new ...
    // Since showToast is called in other files but might not be fully implemented or just simple alert in previous steps
    // Let's implement a proper toast if not exists, or just use alert for now. 
    // Wait, the viewed file main.js has placeholders. 
    // I will implement a simple toast here.

    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-y-10 opacity-0 z-50 ${type === 'success' ? 'bg-primary' : 'bg-gray-800'
        }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 약관 모달 표시
function showTerms(type) {
    const content = TERMS_DATA[type];
    if (!content) return;

    // 모달 컨테이너 생성 (없으면)
    let modal = document.getElementById('terms-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'terms-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 hidden';
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                <div class="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 class="font-bold text-lg text-gray-800">약관 상세</h3>
                    <button onclick="closeTermsModal()" class="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="terms-content" class="p-6 overflow-y-auto custom-scrollbar"></div>
                <div class="p-4 border-t bg-gray-50 rounded-b-xl text-right">
                    <button onclick="closeTermsModal()" class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">닫기</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // 닫기 이벤트 (배경 클릭)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTermsModal();
        });
    }

    document.getElementById('terms-content').innerHTML = content;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
}

function closeTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // 로컬 스토리지에서 장바구니 불러오기
    loadCartFromStorage();

    // 목업 데이터 생성
    generateMockProducts();
    generateMockFarmers();

    // 상품 렌더링
    renderProducts();
    renderFarmers();

    // 장바구니 카운트 업데이트
    updateCartCount();

    console.log('✅ 어디산 플랫폼이 초기화되었습니다.');
}

// ==========================================
// 목업 데이터 생성
// ==========================================

function generateMockProducts() {
    products = [
        {
            id: 1,
            name: '무농약 로메인 상추',
            category: '채소',
            price: 12000,
            unit: '1kg',
            origin: '충청남도 홍성',
            farmer: '홍성유기농장',
            farmerGrade: '우수 농부',
            rating: 4.8,
            reviews: 156,
            certified: true,
            organic: true,
            isNew: false,
            stock: 50,
            description: '신선한 아침 이슬을 머금은 로메인 상추입니다. 무농약으로 재배하여 안심하고 드실 수 있습니다.',
            images: ['https://www.genspark.ai/api/files/s/Bj2nOYxL?cache_control=3600'],
            notice: '중량 ±10% 개체차 있을 수 있습니다 (자연 재배 특성)'
        },
        {
            id: 2,
            name: '친환경 사과 (부사)',
            category: '과일',
            price: 25000,
            unit: '5kg',
            origin: '경상북도 안동',
            farmer: '안동사과농원',
            farmerGrade: '명인 농부',
            rating: 4.9,
            reviews: 243,
            certified: true,
            organic: true,
            isNew: false,
            stock: 30,
            description: '당도 높은 안동 사과입니다. GAP 인증을 받은 안전한 사과입니다.',
            images: ['https://www.genspark.ai/api/files/s/l519ucwG?cache_control=3600'],
            notice: '크기 ±15% 개체차 있을 수 있습니다'
        },
        {
            id: 3,
            name: '햇 찹쌀',
            category: '곡물',
            price: 45000,
            unit: '10kg',
            origin: '전라남도 나주',
            farmer: '나주곡물농장',
            farmerGrade: '우수 농부',
            rating: 4.7,
            reviews: 89,
            certified: true,
            organic: false,
            isNew: true,
            stock: 20,
            description: '2026년 햇곡물입니다. 찰지고 고소한 찹쌀로 떡과 밥에 적합합니다.',
            images: ['https://www.genspark.ai/api/files/s/vW1UEceS?cache_control=3600'],
            notice: '농산물 특성상 색상 및 품질 차이가 있을 수 있습니다'
        },
        {
            id: 4,
            name: '유기농 방울토마토',
            category: '채소',
            price: 8000,
            unit: '500g',
            origin: '경기도 이천',
            farmer: '이천토마토농장',
            farmerGrade: '일반 농부',
            rating: 4.6,
            reviews: 124,
            certified: true,
            organic: true,
            isNew: true,
            stock: 80,
            description: '달콤한 유기농 방울토마토입니다. 아이들 간식으로 최고입니다.',
            images: ['https://www.genspark.ai/api/files/s/qlt6ejV4?cache_control=3600'],
            notice: '신선도 유지를 위해 냉장 보관 필수'
        },
        {
            id: 5,
            name: '제주 감귤',
            category: '과일',
            price: 18000,
            unit: '3kg',
            origin: '제주특별자치도',
            farmer: '제주감귤농원',
            farmerGrade: '우수 농부',
            rating: 4.8,
            reviews: 312,
            certified: true,
            organic: false,
            isNew: false,
            stock: 100,
            description: '제주의 청정한 바람과 햇살을 받고 자란 달콤한 감귤입니다.',
            images: ['https://www.genspark.ai/api/files/s/eWf2k87H?cache_control=3600'],
            notice: '크기 및 당도 개체차 있을 수 있습니다'
        },
        {
            id: 6,
            name: '자연산 표고버섯',
            category: '버섯',
            price: 15000,
            unit: '500g',
            origin: '강원도 평창',
            farmer: '평창산나물농장',
            farmerGrade: '우수 농부',
            rating: 4.7,
            reviews: 67,
            certified: true,
            organic: true,
            isNew: false,
            stock: 25,
            description: '깊은 산속에서 자란 자연산 표고버섯입니다. 향과 맛이 진합니다.',
            images: ['https://www.genspark.ai/api/files/s/2hrT06gZ?cache_control=3600'],
            notice: '자연산 특성상 크기 및 모양 불균일'
        },
        {
            id: 7,
            name: '무항생제 닭고기',
            category: '계란',
            price: 12000,
            unit: '1kg',
            origin: '충청북도 음성',
            farmer: '음성양계농장',
            farmerGrade: '일반 농부',
            rating: 4.5,
            reviews: 98,
            certified: true,
            organic: false,
            isNew: true,
            stock: 40,
            description: '무항생제 인증을 받은 건강한 닭고기입니다.',
            images: ['https://www.genspark.ai/api/files/s/XHnS5a3q?cache_control=3600'],
            notice: '냉장 보관 필수, 수령 후 3일 이내 소비'
        },
        {
            id: 8,
            name: '국산 꿀',
            category: '가공식품',
            price: 35000,
            unit: '1kg',
            origin: '경상남도 하동',
            farmer: '하동양봉농장',
            farmerGrade: '명인 농부',
            rating: 4.9,
            reviews: 201,
            certified: true,
            organic: true,
            isNew: false,
            stock: 15,
            description: '100% 국산 아카시아 꿀입니다. 첨가물 없이 순수한 꿀입니다.',
            images: ['https://www.genspark.ai/api/files/s/976G82NE?cache_control=3600'],
            notice: '겨울철 결정화 현상은 자연스러운 현상입니다'
        }
    ];
}

function generateMockFarmers() {
    farmers = [
        {
            id: 1,
            name: '홍성유기농장',
            owner: '김농부',
            location: '충청남도 홍성',
            grade: '우수 농부',
            rating: 4.8,
            certified: true,
            certDate: '2025-03-15',
            speciality: '채소/쌈채소',
            description: '20년 경력의 유기농 전문 농장입니다. GAP 인증을 받았습니다.',
            products: 15,
            sales: 1240
        },
        {
            id: 2,
            name: '안동사과농원',
            owner: '이사과',
            location: '경상북도 안동',
            grade: '명인 농부',
            rating: 4.9,
            certified: true,
            certDate: '2023-01-10',
            speciality: '사과/배',
            description: '3대째 이어온 사과 재배 농가입니다. 전통 방식으로 정성껏 키웁니다.',
            products: 8,
            sales: 2450
        },
        {
            id: 3,
            name: '제주감귤농원',
            owner: '박감귤',
            location: '제주특별자치도',
            grade: '우수 농부',
            rating: 4.8,
            certified: true,
            certDate: '2024-09-20',
            speciality: '감귤/한라봉',
            description: '제주 청정 지역에서 재배한 달콤한 감귤을 선보입니다.',
            products: 12,
            sales: 1890
        }
    ];
}

// ==========================================
// 상품 렌더링
// ==========================================

function renderProducts(filteredProducts = null) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const displayProducts = filteredProducts || products;

    if (displayProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">검색 결과가 없습니다.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = displayProducts.map(product => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div class="relative">
                <img src="${product.images[0]}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 300%27%3E%3Crect fill=%27%2310b981%27 width=%27400%27 height=%27300%27/%3E%3Ctext fill=%27%23fff%27 font-family=%27Arial%27 font-size=%2720%27 x=%27200%27 y=%27150%27 text-anchor=%27middle%27%3E${product.name}%3C/text%3E%3C/svg%3E'">
                ${product.organic ? `
                    <div class="product-badge organic">
                        <i class="fas fa-leaf"></i> 유기농
                    </div>
                ` : ''}
                ${product.isNew ? `
                    <div class="product-badge new" style="left: ${product.organic ? '90px' : '12px'}">
                        <i class="fas fa-star"></i> NEW
                    </div>
                ` : ''}
            </div>
            
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="origin-badge">
                        <i class="fas fa-map-marker-alt"></i> ${product.origin}
                    </span>
                    ${product.certified ? '<i class="fas fa-certificate text-primary text-sm" title="인증된 생산자"></i>' : ''}
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 mb-1">${product.name}</h3>
                
                <div class="flex items-center mb-3">
                    <div class="rating-stars mr-2">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-500">(${product.reviews})</span>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                    <div>
                        <span class="text-2xl font-bold text-primary">${product.price.toLocaleString()}원</span>
                        <span class="text-sm text-gray-500">/ ${product.unit}</span>
                    </div>
                </div>
                
                <div class="farmer-badge mb-3">
                    <i class="fas fa-user-check"></i>
                    <span>${product.farmer}</span>
                </div>
                
                <button 
                    onclick="event.stopPropagation(); addToCart(${product.id})" 
                    class="w-full btn btn-primary"
                    ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock > 0 ? '장바구니 담기' : '품절'}
                </button>
            </div>
        </div>
    `).join('');
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// ==========================================
// 생산자 렌더링
// ==========================================

function renderFarmers() {
    const farmersGrid = document.getElementById('farmers-grid');
    if (!farmersGrid) return;

    farmersGrid.innerHTML = farmers.map(farmer => `
        <div class="farmer-card">
            <div class="farmer-avatar flex items-center justify-center">
                <i class="fas fa-user text-4xl text-primary"></i>
            </div>
            
            <div class="grade-badge">
                ${getGradeIcon(farmer.grade)} ${farmer.grade}
            </div>
            
            <h3 class="text-xl font-bold text-gray-800 mb-1">${farmer.name}</h3>
            <p class="text-gray-600 mb-2">${farmer.owner} 농부</p>
            
            <div class="flex items-center justify-center mb-3">
                <div class="rating-stars mr-2">
                    ${renderStars(farmer.rating)}
                </div>
                <span class="text-sm text-gray-600">${farmer.rating}</span>
            </div>
            
            <div class="text-sm text-gray-600 mb-3">
                <i class="fas fa-map-marker-alt text-primary"></i> ${farmer.location}
            </div>
            
            <div class="text-sm text-gray-600 mb-4">
                <i class="fas fa-tag text-primary"></i> ${farmer.speciality}
            </div>
            
            <p class="text-sm text-gray-600 mb-4">${farmer.description}</p>
            
            <div class="flex gap-2 text-sm">
                <div class="flex-1 bg-gray-100 rounded-lg p-2 text-center">
                    <div class="font-bold text-primary">${farmer.products}개</div>
                    <div class="text-xs text-gray-500">상품</div>
                </div>
                <div class="flex-1 bg-gray-100 rounded-lg p-2 text-center">
                    <div class="font-bold text-primary">${farmer.sales}</div>
                    <div class="text-xs text-gray-500">판매</div>
                </div>
            </div>
        </div>
    `).join('');
}

function getGradeIcon(grade) {
    const icons = {
        '초보 농부': '🌱',
        '일반 농부': '🌾',
        '우수 농부': '⭐',
        '명인 농부': '👑'
    };
    return icons[grade] || '🌾';
}

// ==========================================
// 상품 상세 모달
// ==========================================

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">${product.name}</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <!-- 상품 이미지 -->
                    <div class="product-gallery">
                        <img src="${product.images[0]}" 
                             alt="${product.name}" 
                             class="main-image"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 800 600%27%3E%3Crect fill=%27%2310b981%27 width=%27800%27 height=%27600%27/%3E%3Ctext fill=%27%23fff%27 font-family=%27Arial%27 font-size=%2730%27 x=%27400%27 y=%27300%27 text-anchor=%27middle%27%3E${product.name}%3C/text%3E%3C/svg%3E'">
                    </div>
                    
                    <!-- 기본 정보 -->
                    <div class="mb-6">
                        <div class="flex items-center gap-2 mb-3">
                            ${product.organic ? '<span class="product-badge organic"><i class="fas fa-leaf"></i> 유기농</span>' : ''}
                            ${product.isNew ? '<span class="product-badge new"><i class="fas fa-star"></i> NEW</span>' : ''}
                            ${product.certified ? '<span class="product-badge" style="background: #3b82f6"><i class="fas fa-certificate"></i> 인증 생산자</span>' : ''}
                        </div>
                        
                        <div class="flex items-center mb-3">
                            <div class="rating-stars mr-2">
                                ${renderStars(product.rating)}
                            </div>
                            <span class="text-gray-600">${product.rating} (리뷰 ${product.reviews}개)</span>
                        </div>
                        
                        <div class="text-4xl font-bold text-primary mb-2">
                            ${product.price.toLocaleString()}원
                            <span class="text-lg text-gray-500 font-normal">/ ${product.unit}</span>
                        </div>
                        
                        <div class="origin-badge inline-flex mb-4">
                            <i class="fas fa-map-marker-alt"></i> 원산지: ${product.origin}
                        </div>
                    </div>
                    
                    <!-- 판매자 정보 -->
                    <div class="bg-gray-50 rounded-xl p-4 mb-6">
                        <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <i class="fas fa-user-check text-primary"></i> 판매자 정보
                        </h3>
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-semibold">${product.farmer}</p>
                                <p class="text-sm text-gray-600">${product.farmerGrade}</p>
                            </div>
                            <div class="grade-badge">
                                ${getGradeIcon(product.farmerGrade)} ${product.farmerGrade}
                            </div>
                        </div>
                    </div>
                    
                    <!-- 농산물 특성 안내 -->
                    <div class="policy-notice policy-notice-warning mb-6">
                        <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <i class="fas fa-exclamation-triangle"></i>
                            농산물 특성 안내 (구매 전 필수 확인)
                        </h4>
                        <p class="text-sm text-gray-700 mb-2">
                            농산물은 자연 상태에서 재배되어 다음과 같은 개체차가 있을 수 있습니다:
                        </p>
                        <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>중량 ±10%, 크기 ±15% 허용 범위</li>
                            <li>색상 및 당도의 자연적 편차</li>
                            <li>작은 벌레 1~2마리 혼입 가능 (자연 재배)</li>
                        </ul>
                        <p class="text-xs text-gray-500 mt-2">
                            📄 <a href="javascript:void(0)" onclick="showPolicy('refund')" class="text-blue-600 hover:underline">환불/취소 정책 (POLICY-002)</a>
                        </p>
                    </div>
                    
                    <!-- 상품 설명 -->
                    <div class="mb-6">
                        <h3 class="font-bold text-gray-800 mb-3">상품 설명</h3>
                        <p class="text-gray-600">${product.description}</p>
                    </div>
                    
                    <!-- 주문 영역 -->
                    <div class="border-t pt-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="font-semibold">수량</span>
                            <div class="quantity-selector">
                                <button onclick="changeQuantity(-1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" id="quantity" value="1" min="1" max="${product.stock}" readonly>
                                <button onclick="changeQuantity(1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between mb-6 text-xl font-bold">
                            <span>총 금액</span>
                            <span class="text-primary" id="total-price">${product.price.toLocaleString()}원</span>
                        </div>
                        
                        <div class="flex gap-3">
                            <button class="btn btn-secondary flex-1" onclick="addToCartFromModal(${product.id})">
                                <i class="fas fa-shopping-cart"></i> 장바구니
                            </button>
                            <button class="btn btn-primary flex-1" onclick="buyNow(${product.id})">
                                <i class="fas fa-credit-card"></i> 바로 구매
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;

    const currentQty = parseInt(quantityInput.value);
    const newQty = Math.max(1, Math.min(currentQty + delta, parseInt(quantityInput.max)));

    quantityInput.value = newQty;

    // 총 금액 업데이트
    const productId = parseInt(quantityInput.closest('.modal-content').querySelector('[onclick*="addToCartFromModal"]').getAttribute('onclick').match(/\d+/)[0]);
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('total-price').textContent = (product.price * newQty).toLocaleString() + '원';
    }
}

// ==========================================
// 장바구니 관리
// ==========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            quantity: 1,
            farmer: product.farmer
        });
    }

    saveCartToStorage();
    updateCartCount();
    showToast('장바구니에 추가되었습니다! 🛒');
}

function addToCartFromModal(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            quantity: quantity,
            farmer: product.farmer
        });
    }

    saveCartToStorage();
    updateCartCount();
    closeModal();
    showToast(`${product.name}이(가) 장바구니에 추가되었습니다! 🛒`);
}

function buyNow(productId) {
    addToCartFromModal(productId);
    setTimeout(() => {
        showCart();
    }, 500);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (totalItems > 0) {
            cartCount.classList.add('cart-added');
            setTimeout(() => cartCount.classList.remove('cart-added'), 300);
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem('localfarm_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const stored = localStorage.getItem('localfarm_cart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

function showCart() {
    if (cart.length === 0) {
        showToast('장바구니가 비어있습니다.', 'info');
        return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = totalAmount >= 30000 ? 0 : 3000;

    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">장바구니</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    ${cart.map((item, index) => `
                        <div class="flex items-center gap-4 border-b pb-4 mb-4">
                            <div class="flex-1">
                                <h3 class="font-bold mb-1">${item.name}</h3>
                                <p class="text-sm text-gray-600">${item.farmer}</p>
                                <p class="text-primary font-bold">${item.price.toLocaleString()}원 / ${item.unit}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="btn btn-secondary" onclick="updateCartItemQuantity(${index}, -1)" style="padding: 0.5rem;">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="font-bold w-8 text-center">${item.quantity}</span>
                                <button class="btn btn-secondary" onclick="updateCartItemQuantity(${index}, 1)" style="padding: 0.5rem;">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="bg-gray-50 rounded-xl p-4 mb-6">
                        <div class="flex justify-between mb-2">
                            <span>상품 금액</span>
                            <span class="font-bold">${totalAmount.toLocaleString()}원</span>
                        </div>
                        <div class="flex justify-between mb-2">
                            <span>배송비</span>
                            <span class="font-bold">${deliveryFee === 0 ? '무료' : deliveryFee.toLocaleString() + '원'}</span>
                        </div>
                        ${deliveryFee > 0 ? `
                            <p class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-info-circle"></i> ${(30000 - totalAmount).toLocaleString()}원 더 구매하시면 무료배송!
                            </p>
                        ` : ''}
                        <div class="border-t mt-3 pt-3 flex justify-between text-xl">
                            <span class="font-bold">총 결제 금액</span>
                            <span class="font-bold text-primary">${(totalAmount + deliveryFee).toLocaleString()}원</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary w-full" onclick="proceedToCheckout()">
                        <i class="fas fa-credit-card"></i> 주문하기
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
}

function updateCartItemQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + delta);
        saveCartToStorage();
        updateCartCount();
        showCart(); // 재렌더링
    }
}

function removeFromCart(index) {
    if (confirm('이 상품을 장바구니에서 삭제하시겠습니까?')) {
        cart.splice(index, 1);
        saveCartToStorage();
        updateCartCount();

        if (cart.length === 0) {
            closeModal();
            showToast('장바구니가 비었습니다.');
        } else {
            showCart(); // 재렌더링
        }
    }
}

function proceedToCheckout() {
    closeModal();
    showCheckoutModal();
}

// ==========================================
// 주문/결제 모달
// ==========================================

function showCheckoutModal() {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = totalAmount >= 30000 ? 0 : 3000;
    const finalAmount = totalAmount + deliveryFee;

    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">주문/결제</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <!-- 주문 상품 -->
                    <h3 class="font-bold text-lg mb-3">주문 상품</h3>
                    ${cart.map(item => `
                        <div class="flex justify-between items-center mb-2 text-sm">
                            <span>${item.name} x ${item.quantity}</span>
                            <span class="font-bold">${(item.price * item.quantity).toLocaleString()}원</span>
                        </div>
                    `).join('')}
                    
                    <div class="border-t pt-3 mb-6">
                        <div class="flex justify-between mb-2">
                            <span>상품 금액</span>
                            <span>${totalAmount.toLocaleString()}원</span>
                        </div>
                        <div class="flex justify-between mb-3">
                            <span>배송비</span>
                            <span>${deliveryFee === 0 ? '무료' : deliveryFee.toLocaleString() + '원'}</span>
                        </div>
                        <div class="flex justify-between text-xl font-bold text-primary">
                            <span>최종 결제 금액</span>
                            <span>${finalAmount.toLocaleString()}원</span>
                        </div>
                    </div>
                    
                    <!-- 약관 동의 -->
                    <div class="policy-notice mb-6">
                        <h4 class="font-bold mb-3">⚠️ 약관 동의 (필수)</h4>
                        
                        <label class="custom-checkbox mb-3">
                            <input type="checkbox" id="agree-agricultural" required>
                            <span class="text-sm">
                                <strong>[필수]</strong> 농산물 특성 및 환불 정책 확인
                                <a href="javascript:void(0)" onclick="showPolicy('refund')" class="text-blue-600 hover:underline ml-1">[상세보기]</a>
                            </span>
                        </label>
                        
                        <label class="custom-checkbox mb-3">
                            <input type="checkbox" id="agree-privacy" required>
                            <span class="text-sm">
                                <strong>[필수]</strong> 개인정보 제3자 제공 동의
                                <a href="javascript:void(0)" onclick="showPolicy('privacy')" class="text-blue-600 hover:underline ml-1">[상세보기]</a>
                            </span>
                        </label>
                        
                        <label class="custom-checkbox">
                            <input type="checkbox" id="agree-marketing">
                            <span class="text-sm">[선택] 마케팅 정보 수신 동의</span>
                        </label>
                    </div>
                    
                    <button class="btn btn-primary w-full" onclick="completeOrder()">
                        <i class="fas fa-check"></i> ${finalAmount.toLocaleString()}원 결제하기
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
}

function completeOrder() {
    const agreeAgricultural = document.getElementById('agree-agricultural')?.checked;
    const agreePrivacy = document.getElementById('agree-privacy')?.checked;

    if (!agreeAgricultural || !agreePrivacy) {
        showToast('필수 약관에 동의해주세요.', 'error');
        return;
    }

    // 실제로는 결제 API 연동
    showToast('주문이 완료되었습니다! 🎉', 'success');

    // 장바구니 비우기
    cart = [];
    saveCartToStorage();
    updateCartCount();

    closeModal();
}

// ==========================================
// 마이페이지 모달
// ==========================================

function showMyPage() {
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">마이페이지</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <!-- 회원 정보 -->
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                        <div class="flex items-center gap-4">
                            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <div class="grade-badge mb-2">🌱 새싹 회원</div>
                                <h3 class="font-bold text-xl">홍길동 님</h3>
                                <p class="text-sm text-gray-600">다음 등급까지 30,000원</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 메뉴 -->
                    <div class="space-y-2">
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showToast('개발 중인 기능입니다.', 'info')">
                            <span><i class="fas fa-box mr-3 text-primary"></i>주문 내역</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showToast('개발 중인 기능입니다.', 'info')">
                            <span><i class="fas fa-undo mr-3 text-primary"></i>환불/취소 내역</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showToast('개발 중인 기능입니다.', 'info')">
                            <span><i class="fas fa-heart mr-3 text-primary"></i>찜한 상품</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showToast('개발 중인 기능입니다.', 'info')">
                            <span><i class="fas fa-star mr-3 text-primary"></i>리뷰 관리</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showToast('개발 중인 기능입니다.', 'info')">
                            <span><i class="fas fa-user-cog mr-3 text-primary"></i>회원 정보 수정</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        
                        <div class="border-t pt-2 mt-4">
                            <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicyMenu()">
                                <span><i class="fas fa-file-alt mr-3 text-primary"></i>이용약관 및 정책</span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
}

// ==========================================
// 정책 모달
// ==========================================

function showPolicyMenu() {
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">이용약관 및 정책</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="space-y-2">
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('producer')">
                            <span><i class="fas fa-user-check mr-3 text-primary"></i>생산자 인증 정책 (POLICY-001)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('refund')">
                            <span><i class="fas fa-undo mr-3 text-primary"></i>환불/취소 정책 (POLICY-002)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('commission')">
                            <span><i class="fas fa-percentage mr-3 text-primary"></i>수수료 정책 (POLICY-003)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('grade')">
                            <span><i class="fas fa-medal mr-3 text-primary"></i>회원 등급 정책 (POLICY-004)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('dispute')">
                            <span><i class="fas fa-balance-scale mr-3 text-primary"></i>분쟁 해결 정책 (POLICY-005)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <button class="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition flex items-center justify-between" onclick="showPolicy('sanction')">
                            <span><i class="fas fa-gavel mr-3 text-primary"></i>승인/제재 기준 (POLICY-006)</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
}

function showPolicy(policyType) {
    const policies = {
        producer: {
            title: '생산자 인증 정책 (POLICY-001)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-001</li>
                    <li>버전: v2.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">✨ 주요 내용</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>2단계 인증 시스템 (1차 서류 심사 + 2차 현장 확인)</li>
                    <li>Fast Track 제도 (GAP/유기농 인증 보유 시 간소화)</li>
                    <li>연 1회 재인증 의무</li>
                    <li>인증 유효 기간: 1년</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">📝 인증 절차</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>단계</th>
                                <th>심사 내용</th>
                                <th>처리 기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1차 심사</td>
                                <td>운영팀 (서류, 사업자등록증, 생산 증빙)</td>
                                <td>3영업일</td>
                            </tr>
                            <tr>
                                <td>2차 심사</td>
                                <td>팀장 (현장 확인, 생산 설비 검증)</td>
                                <td>7영업일</td>
                            </tr>
                            <tr>
                                <td>Fast Track</td>
                                <td>GAP/유기농 인증 보유자 간소화 절차</td>
                                <td>3-7영업일</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="policy-notice mb-4">
                    <p class="text-sm"><strong>💡 알림:</strong> 인증 완료 후 1년 내 재인증을 받지 않으면 판매 활동이 제한됩니다.</p>
                </div>
            `
        },
        refund: {
            title: '환불/취소 정책 (POLICY-002)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-002</li>
                    <li>버전: v1.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">✅ 환불 가능 사유</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>상품 하자 (부패, 변질, 이물질 3마리 이상)</li>
                    <li>배송 문제 (지연, 분실, 파손)</li>
                    <li>청약철회권 (배송 완료 후 7일 이내, 신선도 유지 시)</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">⚠️ 환불 불가 사유</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>단순 변심 (발송 후)</li>
                    <li>합리적 개체차 범위 내 (중량 ±10%, 크기 ±15%)</li>
                    <li>소비자 보관 소홀 (상온 방치 등)</li>
                    <li>소비자 귀책 배송지 오류</li>
                </ul>
                
                <div class="policy-notice policy-notice-warning mb-4">
                    <h4 class="font-bold mb-2">🌾 농산물 특성 안내</h4>
                    <p class="text-sm">농산물은 자연 상태에서 재배되어 다음과 같은 개체차가 발생할 수 있습니다:</p>
                    <ul class="list-disc list-inside text-sm mt-2">
                        <li>중량: ±10% 허용 범위</li>
                        <li>크기: ±15% 허용 범위</li>
                        <li>색상: 자연적 편차 (햇빛, 숙성도)</li>
                        <li>당도: 측정 시점, 보관 상태에 따라 변동</li>
                        <li>벌레: 작은 벌레 1~2마리 혼입 가능</li>
                    </ul>
                </div>
                
                <h3 class="text-lg font-bold mb-3">📝 환불 신청 방법</h3>
                <ol class="list-decimal list-inside text-sm text-gray-700">
                    <li>배송 완료 후 24시간 이내 신고 필수</li>
                    <li>사진 증빙 필수 (포장 상태 + 하자 부위)</li>
                    <li>마이페이지 > 주문 내역 > 문제 신고 클릭</li>
                    <li>CS팀 검토 후 24~72시간 내 처리</li>
                </ol>
            `
        },
        commission: {
            title: '수수료 정책 (POLICY-003)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-003</li>
                    <li>버전: v1.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">💰 플랫폼 수수료</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>판매자 등급</th>
                                <th>기본 수수료</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>초보 농부 (신규)</td>
                                <td>4.5%</td>
                            </tr>
                            <tr>
                                <td>일반 농부</td>
                                <td>5.5%</td>
                            </tr>
                            <tr>
                                <td>우수 농부</td>
                                <td>5.0%</td>
                            </tr>
                            <tr>
                                <td>명인 농부</td>
                                <td>4.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h3 class="text-lg font-bold mb-3">🎁 추가 할인</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>GAP/유기농 인증: -1.0%p</li>
                    <li>스마트팜: -0.5%p</li>
                    <li>농협 로컬푸드: -0.5%p</li>
                    <li>최대 할인: -2.0%p</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">📅 정산 주기</h3>
                <p class="text-sm text-gray-700 mb-4">
                    구매확정 후 3일 (D+3) 자동 정산<br>
                    정산일: 매월 14일 (구매확정 기준 7일 후)
                </p>
                
                <div class="policy-notice mb-4">
                    <p class="text-sm"><strong>💡 예시:</strong> 100,000원 상품 판매 시<br>
                    - 기본 수수료 5.5%: -5,500원<br>
                    - PG 수수료 3.0%: -3,000원<br>
                    - 정산 금액: 91,500원</p>
                </div>
            `
        },
        grade: {
            title: '회원 등급 정책 (POLICY-004)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-004</li>
                    <li>버전: v1.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">🌱 소비자 등급 (5단계)</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>등급</th>
                                <th>조건</th>
                                <th>혜택</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>새싹 🌱</td>
                                <td>신규 회원</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>새순 🌿</td>
                                <td>3회 이상 구매</td>
                                <td>적립금 1%</td>
                            </tr>
                            <tr>
                                <td>잎새 🍀</td>
                                <td>10회 이상, 총 50만원 이상</td>
                                <td>적립금 2%, 무료배송 쿠폰</td>
                            </tr>
                            <tr>
                                <td>열매 🍎</td>
                                <td>30회 이상, 총 200만원 이상</td>
                                <td>적립금 3%, 생일 쿠폰</td>
                            </tr>
                            <tr>
                                <td>농부 친구 👨‍🌾</td>
                                <td>100회 이상, 총 1000만원 이상</td>
                                <td>적립금 5%, VIP 전용 상담</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h3 class="text-lg font-bold mb-3">🌾 판매자 등급 (4단계)</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>등급</th>
                                <th>조건</th>
                                <th>혜택</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>초보 농부 🌱</td>
                                <td>인증 후 0~6개월</td>
                                <td>수수료 4.5%</td>
                            </tr>
                            <tr>
                                <td>일반 농부 🌾</td>
                                <td>6개월 이상, 월 1천만원 미만</td>
                                <td>수수료 5.5%</td>
                            </tr>
                            <tr>
                                <td>우수 농부 ⭐</td>
                                <td>월 1천만원 이상, 품질 점수 4.5+</td>
                                <td>수수료 5.0%, 마케팅 지원</td>
                            </tr>
                            <tr>
                                <td>명인 농부 👑</td>
                                <td>월 5천만원 이상, 품질 점수 4.8+</td>
                                <td>수수료 4.5%, 전담 매니저</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="policy-notice mb-4">
                    <p class="text-sm"><strong>💡 알림:</strong> 등급은 매월 1일 자동으로 갱신됩니다.</p>
                </div>
            `
        },
        dispute: {
            title: '분쟁 해결 정책 (POLICY-005)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-005</li>
                    <li>버전: v1.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">⚖️ 3단계 분쟁 해결 절차</h3>
                <ol class="list-decimal list-inside text-sm text-gray-700 mb-6">
                    <li><strong>1차 판단:</strong> CS팀이 증빙 자료 검토 후 24~72시간 내 판단</li>
                    <li><strong>이의 제기:</strong> 1차 판단 불만족 시 3~5일 내 운영팀 재검토</li>
                    <li><strong>위원회 회부:</strong> 최종 판단이 필요한 경우 분쟁조정위원회 심의</li>
                </ol>
                
                <h3 class="text-lg font-bold mb-3">⚡ 처리 시한 (SLA)</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>분쟁 유형</th>
                                <th>처리 시한</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>긴급 (부패/안전)</td>
                                <td>1시간 (신고) → 12시간 (1차 판단)</td>
                            </tr>
                            <tr>
                                <td>일반 (배송 지연 등)</td>
                                <td>24시간 (신고) → 72시간 (1차 판단)</td>
                            </tr>
                            <tr>
                                <td>복잡 (법적 이슈)</td>
                                <td>7영업일 (위원회 회부)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="policy-notice policy-notice-warning mb-4">
                    <h4 class="font-bold mb-2">⏰ SLA 초과 시 자동 보상</h4>
                    <ul class="list-disc list-inside text-sm">
                        <li>1시간 초과: 1,000원 쿠폰</li>
                        <li>12시간 초과: 3,000원 쿠폰</li>
                        <li>24시간 초과: 5,000원 쿠폰</li>
                    </ul>
                </div>
                
                <h3 class="text-lg font-bold mb-3">📸 증빙 제출 의무</h3>
                <ul class="list-disc list-inside text-sm text-gray-700">
                    <li><strong>소비자:</strong> 배송 완료 후 24시간 이내 사진 증빙 제출 필수</li>
                    <li><strong>판매자:</strong> 신고 접수 후 24시간 이내 출고 사진 및 소명 제출 필수</li>
                    <li>증빙 미제출 시 상대방 주장 인정</li>
                </ul>
            `
        },
        sanction: {
            title: '승인/제재 기준 (POLICY-006)',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 문서 정보</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>문서번호: POLICY-006</li>
                    <li>버전: v1.0</li>
                    <li>최종 업데이트: 2026-01-15</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">🚨 제재 유형 (4단계)</h3>
                <div class="policy-table-container mb-6">
                    <table class="policy-table text-sm">
                        <thead>
                            <tr>
                                <th>제재 유형</th>
                                <th>적용 사유</th>
                                <th>효과</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>경고</td>
                                <td>경미한 위반 (배송 지연 3회)</td>
                                <td>누적 3회 시 판매 중지</td>
                            </tr>
                            <tr>
                                <td>판매 중지</td>
                                <td>중대 위반 (원산지 오표기)</td>
                                <td>7~30일 판매 불가</td>
                            </tr>
                            <tr>
                                <td>계정 정지</td>
                                <td>심각 위반 (반복된 상품 하자)</td>
                                <td>90일 활동 불가</td>
                            </tr>
                            <tr>
                                <td>영구 정지</td>
                                <td>악의적 위반 (원산지 허위 표시)</td>
                                <td>영구 퇴출 + 법적 조치</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h3 class="text-lg font-bold mb-3">⚖️ 누적 제재 기준</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>경고 3회 → 7일 판매 중지</li>
                    <li>판매 중지 2회 → 계정 정지</li>
                    <li>계정 정지 2회 → 영구 정지</li>
                    <li>경고는 6개월 후 자동 삭제 (무위반 시)</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">🔄 복권 신청</h3>
                <p class="text-sm text-gray-700 mb-4">
                    판매 중지/계정 정지 해제 후 6개월 무위반 시 복권 신청 가능<br>
                    복권 승인 시 제재 이력 삭제
                </p>
                
                <div class="policy-notice policy-notice-error mb-4">
                    <h4 class="font-bold mb-2">🚫 즉시 영구 정지 사유</h4>
                    <ul class="list-disc list-inside text-sm">
                        <li>원산지 허위 표시</li>
                        <li>유통기한 조작</li>
                        <li>인증서 위조</li>
                        <li>소비자 협박/폭언</li>
                    </ul>
                </div>
            `
        },
        privacy: {
            title: '개인정보 제3자 제공 동의',
            content: `
                <h3 class="text-lg font-bold mb-3">📋 제공 목적</h3>
                <p class="text-sm text-gray-700 mb-4">
                    상품 배송 및 주문/배송 조회를 위해 판매자에게 개인정보를 제공합니다.
                </p>
                
                <h3 class="text-lg font-bold mb-3">📦 제공 항목</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 mb-6">
                    <li>수령인 이름, 전화번호</li>
                    <li>배송지 주소</li>
                    <li>주문 상품 정보</li>
                </ul>
                
                <h3 class="text-lg font-bold mb-3">⏰ 보유 기간</h3>
                <p class="text-sm text-gray-700">
                    배송 완료 후 5년 (전자상거래법)
                </p>
            `
        }
    };

    const policy = policies[policyType];
    if (!policy) return;

    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="text-xl font-bold">${policy.title}</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    ${policy.content}
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-container').innerHTML = modalHTML;
    document.body.style.overflow = 'hidden';
}

// ==========================================
// 필터링 및 정렬
// ==========================================

function filterCategory(category) {
    if (category === '특가' || category === '기획전') {
        renderProducts(products.filter(p => p.isNew || p.organic));
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }

    // 스크롤 이동
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function sortProducts(sortType) {
    let sorted = [...products];

    switch (sortType) {
        case 'popular':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
            sorted.sort((a, b) => b.isNew - a.isNew);
            break;
        case 'low-price':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'high-price':
            sorted.sort((a, b) => b.price - a.price);
            break;
    }

    renderProducts(sorted);
}

// ==========================================
// UI 유틸리티
// ==========================================

function closeModal(event) {
    if (event && event.target.className !== 'modal-overlay') return;

    document.getElementById('modal-container').innerHTML = '';
    document.body.style.overflow = 'auto';
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `message-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.success}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('✅ 어디산 JavaScript가 로드되었습니다.');
