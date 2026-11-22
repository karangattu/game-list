(function () {
  "use strict";

  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const count = document.getElementById("game-count");
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

  function renderCard(game) {
    const card = document.createElement("a");
    card.className = "card";
    card.href = game.url;
    card.target = "_blank";
    card.rel = "noopener";
    card.dataset.category = game.category;

    card.innerHTML = `
      <img class="card-thumb" src="${escapeHtml(game.image)}" alt="" width="1440" height="810" loading="lazy" />
      <div class="card-body">
        <p class="card-details"><strong>${escapeHtml(categoryLabel[game.category] || game.category)}</strong>
          <span>${escapeHtml(game.tagline)}</span></p>
        <h3 class="card-title">${game.title}</h3>
        <p class="card-desc">${escapeHtml(game.desc)}</p>
        <span class="card-play">Play <span aria-hidden="true">↗</span></span>
      </div>
    `;
    return card;
  }

  function render(filter) {
    const list = (window.GAMES || []).filter(game => filter === "all" || game.category === filter);
    grid.replaceChildren(...list.map(renderCard));
    count.textContent = `${list.length} ${list.length === 1 ? "game" : "games"}`;
  }

  filters.addEventListener("click", event => {
    const button = event.target.closest("button.chip");
    if (!button) return;
    filters.querySelectorAll("button").forEach(filter => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    render(button.dataset.filter);
  });

  render("all");
})();
