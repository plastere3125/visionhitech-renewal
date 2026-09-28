# VISION HITECH 영문 사이트 리뉴얼 — 착수 분석 보고 [01]~[18]

작성일: 2026-09-28 · 근거 문서: `VISIONHITECH_CONTENT_INVENTORY.md`, `REFERENCE_ANALYSIS.md`, `ASSET_SOURCES.md`

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

## [03] VISION HITECH 실제 콘텐츠 인벤토리 (요약)

- **제품 85 + 소프트웨어 1**: IP Camera 52 / NVR 3 / HD Analog 13 / DVR 3 / Software 1 / Accessory 14
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
