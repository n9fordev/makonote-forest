const appReleaseStatus = {
  "copypouch-pocket": {
    // When released, change the state to "available".
    state: "coming-soon",
    labels: {
      en: {
        "coming-soon": "Coming soon",
      },
      ja: {
        "coming-soon": "Coming soon",
      },
    },
  },
};

document.querySelectorAll("[data-app-release-card]").forEach((card) => {
  const app = appReleaseStatus[card.dataset.appReleaseCard];
  if (!app || app.state === "available") {
    return;
  }

  const language = document.documentElement.lang === "ja" ? "ja" : "en";
  const overlay = document.createElement("div");
  overlay.className = "availability-overlay";
  overlay.textContent = app.labels[language][app.state];
  card.classList.add("is-coming-soon");
  card.append(overlay);
});
