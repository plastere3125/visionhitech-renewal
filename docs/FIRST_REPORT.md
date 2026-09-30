# VISION HITECH 영문 사이트 리뉴얼 — 착수 분석 보고 [01]~[18]

작성일: 2026-09-28 · 개정: 2026-09-30 (구조도 R1 — Zoom Modules 반영, [02]·[03] 및 문서 끝 [추가] 참조) · 근거 문서: `VISIONHITECH_CONTENT_INVENTORY.md`, `REFERENCE_ANALYSIS.md`, `ASSET_SOURCES.md`

---

## [01] 현재 VISION HITECH 웹사이트 분석

| 항목 | 확인 결과 |
|---|---|
| 플랫폼 | WordPress 7 + Divi 테마 + WooCommerce (공개 REST API 존재) |
| 구조 | Company / Products & Solutions / Supports / Marketing aids / Contact |
| 제품 | WooCommerce 86개 등록(1개는 "Coming soon" 빈 페이지 → 제외, **85개 사용**) + VMS 1종 |
| 제품 데이터 | 모델명, 부제, 하이라이트 스펙, 개요, Key/General/Special Features 존재. 다운로드(Datasheet/Manual/Drawing/F/W)는 **라벨만 있고 공개 파일 링크 없음** |
| 회사 정보 | 설립 1997, 주소·전화·팩스·이메일, 연혁 1997~2020, CEO 메시지, Mission/Vision/Core Values(영문) |
| 기술 | Ultra STARLUX, Color-Night, Smart IR, WDR, ROI, USRC, 발열·방수 SD·결로방지 등 7개 기술 페이지 |
| 품질 | ISO9001/14001, CE·FCC·UL·E-Mark·KC·TTA 언급, IP69K·IP68·진동 시험 설명 |
| 지원 | 보증정책(27/15/9개월 표 + DOA/RMA/수리기간), RMA 양식(xlsx), 다운로드 게시판 |
| 뉴스 | 3건, 모두 2020-06-03 |
| 디자인 문제 | 세리프 헤드라인 + 다크 블록 혼용, 제품 이미지 작게 노출, 정보 위계 약함, 2020년 이후 업데이트 없음 |

## [02] Website Structure Map 분석

PDF와 브리핑의 IA 일치(5개 대메뉴 / 31개 하위). 기존 사이트 대비 **신규 항목**: Solutions(AI Vision, Video Security, Transportation, Vision Marine), Support(Security Policy, FAQ, Tech Support, Marketing Materials), Media(Event, News Letter, Youtube, LinkedIn), Company(Organization) → 이 중 상당수는 기존 콘텐츠가 없음([04] 참조). 두 시안 모두 전체 IA를 헤더 메가메뉴·푸터에 반영.

**구조도 R1 (2026-09-30 반영)**: `Website Structure Map_Visionhitech_260928 R1.xlsx.pdf`에서 Products에 **Zoom Modules**가 DVR 다음 위치로 추가됨(노란색 표기, 유일한 변경). IA는 5개 대메뉴 / 32개 하위가 됨.

## [03] VISION HITECH 실제 콘텐츠 인벤토리 (요약)

- **제품 85 + 소프트웨어 1**: IP Camera 52 / NVR 3 / HD Analog 13 / DVR 3 / Software 1 / Accessory 14
- **Zoom Modules 1 (R1 추가)**: `VNP36D5VAR` — 기존 사이트 `VHT ZOOM MODULE` 카테고리의 유일한 제품. IP Camera에도 그대로 포함되므로 전체 86 모델은 변동 없음
- 회사: 설립 1997(Realtech → 2000년 사명 변경), 본사+공장 3곳 주소, R&D 센터 2003
- 기술 14종, 품질 시험 4종, 보증 정책 전문, 인증 문서 목록, VMS 패키지 비교표
- 전체 목록: `VISIONHITECH_CONTENT_INVENTORY.md` §1

## [04] 부족하거나 확인되지 않은 콘텐츠

| 영역 | 상태 |
|---|---|
| AI Vision | 전용 페이지 없음. 근거는 "서버 기반 영상분석 개발(2018)", CEO "딥러닝 AI 카메라 개발 중", PTZ "Intelligent Object based Motion Detection"뿐 → **AI 기능·정확도·지원모델 전부 Placeholder** |
| Transportation | 전용 페이지 없음. 근거: 인천공항 공급 시작(2018), E-Mark 차량인증 문서 2건, 10배 줌 카메라 적용 예시 |
| Vision Marine | 전용 페이지 없음. 근거: "세계 최초 엔진룸 카메라"(2018, 회사 주장), IP69K/IP68/선박 진동 시험 |
| Security Policy · FAQ · Tech Support · Event · Newsletter · Youtube · LinkedIn · Organization | 콘텐츠 없음 → Placeholder |
| 최신 회사 수치 | 직원 150 / 자본금 / 매출 $50M 표기 있으나 연도 불명 → **사용 안 함** |
| 불일치 | 대표번호(7800/7811), 보증기간(24개월 vs 27개월 표), USRC 절감률(80% vs 70%), 제품 표기 불일치 6건(모델코드·렌즈·설치환경) → 클라이언트 확인 필요 |

## [05] Milesight 적용 포인트
중요도에 따른 **이종 비율 Bento**, 카드 안에 실제 제품 노출, Products → Use case → Proof → Contact 흐름, 히어로 하단 제품 탭, 탭형 솔루션 탐색기. (통계 밴드·고객사례·IoT 범위는 미적용)

## [06] EdgeDX 적용 포인트
솔루션 페이지 **깊이 템플릿**: Context → 검증 근거 → System flow → 관련 제품 → 미확보 슬롯. EdgeDX의 AI 앱 기능(총기·헬멧 감지 등)은 **일절 사용하지 않음**.

## [07] Hanwha Vision 적용 포인트
한 화면 한 메시지의 스케일, 넉넉한 여백, 모델코드 제목 + 라이트그레이 제품 타일(비전하이텍 촬영 배경 #F1F2F3과 동일 → 이음새 없는 노출), Support/Contact 동등 배치, 메가 푸터.

## [08] DEEPX 적용 포인트
(Concept B 한정) 단일 광원 다크 섹션, 대형 문장 + 정밀한 보조 라인, 히어로에만 제한적 모션, 도메인별 탭 스토리. NPU/TOPS/반도체 표현 미사용.

## [09] Bettini Video 적용 포인트
모든 제품 카드·상세에 **View Product · Download · Product Inquiry**, 문의 버튼 클릭 시 해당 제품 자동 선택된 문의 드로어, Support를 기술 허브(문서/다운로드/보증/RMA/인증)로 구성.

## [10] Concept A — GLOBAL VISION TECHNOLOGY
하드웨어 중심·화이트 에디토리얼. Archivo(확장 폭) 타이포, 흑백 + 로고 오렌지 최소 사용, 실제 제품 대형 노출 + 검증 스펙 콜아웃, 절제된 리빌 모션.

## [11] Concept B — INTELLIGENT VISION SYSTEM
시스템 중심·딥네이비. IBM Plex Sans/Mono, 로고 렌즈 위 아크를 모티프로 한 신호선, **Capture → Video Data → Analysis → Security Response** 스크롤 스토리, 뷰파인더 브래킷 모티프는 최소 사용. 사이버펑크/대시보드 느낌 배제.

## [12] Concept A 홈 섹션 플랜 (구현 완료)
01 Header/Mega · 02 Hero(제품+스펙 콜아웃+4제품 탭) · 03 Vision/Technology Intro(팩트 4) · 04 Bento(7카드/5비율) · 05 Featured Products(탭+캐러셀) · 06 Imaging Technology(비교 슬라이더) · 07 Solutions(탭 탐색기) · 08 Why VISION HITECH · 09 News · 10 Support Gateway · 11 Inquiry CTA · 12 Footer

## [13] Concept B 홈 섹션 플랜 (구현 완료)
01 Header · 02 Hero(컷아웃 돔+ROI 데모 프레임+체인 티커) · 03 Camera→Vision→Intelligence(스티키 스토리) · 04 Technology Bento · 05 Product Ecosystem(인터랙티브 다이어그램) · 06 AI Vision(상태 + 예약 슬롯) · 07 Applications · 08 Transportation/Vision Marine · 09 Model Index · 10 Support/Download · 11 Media · 12 Contact(인라인 폼) · 13 Footer

## [14] Visual Asset Plan
1순위 제공 로고(원본 SVG 그대로) → 2순위 기존 사이트 제품사진 85장·공장/본사·기술 비교 이미지 → 3순위 Wikimedia Commons(CC0·CC BY, 크레딧 표기) 4장 → 4순위 Placeholder. 다크 시안용 제품 배경 제거는 **AI 없이 플러드필**로 다크 하우징 9종만 적용(화이트 하우징은 하이라이트 손상으로 제외).

## [15] Product UX Plan
카테고리(6)·시리즈·환경 필터, 검색, URL 해시 상태(`/products/#nvr`)로 공유 가능. 카드: 이미지·모델명·카테고리·설명 + View/Inquiry. 상세: 하이라이트, 개요, Key/Special/General 탭, **특징 문구 기반 기술 자동 연결**, 문서(요청형), 관련 제품, 출처 링크, 불일치 노트. 문의 드로어: Name/Company/Country/Email/Product/Message, 제품 자동선택, 제출 시 "Prototype only" 명시.

## [16] English-first / Japanese-later 아키텍처
UI(`src/concepts/*`)와 카피(`src/content/en/*`) 분리, `getContent(locale)` 단일 진입점, 제품 사실 데이터는 로케일 중립(`src/data`). JP는 `src/content/jp` 추가 + i18n 레지스트리 전환만으로 확장. 헤더 JP는 비활성 "Coming soon".

## [17] Implementation Architecture
Next.js 16 App Router + TypeScript + Tailwind 4, 정적 export. 공통: 콘텐츠·제품 데이터·문의·비교 슬라이더·로고·리빌. 컨셉별: 헤더/푸터/섹션/페이지/카드/토큰(.theme-a/.theme-b). 애니메이션 라이브러리 없이 CSS + IntersectionObserver.

## [18] GitHub Pages Deployment Plan
독립 저장소 `plastere3125/visionhitech-renewal`(홈 디렉터리 저장소와 분리) → GitHub Actions(typecheck·lint·build with basePath) → `actions/deploy-pages`. `basePath=/visionhitech-renewal`, `trailingSlash`, `images.unoptimized`, `.nojekyll`. 배포 후 전 경로 HTTP 200 실측.

---

## [추가] 구조도 R1 반영 — Zoom Modules (2026-09-30)

**변경 요청**: 클라이언트 구조도 R1에서 Products › Zoom Modules 추가. 시안 URL과 A/B 컨셉은 변경하지 않고 기존 시안 위에서 수정.

**기존 홈페이지 확인 결과**
- 영문 사이트에 `VHT ZOOM MODULE` 카테고리 존재(메뉴 미노출). 등록 제품은 `VNP36D5VAR`(2MP IP IR PTZ camera, 36x) 1종, 카테고리 설명문 없음.
- 제품 85종 상세 본문에 "module" 언급 0건. 독립 줌 모듈(블록 카메라) 제품은 영문·국문 사이트 어디에도 없음.
- 제품 외 언급: 연혁(2019-05 AF zoom module 기술 확보), Warranty(Zoom Module 9개월), Smart hardware technologies(AF zoom).

**시안 반영 내용**

| 위치 | 시안 A | 시안 B |
|---|---|---|
| 메가메뉴 | DVR 다음 `05 Zoom Modules` | `PR-05 Zoom Modules` |
| 제품 목록 | 카테고리 타일 6 → 7 | 좌측 카테고리 필터에 추가 |
| 홈 | 제품군 하단 줄 3 → 4 | 에코시스템 다이어그램 노드, 모델 인덱스 필터 추가 |
| 문구 | "six product families" → "seven" | 제품 인덱스 소개문에 zoom modules 추가 |

- 제품 구성: `VNP36D5VAR` 1종. 기존 사이트와 동일하게 IP Camera에도 유지(전체 86 모델 불변).
- 카테고리 설명문: "VHT zoom module — 6–216mm optical 36× AF zoom, F1.5, with a 2MP 1/2″ SONY STARVIS CMOS." (제품 페이지 스펙만 사용)

**검증**: lint·typecheck·정적 빌드 통과, E2E 17/17, 비주얼 QA 4페이지 × 4해상도 16건 이상 없음, 배포 후 라이브에서 A·B 모두 Zoom Modules 필터 시 카드 1개 확인. 커밋 `31381c3`.

**클라이언트 확인 필요**: 독립 줌 모듈 라인업 의도 여부와 제품 자료(모델명·스펙·이미지). 인벤토리 §4 #15.
