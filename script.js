const STORAGE_KEY = "luckyActActivities";
const MAX_ACTIVITY_LENGTH = 120;

const DEFAULT_ACTIVITIES = [
  "Ein Tier nachmachen",
  "Einen Roboter darstellen",
  "Einen Motor imitieren",
  "Eine berühmte Person darstellen",
  "Einen Sportler darstellen",
  "Eine Person darstellen, die sich erschreckt",
  "Einen Gegenstand pantomimisch erklären",
  "So tun, als würde man einen schweren Gegenstand tragen",
  "Einen Filmcharakter darstellen",
  "Eine Person darstellen, die sich sehr freut",
  "Wie ein bestimmtes Fahrzeug klingen",
  "Einen unsichtbaren Gegenstand benutzen",
  "Eine Person darstellen, die etwas nicht versteht",
  "Eine Alltagssituation pantomimisch vorspielen",
  "Eine übertriebene Siegesfeier darstellen"
];

const screens = {
  home: document.querySelector("#home-screen"),
  task: document.querySelector("#task-screen"),
  manage: document.querySelector("#manage-screen")
};

const activityList = document.querySelector("#activity-list");
const activityInput = document.querySelector("#activity-input");
const feedback = document.querySelector("#feedback");
let activities = [];

function showFeedback(message, type = "success") {
  feedback.textContent = message;
  feedback.dataset.type = type;
}

function activityKey(activity) {
  return activity.normalize("NFC").toLocaleLowerCase("de-DE");
}

function normalizeActivities(values) {
  const cleaned = [];
  const keys = new Set();

  for (const value of values) {
    if (typeof value !== "string") {
      continue;
    }

    const activity = value.trim().slice(0, MAX_ACTIVITY_LENGTH);
    const key = activityKey(activity);
    if (activity && !keys.has(key)) {
      cleaned.push(activity);
      keys.add(key);
    }
  }

  return cleaned;
}

function saveActivities() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error("Die Aktivitäten konnten nicht gespeichert werden.", error);
    return false;
  }
}

function loadActivities() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      activities = [...DEFAULT_ACTIVITIES];
      if (!saveActivities()) {
        showFeedback("Speichern ist nicht verfügbar. Änderungen bleiben möglicherweise nur bis zum Schließen dieser Sitzung erhalten.", "warning");
      }
      return;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Die gespeicherte Aktivitätenliste ist kein Array.");
    }

    activities = normalizeActivities(parsed);
    if (activities.length !== parsed.length) {
      showFeedback("Einige ungültige oder doppelte gespeicherte Einträge wurden übersprungen.", "warning");
    }
  } catch (error) {
    console.error("Die gespeicherten Aktivitäten konnten nicht geladen werden.", error);
    activities = [...DEFAULT_ACTIVITIES];

    const saved = saveActivities();
    const detail = saved
      ? "Die gespeicherte Liste war nicht lesbar; die Standardaktivitäten wurden geladen."
      : "Der lokale Speicher ist nicht verfügbar. Die Standardaktivitäten gelten möglicherweise nur bis zum Schließen dieser Sitzung.";
    showFeedback(detail, "warning");
  }
}

function renderActivities() {
  activityList.replaceChildren();

  activities.forEach((activity, index) => {
    const item = document.createElement("li");
    item.className = "activity-item";

    const name = document.createElement("span");
    name.className = "activity-name";
    name.textContent = activity;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Aktivität „${activity}“ löschen`);
    deleteButton.addEventListener("click", () => deleteActivity(index));

    item.append(name, deleteButton);
    activityList.append(item);
  });

  const countLabel = `${activities.length} ${activities.length === 1 ? "Aktivität" : "Aktivitäten"}`;
  document.querySelector("#home-activity-count").textContent = countLabel;
  document.querySelector("#manage-activity-count").textContent = String(activities.length);
  document.querySelector("#empty-state").hidden = activities.length > 0;
}

function showScreen(name) {
  for (const [screenName, element] of Object.entries(screens)) {
    element.hidden = screenName !== name;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (name === "manage") {
    activityInput.focus({ preventScroll: true });
  }
}

function getIntensityDescription(number) {
  if (number <= 2) {
    return "Sehr geringe Intensität – stelle es ganz zurückhaltend dar.";
  }
  if (number <= 4) {
    return "Geringe Intensität – eine leichte, unauffällige Darstellung.";
  }
  if (number <= 6) {
    return "Mittlere Intensität – stelle es deutlich erkennbar dar.";
  }
  if (number <= 8) {
    return "Hohe Intensität – sehr ausdrucksstark darstellen!";
  }
  return "Sehr hohe Intensität – besonders ausdrucksstark, aber immer sicher!";
}

function createTask() {
  if (activities.length === 0) {
    showScreen("home");
    showFeedback("Es sind keine Aktivitäten gespeichert. Füge welche über „Aktivitäten verwalten“ hinzu.", "error");
    document.querySelector("#manage-from-home").focus();
    return;
  }

  const number = Math.floor(Math.random() * 10) + 1;
  const activity = activities[Math.floor(Math.random() * activities.length)];

  document.querySelector("#task-number").textContent = String(number);
  document.querySelector("#task-activity").textContent = activity;
  document.querySelector("#task-description").textContent = getIntensityDescription(number);
  showScreen("task");
  showFeedback("");
  document.querySelector("#next-task-button").focus({ preventScroll: true });
}

function addActivity(event) {
  event.preventDefault();

  const activity = activityInput.value.trim().slice(0, MAX_ACTIVITY_LENGTH);
  if (!activity) {
    showFeedback("Gib zuerst eine Aktivität ein.", "error");
    activityInput.focus();
    return;
  }

  if (activities.some((savedActivity) => activityKey(savedActivity) === activityKey(activity))) {
    showFeedback("Diese Aktivität ist bereits in deiner Sammlung.", "error");
    activityInput.focus();
    return;
  }

  activities.push(activity);
  renderActivities();
  const saved = saveActivities();
  activityInput.value = "";
  showFeedback(
    saved
      ? `„${activity}“ wurde hinzugefügt.`
      : `„${activity}“ wurde hinzugefügt, aber nicht dauerhaft gespeichert. Änderungen bleiben möglicherweise nur bis zum Schließen dieser Sitzung erhalten.`,
    saved ? "success" : "warning"
  );
  activityInput.focus();
}

function deleteActivity(index) {
  const [removed] = activities.splice(index, 1);
  renderActivities();
  const saved = saveActivities();
  showFeedback(
    saved
      ? `„${removed}“ wurde gelöscht.`
      : `„${removed}“ wurde gelöscht, aber die Änderung konnte nicht dauerhaft gespeichert werden.`,
    saved ? "success" : "warning"
  );
}

document.querySelector("#new-task-button").addEventListener("click", createTask);
document.querySelector("#next-task-button").addEventListener("click", createTask);
document.querySelector("#manage-from-home").addEventListener("click", () => showScreen("manage"));
document.querySelector("#manage-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-secondary").addEventListener("click", () => showScreen("home"));
document.querySelector("#activity-form").addEventListener("submit", addActivity);
document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  showScreen("home");
});

loadActivities();
renderActivities();

const isSecureAppOrigin = window.location.protocol === "https:"
  || ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

if ("serviceWorker" in navigator && isSecureAppOrigin) {
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Die Offline-Unterstützung konnte nicht aktiviert werden.", error);
    showFeedback("Die Offline-Unterstützung konnte nicht aktiviert werden. Die App ist online weiterhin nutzbar.", "warning");
  });
}