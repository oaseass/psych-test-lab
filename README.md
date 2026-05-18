# 심심풀이 연구소

한국 최대 심리테스트 포털 - 1,000개 이상의 심리테스트를 무료로 제공하는 종합 플랫폼입니다.

## 프로젝트 소개

**심심풀이 연구소**는 연애, 돈, 인간관계, 직장생활 등 21개 카테고리에 걸쳐 1,000개 이상의 심리테스트를 제공합니다. 사용자가 테스트를 즐기고, 결과를 공유하고, 다음 테스트로 자연스럽게 이어지는 구조로 설계되었습니다.

## 기술 스택

- **프레임워크**: Next.js 15 App Router
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태관리**: localStorage (브라우저 기반)
- **데이터**: JSON/TS 정적 데이터 + 엑셀 import 지원

## 설치 방법

```bash
cd D:\test
npm install
```

## 실행 방법

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start
```

## setup_and_run.bat 사용법 (Windows)

탐색기에서 `setup_and_run.bat`를 더블클릭하면 자동으로 `npm install` 후 개발 서버가 실행됩니다.

## 엑셀 import 방법

1. `D:\test\data\psych_test_1050_database.xlsx` 파일 준비
2. 엑셀 파일에 다음 컬럼 포함: `id`, `slug`, `title`, `categorySlug`, `hook`, `description`, `tags`
3. 아래 명령 실행:
   ```bash
   npm run import:tests
   ```
4. 생성 결과 확인: `src/data/generated/testMeta.generated.ts`
5. 개발 서버 재실행: `npm run dev`

## 테스트 데이터 구조

### TestMeta (테스트 기본 정보)
```typescript
{
  id: string;           // 고유 ID
  slug: string;         // URL 슬러그
  title: string;        // 테스트 제목
  categorySlug: string; // 카테고리
  hook: string;         // 훅 문구
  description: string;  // 설명
  estimatedMinutes: number; // 예상 소요시간
  questionCount: number;    // 질문 수
  resultCount: number;      // 결과 유형 수
  viralScore: number;       // 바이럴 점수
  priority: number;         // 우선순위
  tags: string[];           // 태그
  isFeatured: boolean;      // 특집 여부
  isNew: boolean;           // 신규 여부
  status: "curated" | "generated" | "needsReview";
}
```

## 새 테스트 추가 방법

### 방법 1: 직접 curatedTests.ts 수정
`src/data/curatedTests.ts` 파일에 PlayableTest 객체를 추가합니다.

### 방법 2: 엑셀 import
엑셀 파일에 테스트 메타 정보를 입력하고 `npm run import:tests`를 실행합니다.  
질문/결과 데이터가 없으면 generatePlayableTest.ts가 자동으로 생성합니다.

## 광고 placeholder 설명

`src/components/ads/AdSlot.tsx` 컴포넌트가 광고 슬롯을 표시합니다.  
현재는 "AD AREA"로 표시되며, 실제 AdSense 코드로 교체 가능합니다.

```tsx
<AdSlot slot="main-middle" className="my-8" />
```

## 배포 전 해야 할 일

- [ ] `.env.local` 파일 생성 및 환경변수 설정
- [ ] Google Analytics 연결
- [ ] Google AdSense 심사 신청 및 코드 삽입
- [ ] 도메인 설정
- [ ] OG 이미지 생성 (`public/og/` 폴더)
- [ ] Favicon 설정 (`public/icons/` 폴더)

---

## 게임화 시스템 (회원/포인트/계급/출석체크)

### ⚠️ 보안 안내: Mock 인증 (localStorage 기반)

현재 인증 시스템은 **실제 서비스용이 아닙니다**.

- 모든 사용자 데이터는 **브라우저 localStorage**에만 저장됩니다
- 비밀번호는 간단한 해시 함수를 사용 (암호학적으로 안전하지 않음)
- 다른 기기/브라우저에서 로그인 불가
- 목적: Supabase Auth로 교체하기 전 UX 프로토타이핑

### 주요 localStorage 키

| 키 | 내용 |
|---|---|
| `sslab_current_user` | 현재 로그인 사용자 정보 |
| `sslab_users_db` | 전체 가입 사용자 DB |
| `sslab_point_logs` | 포인트 적립/사용 로그 |
| `sslab_earned:{userId}:{reason}:{contentId}:{date}` | 중복 적립 방지 키 |

### 포인트 적립 이유 및 금액

| 이유 | 금액 |
|---|---|
| 회원가입 축하 | 500P |
| 일일 출석 | 100P |
| 3일 연속 출석 보너스 | 300P |
| 7일 연속 출석 보너스 | 1,000P |
| 14일 연속 출석 보너스 | 2,000P |
| 30일 연속 출석 보너스 | 5,000P |
| 심리테스트 완료 | 30P |
| 월드컵 완료 | 50P |
| 밸런스 게임 완료 | 30P |
| 초성퀴즈 완료 | 40P |
| 넌센스 퀴즈 완료 | 30P |
| 기억력 게임 완료 | 40P |
| 반응속도 게임 완료 | 40P |
| 관찰력 게임 완료 | 40P |
| 투표 참여 | 10P |
| 생성기 사용 | 10P |
| 같이놀기 참가 완료 | 80P |
| 같이놀기 방장 완료 | 120P |
| 친구 초대 | 150P |

### 계급 시스템 (15단계)

훈련병(게스트) → 이등병(★, 500P) → ... → 장군(👑★★★, 300,000P)

### 같이놀기 회원 제한

`/together/create` 및 `/together/room/*` 페이지는 회원 전용입니다.  
게스트 접근 시 AuthModal이 표시되어 가입/로그인을 유도합니다.

### Supabase 마이그레이션 계획

추후 Supabase로 마이그레이션 시 아래 테이블 구조를 사용할 예정입니다:

```sql
-- 사용자
users (id, nickname, password_hash, points, rank_id, created_at, last_login_at)

-- 포인트 로그
point_logs (id, user_id, reason, amount, label, created_at)

-- 출석 체크
check_ins (id, user_id, check_in_date, streak, bonus_reason)

-- 콘텐츠 완료 (중복 적립 방지)
content_completions (id, user_id, reason, content_id, completed_at)

-- 랭킹 (캐싱용)
leaderboards (user_id, points, rank_position, updated_at)

-- 같이놀기 방
rooms (id, room_code, host_id, game_type, status, created_at)

-- 같이놀기 참가자
room_participants (id, room_id, user_id, nickname, is_host, joined_at)

-- 게임 라운드/답변
game_rounds (id, room_id, round_number, question, started_at)
game_answers (id, round_id, participant_id, answer, submitted_at)
```

`src/lib/user/authService.ts`의 함수들은 Supabase Auth API와 동일한 인터페이스를 유지하도록 설계되었습니다.
- [ ] 카카오 JavaScript Key 발급

## 향후 Supabase 연결 계획

`src/lib/data/testRepository.ts`의 localStorage 로직을 Supabase 호출로 교체합니다.  
환경변수 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정 후 연동.

## 향후 AdSense 연결 계획

`src/components/ads/AdSlot.tsx`의 placeholder를 실제 AdSense 코드로 교체합니다.  
`NEXT_PUBLIC_ADSENSE_CLIENT` 환경변수 설정 후 Google AdSense 승인 완료 시 활성화.

## 향후 브랜드 협찬 테스트 계획

TestMeta의 `status: "curated"` 타입을 확장하여 협찬 테스트 구분 및 브랜딩 적용 가능.  
`/advertise` 페이지를 통해 브랜드 협찬 문의를 받을 수 있습니다.
