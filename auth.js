/* ===============================
   Shared Auth Script for GitHub Pages
   =============================== */

/* ===== 設定（ここだけ変更すれば全ツール更新） ===== */

// ▼ パスワード（複数OK）
const PASSWORDS = [
  "1234"
];

// ▼ 変更時に数字を変える（全員強制ログアウト）
const AUTH_VERSION = "v1";

// ▼ Cookie名（変更不要）
const COOKIE_NAME = "shared_tool_auth";

// ▼ 有効日数
const EXPIRE_DAYS = 7;


/* ===== 以下は触らない ===== */

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie =
    `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

(function () {

  // 認証済みなら終了
  if (getCookie(COOKIE_NAME) === AUTH_VERSION) {
    return;
  }

  // ログイン画面生成
  document.documentElement.innerHTML = `
    <style>
      body{
        margin:0;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#f3f4f6;
        font-family:sans-serif;
      }
      .box{
        background:white;
        padding:30px;
        border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,0.15);
        text-align:center;
      }
      input{
        padding:10px;
        font-size:16px;
        width:220px;
        margin-top:10px;
      }
      button{
        margin-top:12px;
        padding:10px 18px;
        font-size:16px;
        cursor:pointer;
      }
    </style>

    <div class="box">
      <h2>パスワード入力</h2>
      <input id="pw" type="password" placeholder="Password">
      <br>
      <button onclick="window.__authLogin()">ログイン</button>
    </div>
  `;

  window.__authLogin = function () {
    const input = document.getElementById("pw").value;

    if (PASSWORDS.includes(input)) {
      setCookie(COOKIE_NAME, AUTH_VERSION, EXPIRE_DAYS);
      location.reload();
    } else {
      alert("パスワードが違います");
    }
  };

})();
