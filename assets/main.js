// Prompt 實驗室：複製按鈕 + 首頁分類篩選（純 JS，無外部套件）

// 1) 為每個 .prompt-box 加上「複製」按鈕
document.querySelectorAll(".prompt-box").forEach((box) => {
  const wrap = document.createElement("div");
  wrap.className = "prompt-wrap";
  box.parentNode.insertBefore(wrap, box);
  wrap.appendChild(box);

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.type = "button";
  btn.textContent = "複製";
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(box.innerText.trim());
      btn.textContent = "已複製 ✓";
      btn.classList.add("done");
    } catch (e) {
      btn.textContent = "請手動選取";
    }
    setTimeout(() => { btn.textContent = "複製"; btn.classList.remove("done"); }, 1600);
  });
  wrap.appendChild(btn);
});

// 2) 首頁分類篩選（依卡片的 data-category）
const filterBtns = document.querySelectorAll(".filters button");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.toggle("hidden", cat !== "all" && card.dataset.category !== cat);
    });
  });
});
