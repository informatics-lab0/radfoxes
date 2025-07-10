self.addEventListener("install", function (event) {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", function (event) {
  // 通信が必要な場合にキャッシュする処理など
});