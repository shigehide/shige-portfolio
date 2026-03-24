/* ============================================================
   Atelier Shige — main.js
   担当：レン | 2026-03-24
============================================================ */

/* ---------- 1. メールアドレス（スパムボット対策・JS生成） ---------- */
(function () {
  const parts = ['che091r', '0n', '@', 'gmail', '.com'];
  const addr  = parts.join('');
  const el    = document.getElementById('email-link');
  if (el) {
    const a = document.createElement('a');
    a.href      = 'mailto:' + addr;
    a.className = 'contact__btn contact__btn--mail';
    a.textContent = 'メールを送る';
    el.appendChild(a);
  }
})();

/* ---------- 2. スクロール reveal アニメーション ---------- */
(function () {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- 3. マスコット：画面下端をうろうろ歩行 ---------- */
(function () {
  const img = document.querySelector('.mascot-sticky');
  if (!img) return;

  const CHAR_W  = 72;
  const BOTTOM  = 28;
  const MARGIN  = 20;
  const SPEED   = 1.4; // px / tick（16ms）

  // right → left 座標系に切り替え
  img.style.right    = 'auto';
  img.style.bottom   = BOTTOM + 'px';
  img.style.transition = 'none';

  let x     = window.innerWidth - CHAR_W - MARGIN; // 初期位置：右端
  let destX = x;
  let dir   = -1;  // -1:左へ / 1:右へ
  let state = 'idle'; // 'walking' | 'idle'

  function maxX() { return window.innerWidth - CHAR_W - MARGIN; }

  function pickNext() {
    const dist = 80 + Math.random() * 220;        // 80〜300px 歩く
    const goLeft = Math.random() > 0.4;            // 少し左寄りに動く確率
    destX = Math.max(MARGIN, Math.min(maxX(), x + (goLeft ? -dist : dist)));
    dir   = destX > x ? 1 : -1;
    // 向きに合わせて左右反転（元GIFが右向きなら右=そのまま、左=反転）
    img.style.transform = dir > 0 ? 'scaleX(-1)' : 'scaleX(1)';
    state = 'walking';
  }

  // 歩行ループ（~60fps）
  setInterval(() => {
    if (state === 'idle') return;
    const diff = destX - x;
    if (Math.abs(diff) <= SPEED) {
      x     = destX;
      state = 'idle';
      img.style.left = x + 'px';
      // 0.5〜2秒休憩してから次の目標へ
      setTimeout(pickNext, 500 + Math.random() * 1500);
    } else {
      x += dir * SPEED;
      img.style.left = x + 'px';
    }
  }, 16);

  // ページ読み込み後 0.8秒で歩き始め
  img.style.left = x + 'px';
  setTimeout(pickNext, 800);

  // ウィンドウリサイズ時にはみ出し補正
  window.addEventListener('resize', () => {
    x = Math.min(x, maxX());
    img.style.left = x + 'px';
  }, { passive: true });
})();

/* ---------- 4. ナビゲーション: スクロール時に背景強調 ---------- */
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();
