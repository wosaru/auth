/* ===============================
   Shared Auth Script for GitHub Pages
   =============================== */

/* ===== 設定（ここだけ変更すれば全ツール更新） ===== */

// ▼ パスワード（複数OK）
const PASSWORDS = [
  "1670"
];

// ▼ 変更時に数字を変える（全員強制ログアウト）
const AUTH_VERSION = "20260502";

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

  .auth-overlay{
    position:fixed;
    inset:0;

    display:flex;
    justify-content:center;
    align-items:center;

    background:#f3f4f6;

    z-index:999999;
  }

  .auth-box{
    background:white;

    padding:32px;

    border-radius:14px;

    box-shadow:0 10px 30px rgba(0,0,0,0.15);

    text-align:center;

    width:min(92vw, 360px);

    box-sizing:border-box;

    font-family:sans-serif;
  }

  .auth-title{
    margin-top:0;
    margin-bottom:18px;

    font-size:24px;
  }

  .auth-input{
    width:100%;

    box-sizing:border-box;

    padding:14px;

    font-size:20px;

    border:1px solid #ccc;

    border-radius:8px;

    margin-top:10px;
  }

  .auth-button{
    width:100%;

    margin-top:16px;

    padding:14px;

    font-size:18px;

    border:none;

    border-radius:8px;

    cursor:pointer;

    background:#2563eb;

    color:white;
  }

  .auth-button:active{
    transform:scale(0.98);
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
