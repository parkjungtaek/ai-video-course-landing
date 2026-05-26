# AI 영상 교육과정 랜딩 페이지

생성형 AI 영상 제작 입문 과정 랜딩페이지의 정적 HTML/CSS 베이스.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

## 빌드 / 배포

```bash
npm run build      # → dist/ 폴더 생성
npm run preview    # 빌드 결과 로컬 확인
```

`dist/` 폴더 통째로 Netlify · Vercel · Cloudflare Pages 등에 드래그앤드롭.

## 프로젝트 구조

```
bolt-ready/
├── index.html      # 페이지 마크업 (Hero · AI 쇼케이스 · Features · CTA · Footer)
├── styles.css      # 모든 스타일 (디자인 토큰 + 컴포넌트 + 반응형)
├── package.json    # Vite dev/build 스크립트
└── README.md
```

## 콘텐츠 슬롯 시스템

`index.html` 의 `data-slot="..."` 속성이 있는 곳이 미디어 슬롯입니다.
영상은 Cloudinary 같은 CDN URL을 `<source>` 태그에 넣고,
이미지는 `<img src="...">` 에 넣으면 됩니다.

### 우선순위 슬롯 (먼저 채우면 페이지 90% 완성)

| slot | 타입 | 비율 | 길이 |
|---|---|---|---|
| `bento-hero-center` | video | 3:4 | 5s loop |
| `phone-center` | video | 9:16 | 5s loop |
| `bento-interface` | video | 9:16 | 3s loop |
| `phone-left` | video | 9:16 | 4s loop |
| `phone-right` | video | 9:16 | 4s loop |

### 보조 슬롯

| slot | 타입 | 비율 |
|---|---|---|
| `bento-flowers` | video | 1:1 |
| `bento-avatar-1`..`-6` | image | 1:1 |
| `bento-portrait-a`..`-d` | image | 3:4 |
| `profile-avatar` | image | 1:1 |
| `profile-thumb-1`,`-2` | image | 3:4 |

## 미디어 URL 갈아 끼우는 법

### 영상
HTML에서 해당 `<video>` 태그를 찾아 주석 처리된 `<source>` 2줄의 주석을 풀고
`CLOUD` 와 `SLUG` 부분만 본인 값으로 교체:

```html
<video class="slot-media" data-slot="bento-hero-center" loop muted autoplay playsinline>
  <source src="https://res.cloudinary.com/your-cloud/video/upload/q_auto,f_webm/hero.webm" type="video/webm">
  <source src="https://res.cloudinary.com/your-cloud/video/upload/q_auto,f_mp4/hero.mp4" type="video/mp4">
</video>
```

### 이미지
`<img class="slot-media" data-slot="..." />` 의 `src` 속성에 URL 작성:

```html
<img class="slot-media" data-slot="bento-avatar-1" src="https://res.cloudinary.com/your-cloud/image/upload/q_auto,f_auto/avatar-1.jpg" alt="" />
```

## 미디어 미준비 상태에서도 OK

src 가 비어 있어도 CSS 그라데이션 폴백이 보여서 디자인 깨지지 않음.
하나씩 채워가며 점진적으로 완성 가능.

## Bolt 사용 팁

- WebContainer 환경이라 `npm install` 만으로 Vite dev 서버 즉시 실행.
- 정적 파일(영상·이미지)은 프로젝트에 번들하지 말고 **반드시 Cloudinary 등 CDN URL 참조**. 그렇지 않으면 프로젝트 크기 제한 초과.
- 배포: Bolt 내 "Deploy" 버튼으로 Netlify 즉시 연결 가능.
