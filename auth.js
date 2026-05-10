/* ===============================
   Shared Auth Script for GitHub Pages
   =============================== */

/* ===== 設定（ここだけ変更すれば全ツール更新） ===== */

// ▼ パスワード（複数OK）
const PASSWORDS = [
  "1670"
];

// ▼ 変更時に数字を変える（全員強制ログアウト）
const AUTH_VERSION = "20260510";

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


// ===== 認証済み =====
if (getCookie(COOKIE_NAME) === AUTH_VERSION) {

  // ページ表示
  document.documentElement.style.display = "block";

} else {

  // body完成後にログイン画面へ
  window.addEventListener("DOMContentLoaded", () => {

document.body.innerHTML = `
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

    <input
      id="pw"
      type="password"
      placeholder="Password"
      autocomplete="current-password"
    >

    <br>

    <button id="loginBtn">
      ログイン
    </button>
  </div>
`;

    // ログイン画面表示
    document.documentElement.style.display = "block";

    // ボタン処理
    document.getElementById("loginBtn").onclick = function () {

      const input = document.getElementById("pw").value;

      if (PASSWORDS.includes(input)) {

        setCookie(COOKIE_NAME, AUTH_VERSION, EXPIRE_DAYS);

        location.reload();

      } else {

        alert("パスワードが違います");

      }
    };

  });

}
