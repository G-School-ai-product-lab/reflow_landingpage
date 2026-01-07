# ToneFlow Yuri Reach - 랜딩 페이지

ToneFlow Yuri Reach 앱을 위한 현대적이고 성능 최적화된 랜딩 페이지입니다.

## 주요 특징

### 🎨 디자인
- **현대적인 그라데이션 디자인**: 보라색 계열의 세련된 그라데이션
- **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 모든 기기에서 완벽하게 작동
- **부드러운 애니메이션**: Intersection Observer를 활용한 스크롤 애니메이션
- **직관적인 UX**: 사용자 친화적인 네비게이션과 CTA

### ⚡ 성능 최적화
- **경량 코드베이스**: 외부 프레임워크 없이 순수 HTML/CSS/JS로 구현
- **최적화된 애니메이션**: RequestAnimationFrame을 활용한 60fps 애니메이션
- **Lazy Loading**: 이미지 지연 로딩으로 초기 로딩 속도 개선
- **Intersection Observer**: 효율적인 스크롤 이벤트 처리
- **Debounced Events**: 리사이즈 이벤트 최적화
- **CSS 최적화**: CSS Grid와 Flexbox를 활용한 효율적인 레이아웃

### ♿ 접근성
- **시맨틱 HTML**: 스크린 리더 친화적인 구조
- **키보드 네비게이션**: 전체 페이지 키보드로 제어 가능
- **포커스 트랩**: 모바일 메뉴에서의 접근성 개선
- **Reduced Motion**: 사용자 설정에 따른 애니메이션 조절
- **ARIA 레이블**: 적절한 aria-label 속성 사용

### 📱 SEO & 공유
- **메타 태그**: 완벽한 SEO 메타 태그
- **Open Graph**: SNS 공유 최적화
- **Twitter Cards**: 트위터 공유 최적화
- **구조화된 데이터**: 검색엔진 최적화

## 파일 구조

```
landing-page/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
├── assets/             # 이미지 및 미디어 파일
│   ├── favicon.png     # (추가 필요) 파비콘
│   └── og-image.jpg    # (추가 필요) SNS 공유 이미지
└── README.md          # 이 파일
```

## 설치 및 사용

### 1. 이미지 준비
`assets/` 디렉토리에 다음 이미지를 추가하세요:

- **favicon.png**: 32x32 또는 64x64 픽셀의 PNG 파일
- **og-image.jpg**: 1200x630 픽셀의 JPG 파일 (SNS 공유용)

### 2. 로컬 개발 서버 실행

#### Python 사용 (권장)
```bash
# Python 3
cd landing-page
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

#### Node.js 사용
```bash
# http-server 설치 (한 번만)
npm install -g http-server

# 서버 실행
cd landing-page
http-server -p 8000

# 브라우저에서 http://localhost:8000 접속
```

#### VS Code Live Server 사용
1. VS Code에서 Live Server 확장 설치
2. `index.html`을 우클릭 > "Open with Live Server"

### 3. 배포

#### GitHub Pages
```bash
# GitHub Pages로 배포하려면 gh-pages 브랜치에 파일 푸시
git add .
git commit -m "Add landing page"
git subtree push --prefix landing-page origin gh-pages
```

#### Netlify
1. Netlify에 계정 생성
2. `landing-page` 폴더를 드래그 앤 드롭
3. 자동으로 배포됨

#### Vercel
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
cd landing-page
vercel
```

## 커스터마이징

### 색상 변경
`styles.css`의 CSS 변수를 수정하세요:

```css
:root {
    --primary: #667EEA;        /* 메인 컬러 */
    --secondary: #764BA2;      /* 보조 컬러 */
    --accent: #F093FB;         /* 강조 컬러 */
    /* ... */
}
```

### 콘텐츠 수정
`index.html`에서 텍스트와 내용을 직접 수정할 수 있습니다:

- **Hero Section**: 메인 타이틀과 설명
- **Features**: 주요 기능 (현재 6개)
- **How It Works**: 사용 방법 (3단계)
- **Benefits**: 앱의 장점
- **Download**: 다운로드 CTA

### 앱 스토어 링크 추가
`index.html`에서 다운로드 버튼의 `href`를 실제 앱 스토어 링크로 변경하세요:

```html
<a href="YOUR_APP_STORE_LINK" class="store-button">
    <!-- App Store -->
</a>
<a href="YOUR_GOOGLE_PLAY_LINK" class="store-button">
    <!-- Google Play -->
</a>
```

## 성능 최적화 팁

### 이미지 최적화
1. **포맷**: WebP 또는 최적화된 PNG/JPG 사용
2. **크기**: 실제 표시 크기의 2배 이하로 유지 (Retina 디스플레이 대응)
3. **압축**: TinyPNG, Squoosh 등의 도구 사용

### CSS 최적화
- 현재 CSS는 이미 최적화되어 있습니다
- 추가 최적화가 필요한 경우 CSS Minifier 사용

### JavaScript 최적화
- 현재 JS는 이미 최적화되어 있습니다
- 프로덕션 배포 시 UglifyJS나 Terser로 압축

### 폰트 최적화
- 현재 Google Fonts 사용 (Inter)
- 더 빠른 로딩이 필요한 경우 로컬 폰트로 교체 고려

## 브라우저 지원

- ✅ Chrome (최신 2개 버전)
- ✅ Firefox (최신 2개 버전)
- ✅ Safari (최신 2개 버전)
- ✅ Edge (최신 2개 버전)
- ✅ 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 성능 지표 목표

- **First Contentful Paint (FCP)**: < 1.8초
- **Largest Contentful Paint (LCP)**: < 2.5초
- **Time to Interactive (TTI)**: < 3.8초
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Grid, Flexbox, 애니메이션, 커스텀 속성
- **Vanilla JavaScript**: 프레임워크 없이 순수 JS
- **Google Fonts**: Inter 폰트

## 라이선스

이 랜딩 페이지는 ToneFlow Yuri Reach 프로젝트의 일부입니다.

## 문의

문제나 제안사항이 있으시면 이슈를 생성해주세요.
