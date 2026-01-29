# 🌾 어디산 - 농산물 직거래 플랫폼

**생산자와 소비자를 직접 연결하는 투명하고 안전한 농산물 직거래 플랫폼**

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [정책 기반 운영](#-정책-기반-운영)
- [시작하기](#-시작하기)
- [배포](#-배포)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 개요

**어디산**은 생산자와 소비자를 중간 유통 단계 없이 직접 연결하는 농산물 직거래 플랫폼입니다.

### 핵심 가치
- 🌱 **투명성**: 모든 생산자는 2단계 인증을 거쳐 안전성 보장
- 💰 **합리적 가격**: 중간 유통 마진을 제거하여 생산자와 소비자 모두 이익
- 📜 **정책 기반 운영**: 8개의 명확한 정책으로 분쟁과 제재를 투명하게 관리
- ✅ **품질 보증**: GAP/유기농 인증 생산자 우대 및 등급 시스템 운영

### 비전
> "우리 농부의 정성이 당신의 식탁으로, 중간 마진 없이 신선하게!"

---

## ✨ 주요 기능

### 1️⃣ 소비자 기능
- ✅ **상품 탐색**: 8개 카테고리별 신선한 농산물 검색
- ✅ **상세 정보**: 원산지 표시, 생산자 인증 정보, 농산물 특성 고지
- ✅ **장바구니 & 주문**: 30,000원 이상 무료배송
- ✅ **회원 등급**: 5단계 등급별 혜택 (새싹 → 농부 친구)
- ✅ **환불/취소**: 배송 완료 후 7일 이내 환불 가능 (농산물 특성 고려)
- ✅ **분쟁 해결**: 3단계 분쟁 해결 시스템 (SLA 보장)

### 2️⃣ 판매자 기능 (미구현, 향후 추가 예정)
- 생산자 인증 신청 (2단계 심사)
- 상품 등록 및 관리 (원산지 표시 필수)
- 주문/배송 관리
- 정산 내역 조회 (수수료 4.5~5.5%)
- 클레임 대응 (24시간 이내 증빙 제출 의무)

### 3️⃣ 정책 준수 기능
- ⚠️ **농산물 특성 고지**: 구매 전 필수 체크박스 (POLICY-002)
- 📍 **원산지 표시**: 모든 상품에 필수 표시
- ✅ **생산자 인증 마크**: 인증된 생산자만 판매 가능
- 🏆 **등급 시스템**: 소비자/판매자 5단계 등급 자동 관리
- ⚖️ **분쟁 해결**: AI 자동 분류 → CS팀 판단 → 위원회 회부

---

## 🛠 기술 스택

### Frontend
- **HTML5** - 시맨틱 마크업
- **CSS3** - 커스텀 스타일 + 반응형 디자인
- **Tailwind CSS** - 빠른 UI 개발
- **JavaScript (ES6+)** - 순수 JavaScript (프레임워크 없음)
- **Font Awesome** - 아이콘
- **Google Fonts (Noto Sans KR)** - 한글 폰트

### 이미지 생성
- **nano-banana-pro** - AI 기반 농산물 이미지 생성
  - 히어로 이미지: 농장 마켓플레이스 장면
  - 상품 이미지: 8종 농산물 (상추, 사과, 쌀, 토마토, 감귤, 버섯, 닭고기, 꿀)

### 데이터 관리
- **LocalStorage** - 장바구니 데이터 저장
- **목업 데이터** - 상품/생산자 데이터 (향후 RESTful Table API 연동 예정)

### 호스팅
- **정적 웹사이트** - GitHub Pages / Netlify / Vercel 배포 가능

---

## 📂 프로젝트 구조

```
어디산/
├── index.html              # 메인 랜딩 페이지 (브랜드 소개)
├── products.html           # 상품몰 페이지 (필터/정렬/그리드)
├── product-detail.html     # 상품 상세 페이지 (구매 프로세스)
├── about.html              # 어디산 소개 페이지 (브랜드 스토리)
├── css/
│   └── style.css          # 커스텀 스타일
├── js/
│   ├── main.js            # 메인 JavaScript (홈페이지용)
│   ├── products.js        # 상품몰 JavaScript (필터/정렬)
│   └── product-detail.js  # 상품 상세 JavaScript (장바구니/구매)
├── images/
│   ├── logo.png           # 어디산 로고 (산+새싹+텍스트)
│   ├── favicon.png        # 파비콘 (사각형 아이콘)
│   └── logo-full.png      # 구 로고 (삭제 예정)
└── README.md              # 프로젝트 문서 (현재 파일)
```

### 파일 설명

### 구현된 페이지

#### `index.html` (랜딩 페이지)
- 반응형 네비게이션 바 (오늘의 농산물/산지 스토리 링크)
- 히어로 섹션 (AI 생성 이미지)
- 카테고리 바로가기 (8개)
- 상품 그리드 (클릭 시 product-detail.html로 이동)
- 플랫폼 소개 섹션
- 우수 생산자 섹션
- 농산물 특성 안내 (POLICY-002 연계)
- 푸터 (정책 링크 포함)

#### `products.html` (상품몰 페이지)
- **필터링 시스템**: 지역(전체/강원/충청/경상/전라/제주), 재배방식(전체/유기농/무농약/친환경), 카테고리(8종), 가격대
- **정렬 기능**: 최신순/인기순/가격 낮은순/높은순/리뷰 많은순
- **상품 그리드**: 8개 상품 카드 (이미지, 가격, 원산지, 인증 배지, 별점)
- **페이지네이션**: 미구현 (향후 추가)
- **반응형**: 모바일/태블릿/데스크탑 최적화

#### `product-detail.html` (상품 상세 페이지)
- **이미지 갤러리**: 메인 이미지 + 썸네일 (4장)
- **상품 정보**: 가격/할인/배송비/원산지 필수 표시
- **인증 정보**: 생산자 인증 마크, 인증 날짜 표시
- **수량 선택**: +/- 버튼, 총 금액 자동 계산
- **구매 옵션**: 장바구니 담기 / 바로 구매
- **탭 메뉴** (5개):
  1. 상품 설명 (상세 정보)
  2. 농가 정보 (농장명, 위치, 인증, 스토리)
  3. 리뷰 (별점, 후기)
  4. 농산물 특성 고지 (POLICY-002 연계)
  5. 환불/교환 정책 (POLICY-002 연계)
- **관련 상품**: 같은 농가의 다른 상품
- **토스트 알림**: 장바구니 담기 완료 시 표시

#### `css/style.css` (370줄)
- 상품 카드 호버 효과
- 모달 애니메이션 (fadeIn, slideUp)
- 정책 안내 박스 스타일 (notice, warning, error)
- 버튼 스타일 (primary, secondary, disabled)
- 반응형 미디어 쿼리 (모바일 최적화)
- 접근성 지원 (focus styles, sr-only)

#### `js/main.js` (홈페이지용)
- **데이터 관리**: 상품 8종, 생산자 3명 목업 데이터
- **렌더링**: 상품 카드, 생산자 카드, 별점 시스템
- **장바구니**: 추가/삭제/수량 변경, LocalStorage 저장
- **모달 시스템**: 상품 상세, 장바구니, 주문/결제, 마이페이지, 정책 뷰어
- **정책 연동**: 6개 정책 문서 HTML 렌더링 (POLICY-001~006)
- **필터링/정렬**: 카테고리별, 인기순/가격순 정렬
- **토스트 알림**: 성공/에러/정보 메시지
- **페이지 이동**: 상품 클릭 시 product-detail.html로 이동

#### `js/products.js` (상품몰 페이지용)
- **필터링 로직**: 지역/재배방식/카테고리/가격대 동시 적용
- **정렬 기능**: 5가지 정렬 옵션 (최신/인기/가격/리뷰)
- **상품 렌더링**: 필터링된 상품 그리드 표시
- **URL 파라미터**: 필터 상태 유지 (새로고침 시에도 유지)
- **반응형 그리드**: 1/2/4열 자동 조정

#### `js/product-detail.js` (상품 상세 페이지용)
- **URL 파라미터 파싱**: ?id=1 형태로 상품 ID 전달
- **상품 데이터 로드**: products 데이터에서 해당 상품 정보 로드
- **이미지 갤러리**: 썸네일 클릭 시 메인 이미지 변경
- **수량 선택**: +/- 버튼으로 수량 변경, 총 금액 자동 계산
- **장바구니**: 장바구니 담기 → LocalStorage 저장 → cart.html로 이동 (향후)
- **바로 구매**: 바로 구매 → checkout.html로 이동 (향후)
- **탭 전환**: 5개 탭(상품 설명/농가 정보/리뷰/특성 고지/환불 정책) 전환
- **관련 상품**: 같은 농가의 다른 상품 표시
- **토스트 알림**: 장바구니 담기 완료 시 3초간 표시

#### `about.html` (어디산 소개 페이지)
- **히어로 섹션**: 브랜드 슬로건 및 CTA 버튼
- **브랜드 스토리**:
  - 브랜드 의미 ("어디서 나왔나?")
  - 로고 의미 (산/새싹/흙)
  - 브랜드 톤 (명확함/신선함/로컬 정체성)
  - 타깃 고객 (20~50대)
- **핵심 가치**: 투명성/합리적 가격/품질 보증/신뢰 구축 (4개 카드)
- **작동 방식**: 3단계 프로세스 (생산자 인증 → 직거래 주문 → 신선 배송)
- **성과 통계**: 인증 생산자/월간 주문/고객 만족도/평균 리뷰 (4개 지표)
- **정책 소개**: 8개 정책 카드 (생산자 인증/환불/수수료/등급/분쟁/제재)
- **비전 섹션**: 브랜드 비전 및 3가지 목표 (농부 지원/소비자 만족/지속 가능성)
- **CTA 섹션**: 상품 둘러보기 / 산지 스토리 보기 버튼

---

## 📜 정책 기반 운영

로컬팜은 **8개의 명확한 정책**을 기반으로 투명하게 운영됩니다.

### 정책 문서 목록

| 정책 번호 | 정책명 | 주요 내용 | 연계 화면 |
|----------|--------|----------|----------|
| **POLICY-001** | 생산자 인증 정책 | 2단계 인증 (서류 심사 + 현장 확인), Fast Track 제도, 연 1회 재인증 | 상품 상세 (인증 마크) |
| **POLICY-002** | 환불/취소 & 배송 정책 | 환불 가능/불가 사유, 농산물 특성 고지 (±10% 허용), 7일 환불 보장 | 주문/결제 (약관 동의), 상품 상세 (농산물 특성 안내) |
| **POLICY-003** | 수수료 정책 | 기본 수수료 5.5%, 등급별 차등 (4.5~5.5%), GAP/유기농 -1.0%p 할인 | 정산 관련 (미구현) |
| **POLICY-004** | 회원/등급 정책 | 소비자 5등급 (새싹~농부 친구), 판매자 4등급 (초보~명인), 매월 자동 갱신 | 마이페이지 (등급 현황) |
| **POLICY-005** | 분쟁 해결 정책 | 3단계 분쟁 해결, SLA 보장 (1hr/12hr/24hr), 증빙 제출 의무 (24시간) | 환불 신청 (미구현) |
| **POLICY-006** | 승인/제재 기준 | 4단계 제재 (경고/판매 중지/계정 정지/영구 정지), 누적 제재 기준 | 상품 상세 (제재 이력 표시) |
| **POLICY-007** | 정보구조도(IA) | 3-Tier 구조 (소비자/판매자/백오피스), 화면-정책 매핑 | 전체 화면 구조 |
| **POLICY-008** | 백오피스 기능 명세 | 12개 모듈, 60개 화면, API 명세, 권한 관리 | 백오피스 (미구현) |

### 정책-기능 매핑

#### ✅ 구현 완료된 정책 연동
1. **POLICY-001 (생산자 인증)**
   - 상품 카드에 "✅ 인증된 생산자" 배지 표시
   - 상품 상세에 생산자 등급 표시 (초보/일반/우수/명인)

2. **POLICY-002 (환불/취소)**
   - 상품 상세에 "⚠️ 농산물 특성 안내" 패널 (펼치기)
   - 주문/결제 시 필수 약관 동의 체크박스
   - 정책 상세보기 모달 (환불 가능/불가 사유 명시)

3. **POLICY-003 (수수료)**
   - 정산 로직 주석 작성 (향후 백엔드 연동 시 사용)
   - 정책 모달에서 수수료 산정 기준 안내

4. **POLICY-004 (회원/등급)**
   - 마이페이지에 등급 현황 표시 (새싹 회원)
   - 생산자 카드에 등급 배지 표시 (🌱 🌾 ⭐ 👑)

5. **POLICY-005 (분쟁 해결)**
   - 정책 모달에서 3단계 분쟁 해결 절차 안내
   - SLA 기준 및 자동 보상 정책 명시

6. **POLICY-006 (승인/제재)**
   - 정책 모달에서 4단계 제재 기준 안내
   - 즉시 영구 정지 사유 명시 (원산지 허위 등)

#### 🚧 향후 구현 예정
- 판매자 앱 (상품 등록, 주문 관리, 정산 조회)
- 백오피스 (생산자 인증 심사, 분쟁 처리, 제재 관리)
- RESTful Table API 연동 (데이터베이스 저장)
- 실시간 알림 시스템
- 결제 API 연동 (PG사)

---

## 🚀 시작하기

### 필수 조건
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 인터넷 연결 (CDN 라이브러리 로드를 위해)

### 로컬 실행

1. **프로젝트 다운로드**
   ```bash
   # Git Clone (예시)
   git clone https://github.com/your-repo/localfarm.git
   cd localfarm
   ```

2. **로컬 서버 실행**
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (http-server)
   npx http-server -p 8000

   # VS Code Live Server 확장 프로그램 사용
   ```

3. **브라우저에서 열기**
   ```
   http://localhost:8000
   ```

### 기능 테스트

#### 1. 상품 탐색
1. 홈페이지 접속
2. 카테고리 버튼 클릭 (채소/과일/곡물 등)
3. 상품 카드 클릭 → 상품 상세 모달 확인
4. "⚠️ 농산물 특성 안내" 펼쳐보기 클릭

#### 2. 장바구니
1. 상품 카드에서 "장바구니 담기" 클릭
2. 우측 상단 장바구니 아이콘 (숫자 확인)
3. 장바구니 아이콘 클릭 → 장바구니 모달 확인
4. 수량 변경 / 삭제 / 주문하기 버튼 테스트

#### 3. 주문/결제
1. 장바구니에서 "주문하기" 클릭
2. 필수 약관 동의 체크박스 확인
3. "[상세보기]" 링크 클릭 → 정책 모달 확인
4. 모든 체크 후 "결제하기" 클릭 → 성공 토스트

#### 4. 정책 확인
1. 푸터의 "정책" 섹션 클릭
2. 6개 정책 문서 확인 (POLICY-001~006)
3. 각 정책의 표/리스트 형식 확인

#### 5. 마이페이지
1. 우측 상단 "마이페이지" 클릭
2. 회원 등급 확인 (새싹 회원)
3. "이용약관 및 정책" → 정책 메뉴 확인

---

## 📊 현재 구현 상태

### ✅ 완료된 기능 (v1.0)
- [x] 반응형 네비게이션 바 (데스크탑/모바일)
- [x] 히어로 섹션 (AI 생성 이미지)
- [x] 카테고리 필터링 (8개)
- [x] 상품 목록 렌더링 (8종 목업)
- [x] 상품 상세 모달
  - [x] 실제 이미지 표시 (AI 생성)
  - [x] 원산지 표시 (필수)
  - [x] 생산자 정보 카드 (등급/인증 마크)
  - [x] 농산물 특성 안내 (POLICY-002 연계)
  - [x] 수량 선택 / 총 금액 계산
- [x] 장바구니 시스템
  - [x] 추가/삭제/수량 변경
  - [x] LocalStorage 저장
  - [x] 배송비 계산 (30,000원 이상 무료)
- [x] 주문/결제 모달
  - [x] 필수 약관 동의 체크박스
  - [x] 정책 상세보기 링크
- [x] 마이페이지 모달
  - [x] 회원 등급 표시
  - [x] 메뉴 리스트 (개발 중 안내)
- [x] 정책 뷰어 모달
  - [x] 6개 정책 HTML 렌더링
  - [x] 표/리스트 형식 스타일링
- [x] 토스트 알림 시스템
- [x] 우수 생산자 섹션 (3명 목업)
- [x] 정렬 기능 (인기순/가격순/신상품순)

### 🚧 미구현 기능 (향후 버전)
- [ ] 검색 기능 (상품명/생산자명)
- [ ] 찜하기 (위시리스트)
- [ ] 리뷰 작성/조회
- [ ] 실제 결제 API 연동
- [ ] 판매자 앱 전체
- [ ] 백오피스 전체
- [ ] RESTful Table API 연동
- [ ] 실시간 알림 (WebSocket)
- [ ] 회원가입/로그인 (OAuth)

---

## 🎨 디자인 시스템

### 컬러 팔레트
```css
primary: #10b981 (Emerald Green) - 주요 액션
secondary: #059669 (Dark Emerald) - 호버 상태
accent: #fbbf24 (Amber Yellow) - 강조/배지
gray-50 ~ gray-800 - 텍스트/배경
```

### 타이포그래피
- **폰트**: Noto Sans KR (300, 400, 500, 600, 700)
- **제목**: 32px (bold), 24px (semibold)
- **본문**: 16px (regular)
- **캡션**: 14px / 12px (regular)

### 간격 시스템
- **컨테이너**: max-width: 1280px (7xl)
- **패딩**: 16px (모바일), 24px (태블릿), 32px (데스크탑)
- **간격**: 4px ~ 64px (Tailwind 스케일)

### 아이콘
- **Font Awesome 6.4.0**
- 주요 아이콘: fa-leaf (로고), fa-shopping-cart (장바구니), fa-user-check (인증), fa-map-marker-alt (원산지)

---

## 📱 반응형 디자인

### 브레이크포인트
- **모바일**: < 768px
- **태블릿**: 768px ~ 1024px
- **데스크탑**: > 1024px

### 모바일 최적화
- 햄버거 메뉴 (모바일 네비게이션)
- 상품 그리드: 1열 (모바일) → 2열 (태블릿) → 4열 (데스크탑)
- 모달 높이: 95vh (모바일), 90vh (데스크탑)
- 터치 친화적 버튼 크기 (최소 44px)

---

## 🔒 보안 및 개인정보

### 현재 구현 (정적 웹사이트)
- LocalStorage만 사용 (민감 정보 저장 안 함)
- 외부 CDN (HTTPS)
- XSS 방지 (innerHTML 대신 textContent 사용 권장)

### 향후 구현 예정
- HTTPS 강제 (Let's Encrypt)
- JWT 토큰 기반 인증
- 개인정보 암호화 (AES-256)
- CSRF 토큰
- Rate Limiting
- SQL Injection 방지 (Parameterized Query)

---

## 🧪 테스트

### 브라우저 호환성 테스트
| 브라우저 | 버전 | 상태 |
|---------|------|------|
| Chrome | 90+ | ✅ 지원 |
| Firefox | 88+ | ✅ 지원 |
| Safari | 14+ | ✅ 지원 |
| Edge | 90+ | ✅ 지원 |
| IE 11 | - | ❌ 미지원 |

### 모바일 테스트
- iOS Safari: ✅ 지원
- Android Chrome: ✅ 지원
- 반응형 디자인: ✅ 확인됨

### 성능 테스트
- Lighthouse 점수 (예상)
  - Performance: 95+
  - Accessibility: 90+
  - Best Practices: 95+
  - SEO: 100

---

## 📦 배포

### GitHub Pages (권장)
```bash
1. GitHub Repository 생성
2. Settings → Pages → Source: main branch
3. 자동 배포 완료 (https://username.github.io/localfarm)
```

### Netlify
```bash
1. Netlify에 GitHub 계정 연결
2. New site from Git → Repository 선택
3. Build settings: (없음, 정적 사이트)
4. Publish directory: / (루트)
5. Deploy
```

### Vercel
```bash
1. Vercel에 GitHub 계정 연결
2. Import Project → Repository 선택
3. Framework Preset: Other
4. Deploy
```

### 커스텀 도메인 연결
```
1. DNS 설정
   - A 레코드: GitHub Pages/Netlify/Vercel IP
   - CNAME 레코드: www → username.github.io

2. SSL 인증서: 자동 발급 (Let's Encrypt)
```

---

## 🤝 기여하기

### 이슈 제보
- [GitHub Issues](https://github.com/your-repo/issues)에서 버그/기능 요청 제출

### Pull Request
1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

### 코딩 컨벤션
- HTML: 들여쓰기 4칸
- CSS: BEM 네이밍 (Block__Element--Modifier)
- JavaScript: ESLint (Airbnb 스타일)
- Commit: Conventional Commits (feat/fix/docs/style/refactor)

---

## 📄 라이선스

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다.

```
MIT License

Copyright (c) 2026 로컬팜 (LocalFarm)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 문의

- **이메일**: support@eodisan.com
- **GitHub**: [https://github.com/your-repo/eodisan](https://github.com/your-repo/eodisan)
- **웹사이트**: [https://eodisan.com](https://eodisan.com) (예시)

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 라이브러리를 사용합니다:
- [Tailwind CSS](https://tailwindcss.com/) - MIT License
- [Font Awesome](https://fontawesome.com/) - Free License
- [Google Fonts](https://fonts.google.com/) - Open Font License

AI 이미지 생성:
- [Genspark nano-banana-pro](https://www.genspark.ai/) - AI 기반 이미지 생성

로고 디자인:
- "어디산" 브랜드 로고 (산 + 새싹) - 투명성과 신선함 상징

---

## 🌱 브랜드 스토리

### 어디산이란?
**"어디서 나왔나?"** - 농산물의 출처를 명확히 하는 투명한 플랫폼

- **컨셉**: 농산물의 출처 투명성 강조
- **의미**: "어디산(어디서 생산된)" + "산(山)" = 자연과 신뢰
- **타겟**: 20~50대 보편적 소비자
- **브랜드톤**: 명확함, 신선함, 로컬 정체성

### 로고 의미
- **산 모양**: 자연 친화적 농업, 안정감
- **새싹**: 성장, 신선함, 희망
- **녹색/갈색**: 자연, 흙, 유기농

---

## 📚 참고 자료

### 정책 문서
업로드된 9개 정책 문서를 기반으로 제작되었습니다:
1. POLICY-001: 생산자 인증 정책 v2.0
2. POLICY-002: 환불/취소 & 배송 정책
3. POLICY-003: 수수료 정책
4. POLICY-004: 회원/등급 정책
5. POLICY-005: 분쟁 해결 정책
6. POLICY-006: 승인/제재 매트릭스
7. POLICY-007: 정보구조도(IA) & 화면 매핑
8. POLICY-008: 백오피스 기능 명세
9. SETTLEMENT-LOGIC-001: 정산 로직 상세 명세

### 관련 법령
- 전자상거래 등에서의 소비자보호에 관한 법률
- 농수산물의 원산지 표시에 관한 법률
- 개인정보 보호법
- 전기통신사업법

---

## 🎉 버전 히스토리

### v1.0.0 (2026-01-22)
- ✅ 초기 릴리스 - "어디산" 브랜드 런칭
- ✅ 소비자 앱 핵심 기능 구현
- ✅ 9개 정책 문서 연동
- ✅ AI 생성 이미지 (9장) 적용
- ✅ 브랜드 로고 적용 (메인 로고 + 파비콘)
- ✅ 반응형 디자인 완성
- ✅ 장바구니 & 주문/결제 플로우

### 향후 로드맵
- **v1.1** (2026-02): 검색 기능, 찜하기, 리뷰 시스템
- **v1.2** (2026-03): 판매자 앱 Beta 출시
- **v2.0** (2026-04): 백오피스 출시, RESTful Table API 연동
- **v2.1** (2026-05): 실시간 알림, 결제 API 연동
- **v3.0** (2026-06): AI 분쟁 해결 시스템, 실시간 배송 추적

---

**Made with 💚 by 어디산 팀**

> "어디서 나왔나? 투명하게 보여드립니다!" 🌱
