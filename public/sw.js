// 심심풀이 연구소 Service Worker
// 캐시 전략: 앱 셸 캐시 + 체크인 알림 스케줄링

const CACHE_NAME = "sslab-v1";
const APP_SHELL = [
  "/",
  "/daily",
  "/tests",
  "/categories",
  "/games",
  "/check-in",
  "/challenge",
];

// 설치: 앱 셸 캐시
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 오래된 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// 요청 가로채기: network-first, 실패 시 캐시
self.addEventListener("fetch", (event) => {
  // API 요청, 외부 리소스는 캐시하지 않음
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 성공 응답 캐시 갱신
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push 알림 수신 (체크인 리마인더)
self.addEventListener("push", (event) => {
  let data = { title: "심심풀이 연구소", body: "오늘 출석체크 하셨나요? 🎯", url: "/check-in" };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url: data.url },
      tag: "sslab-checkin",
      renotify: false,
    })
  );
});

// 알림 클릭 시 앱 열기
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) => c.url.includes(self.location.origin));
        if (existing) {
          existing.focus();
          existing.navigate(url);
        } else {
          self.clients.openWindow(url);
        }
      })
  );
});
