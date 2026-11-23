# 이펙트몰 · useEffect 실습

useEffect로 서버 데이터를 가져올 때, 의존성 배열과 정리 함수로 응답 순서 문제를 다루는 실습 코드예요.
쇼핑몰 카테고리 탭(상의 · 신발 · 가방)을 바꾸면 그 카테고리의 상품을 불러와요.

| 폴더 | 내용 |
| --- | --- |
| `starter/` | 수강생용 시작 코드. 의존성 배열이 `[]`이고, 정리 함수가 아무것도 정리하지 않아요 |
| `solution/` | 예시 풀이. `[category]` + 정리 함수의 `ignore` 표시 |

두 폴더는 각각 따로 실행되는 Vite + React + TypeScript 앱이에요. 백엔드 서버는 없어요.

## 실행 방법

Node.js 22 이상이 필요해요.

```bash
cd starter      # 예시 풀이는 cd solution
npm install
npm run dev
```

터미널에 표시된 주소(보통 http://localhost:5173)를 열고, 브라우저 개발자 도구의 콘솔을 함께 열어 두세요.

| 명령 | 하는 일 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run lint` | oxlint로 Hook 규칙 검사(의존성 배열 누락 경고 포함) |
| `npm run build` | 타입 검사 후 빌드 |

## 파일 구성

```
src/
├─ main.tsx         StrictMode로 App을 감싸요
├─ types.ts         Category, Product 타입
├─ data.ts          카테고리별 상품 목록, 카테고리 이름
├─ api.ts           모의 API fetchProducts, 응답 시간 DELAY_MS
├─ components.tsx   카테고리 탭, 상품 목록
├─ App.css          기본 스타일
└─ App.tsx          ✏️ 수강생이 고칠 파일
```

수강생이 고칠 곳은 `starter/src/App.tsx`의 `✏️ 수정 범위 시작` ~ `✏️ 수정 범위 끝` 사이 한 곳이에요. 다른 파일은 고치지 않아요.

## 모의 API

`fetchProducts(category)`는 서버의 `GET /api/products?category=…` 요청을 흉내 낸 함수예요.
네트워크 상태와 상관없이 매번 같은 순서로 응답이 오도록, 서버 대신 `setTimeout`으로 카테고리별 응답 시간을 고정했어요.

| 카테고리 | 응답 시간 |
| --- | --- |
| 상의 | 2초 |
| 신발 | 0.3초 |
| 가방 | 1초 (처음 화면) |

응답 시간은 `src/api.ts` 맨 위의 `DELAY_MS`에서 바꿀 수 있어요. 요청할 때 `요청: 신발`, 응답이 도착할 때 `응답: 신발`을 콘솔에 찍어요.

## 응답 순서 문제 재현 방법

### 1. 의존성 배열 문제 (starter 그대로)

1. 처음 화면에 가방 상품이 보이면 신발 탭을 눌러요.
2. 제목은 "신발 카테고리"로 바뀌지만, 목록은 가방 상품 그대로예요. 콘솔에 `요청: 신발`이 찍히지 않아요.

### 2. 경쟁 상태 (starter에서 의존성 배열을 `[category]`로 고친 뒤)

1. 가방 상품이 보이는 상태에서 콘솔을 지워요.
2. 상의 탭을 누르고, 1초 안에 신발 탭을 눌러요.
3. 3초 기다려요.

상의 → 0.5초 뒤 신발을 눌렀을 때의 결과예요.

| 시간 | 콘솔 | 화면 제목 | 화면 목록 |
| --- | --- | --- | --- |
| 0초 | 정리: 가방 / 설정: 상의 / 요청: 상의 | 상의 | 가방 |
| 0.5초 | 정리: 상의 / 설정: 신발 / 요청: 신발 | 신발 | 가방 |
| 0.8초 | 응답: 신발 | 신발 | 신발 |
| 2초 | 응답: 상의 | 신발 | 상의 ❌ |

요청은 상의 → 신발 순서로 나갔지만, 응답은 신발 → 상의 순서로 도착해요. 늦게 도착한 상의 응답이 신발 목록을 덮어써요.

### 3. 같은 조작으로 해결 확인 (solution)

solution에서 2와 똑같이 조작하면, 2초에 `응답: 상의` 다음 `무시: 상의`가 찍히고 목록은 신발 상품으로 유지돼요.
상의 → 가방 → 신발을 1초 안에 누르고 3초 기다려도 최종 목록은 신발 상품이에요(`무시: 가방`, `무시: 상의`).

## 예시 풀이와 시작 코드의 차이

```diff
  useEffect(() => {
+   let ignore = false;
    console.log(`설정: ${CATEGORY_LABEL[category]}`);
    fetchProducts(category).then((data) => {
+     if (ignore) {
+       console.log(`무시: ${CATEGORY_LABEL[category]}`);
+       return;
+     }
      setProducts(data);
    });

    return () => {
      console.log(`정리: ${CATEGORY_LABEL[category]}`);
+     ignore = true;
    };
- }, []);
+ }, [category]);
```

- `[category]`: Effect가 사용하는 `category`가 바뀔 때마다 다시 실행해 그 카테고리와 동기화해요.
- `ignore`: Effect가 실행될 때마다 새로 만들어지는 표시예요. 정리 함수가 이전 Effect의 표시를 `true`로 바꾸면, 그 Effect의 응답은 나중에 도착해도 반영되지 않아요.
- 정리 함수는 요청을 취소하지 않아요. 이전 요청의 응답은 실제로 도착하지만(`응답: 상의`), 화면에 반영하지 않을 뿐이에요.

## 참고

- 개발 모드에서는 StrictMode 때문에 처음 화면에서 설정 → 정리 → 설정이 한 번 더 실행돼요. 요청 로그가 두 번 찍히는 것은 정상이에요.
