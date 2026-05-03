(function () {
  "use strict";

  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const categoryLabel = {
    birds: "Birds",
    newts: "Newts",
    community: "Community",
    plants: "Plants"
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Decode the few HTML entities we intentionally embedded in titles (e.g. &amp;)
  function decode(s) {
    const t = document.createElement("textarea");
    t.innerHTML = s;
    return t.value;
  }

  function renderCard(g, idx) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = g.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.dataset.category = g.category;
    a.style.animationDelay = (idx * 60) + "ms";

    a.innerHTML = `
      <div class="card-thumb">
        <span class="card-tag">
          <i data-lucide="${escapeHtml(g.icon)}"></i>
          ${escapeHtml(categoryLabel[g.category] || g.category)}
        </span>
        <img src="${escapeHtml(g.image)}" alt="${escapeHtml(decode(g.title))} screenshot" loading="lazy" />
      </div>
      <div class="card-body">
        <div>
          <h3 class="card-title">${g.title}</h3>
          <div class="card-foot" style="border:0;padding:0;margin:2px 0 4px;">
            <span>${escapeHtml(g.tagline)}</span>
          </div>
        </div>
        <p class="card-desc">${g.desc}</p>
        <div class="card-foot">
          <span class="play">Play <i data-lucide="arrow-up-right"></i></span>
        </div>
      </div>
    `;
    return a;
  }

  function render(filter) {
    grid.innerHTML = "";
    const list = (window.GAMES || []).filter(g => filter === "all" || g.category === filter);
    list.forEach((g, i) => grid.appendChild(renderCard(g, i)));
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button.chip");
    if (!btn) return;
    filters.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });

  // Initial render — wait one tick so lucide has loaded
  function init() { render("all"); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // Re-run icon hydration after lucide finishes loading (it's deferred)
  window.addEventListener("load", () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  });
})();
