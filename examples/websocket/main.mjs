// WebSocket 接続を作成
const socket = new WebSocket("ws://websocket-echo.com");

// 接続が開いたときのイベント
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// メッセージの待ち受け
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
