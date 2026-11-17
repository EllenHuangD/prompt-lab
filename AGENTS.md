# AGENTS.md — Prompt 實驗室（Prompt Lab）

> 這份文件寫給「接手這個專案的 AI」與未來的我自己。
> 任何新增或修改內容之前，**請先完整讀完本文件**，並嚴格依照規則執行。

---

## 1. 專案目的

「Prompt 實驗室」是一個**可重複使用的 Prompt 作品集網站**。

- 每一頁收錄**一個**實際設計、測試過的 prompt。
- 內容來源：TAICA「生成式 AI：文字與圖像生成的原理與實務」課程作業，以及工作（行政／內部系統）上的延伸練習。
- 目標讀者：想直接拿 prompt 來用的人。所以每頁都必須「看完就能複製使用」，並說明**為什麼這樣設計**。

一句話原則：**一頁 = 一個 prompt = 情境 + 原文 + 結果 + 設計理由。**

---

## 2. 專案結構

```
prompt-lab/
├── AGENTS.md                  ← 專案規則（本文件，唯一規則來源）
├── CLAUDE.md                  ← 只指向 AGENTS.md，不另寫規則
├── README.md                  ← 給人看的專案簡介
├── index.html                 ← 首頁：卡片列表 + 分類篩選
├── pages/                     ← 所有 prompt 頁面都放這裡
│   ├── p001-workplace-bullying-detector.html
│   ├── p002-hospital-notice-illustration.html
│   └── p003-official-notice-rewriter.html
├── templates/
│   └── prompt-template.html   ← 新增頁面時「複製」這個檔案
└── assets/
    ├── style.css              ← 全站唯一樣式表
    ├── main.js                ← 複製按鈕、分類篩選
    └── img/                   ← 圖片（檔名與頁面編號一致）
```

**禁止**新增其他資料夾或其他 CSS 檔。

---

## 3. 檔案命名規則

| 項目 | 規則 | 範例 |
|---|---|---|
| 頁面檔名 | `p` + 三位數流水號 + `-` + 英文小寫 kebab-case 主題 | `p004-meeting-minutes-summarizer.html` |
| 流水號 | 取 `pages/` 中最大號碼 +1，不可跳號、不可重複 | 現有到 p003 → 新的是 p004 |
| 圖片 | `assets/img/` + 頁面編號 + `-` + 說明 | `assets/img/p002-output-1.png` |

- 檔名只能用英文小寫、數字、連字號 `-`，**不可**有中文、空白、底線。
- 主題英文 2～5 個單字即可。

---

## 4. 分類（Category）

每頁**只能屬於一個**分類，且只能從下表選：

| 分類代碼 `data-category` | 顯示名稱 | 標籤顏色 class | 適用 |
|---|---|---|---|
| `text` | 文字生成 | `tag-text` | 改寫、摘要、寫作、對話 bot |
| `image` | 圖像生成 | `tag-image` | Stable Diffusion、DALL·E、Midjourney 等 |
| `analysis` | 分析判斷 | `tag-analysis` | 分類、偵測、評分、資訊擷取 |

如需新增分類：必須**同時**修改 (1) 本表、(2) `style.css` 的標籤顏色、(3) `index.html` 的篩選按鈕。三處缺一不可。

---

## 5. 網頁風格

- **風格關鍵字**：乾淨、像實驗紀錄本、資訊優先、不花俏。
- **顏色**：全部使用 `style.css` 開頭 `:root` 定義的 CSS 變數，**禁止**在 HTML 寫死顏色或使用 inline style。
  - 主色 `--accent`（墨綠）／背景 `--bg`（米白）／文字 `--ink`
- **字型**：內文 `Noto Sans TC`；prompt 原文用等寬字 `--font-mono`。
- **語言**：繁體中文（台灣用語）；專有名詞可保留英文，如 prompt、few-shot。
- 不使用 emoji 當標題裝飾（標籤與按鈕除外）。

---

## 6. 頁面結構（每一頁都必須完全一致）

每個 prompt 頁面必須**依序**包含以下 6 個區塊，標題文字固定不可改：

| # | 區塊 `<section id>` | 標題 | 內容要求 |
|---|---|---|---|
| 0 | `meta`（頁首 header 內） | — | 分類標籤、對應課程週次、使用模型、建立日期 |
| 1 | `scenario` | 使用情境 | 2～4 句：誰、在什麼狀況、要解決什麼問題 |
| 2 | `prompt` | Prompt 原文 | 完整 prompt，放在 `<pre class="prompt-box"><code>`，搭配「複製」按鈕 |
| 3 | `output` | 輸出範例 | 一組真實輸入 → 輸出；圖像類放圖片或文字描述 |
| 4 | `design` | 設計重點 | 3～5 點條列，說明**為什麼**這樣寫（技巧名稱＋理由） |
| 5 | `improve` | 可改進方向 | 1～3 點條列：已知限制、下一步想嘗試什麼 |

### 頁首 meta 欄位格式

```html
<dl class="meta">
  <div><dt>分類</dt><dd><span class="tag tag-text">文字生成</span></dd></div>
  <div><dt>對應課程</dt><dd>Week 3</dd></div>        <!-- 非作業則寫「延伸練習」 -->
  <div><dt>使用模型</dt><dd>ChatGPT（GPT-4o）</dd></div>
  <div><dt>建立日期</dt><dd>2026-11-16</dd></div>   <!-- 一律 YYYY-MM-DD -->
</dl>
```

### 設計重點的寫法

每一點必須是「**技巧名稱**：理由」格式，例如：

```html
<li><strong>角色設定</strong>：先指定 AI 是「職場人資顧問」，讓判斷標準貼近職場脈絡。</li>
```

常用技巧名稱（優先沿用，保持全站一致）：
角色設定、任務拆解、輸出格式限制、Few-shot 範例、判斷準則明列、限制條件、思考步驟引導、風格指定、負面提示（Negative prompt）、負面清單、分隔符號、版面預留。

---

## 7. 新增一頁的標準流程（AI 必須逐步執行）

1. **確認編號**：查看 `pages/` 現有最大編號 N，新頁為 N+1。
2. **複製範本**：將 `templates/prompt-template.html` 複製為 `pages/pXXX-主題.html`。
3. **填寫內容**：取代範本中所有 `{{...}}` 佔位符，並刪除所有 `<!-- TODO -->` 註解。
4. **更新首頁**：在 `index.html` 的 `<div class="card-grid">` **最前面**（新的在上）新增一張卡片：

   ```html
   <a class="card" href="pages/p004-xxx.html" data-category="text">
     <span class="card-no">P004</span>
     <span class="tag tag-text">文字生成</span>
     <h3>頁面標題</h3>
     <p>一句話說明（30 字以內）</p>
   </a>
   ```

5. **更新數量**：修改 `index.html` 中 `<span id="count">` 的數字。
6. **更新 README**：在 `README.md` 的「收錄清單」表格加一列。
7. **自我檢查**：完成第 8 節的檢查清單。

> 修改既有頁面時：只改內容，不改檔名與編號；並把頁尾的「最後更新」日期改為今天。

---

## 8. 完成前檢查清單

- [ ] 檔名符合 `pXXX-kebab-case.html`，編號連續
- [ ] 6 個區塊都存在、順序正確、標題文字與第 6 節一致
- [ ] 沒有殘留 `{{` 佔位符或 `TODO`
- [ ] 分類代碼、顯示名稱、標籤 class 三者一致（見第 4 節）
- [ ] `index.html` 已新增卡片，且 `data-category` 正確
- [ ] 首頁數量、README 收錄清單已同步
- [ ] 所有路徑是相對路徑（頁面內用 `../assets/...`）
- [ ] 沒有 inline style、沒有寫死顏色
- [ ] 本機直接開啟 `index.html` 可正常瀏覽、篩選、點進頁面、複製 prompt

---

## 9. AI 修改規則（禁止事項）

1. **不可**改動既有頁面的檔名或編號（會讓外部連結失效）。
2. **不可**修改 `style.css` 的整體設計；需要新樣式時，在檔案最後的 `/* === 擴充區 === */` 之後新增，並加註解說明用途。
3. **不可**引入任何框架、建置工具（React、Tailwind、npm 等）。本站必須是純 HTML/CSS/JS，可直接用 GitHub Pages 發布。
4. **不可**捏造輸出範例。若使用者沒提供實際輸出，在 `output` 區塊寫「（待補：實際執行結果）」並告知使用者。
5. **不可**放入個資、真實姓名、單位內部機密或病患資訊；範例一律使用虛構資料。
6. 規則與實際需求衝突時，**先詢問使用者**，不要自行更改規則；確定後同步更新本文件。

---

## 10. 發布

- 使用 GitHub Pages：Settings → Pages → Branch 選 `main`、資料夾 `/ (root)`。
- `index.html` 必須維持在根目錄。
- 根目錄必須保留空白檔案 `.nojekyll`，**不可刪除**。否則 GitHub Pages 會用 Jekyll 處理檔案，本文件與範本中的 `{{ }}` 佔位符會被誤判為語法而導致建置失敗。
- 推送後約 1～2 分鐘生效。
