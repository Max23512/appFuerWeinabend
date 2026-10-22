const STORAGE_KEY = "luckyActActivities";
const GAME_STATE_KEY = "luckyActGameState";
const MAX_ACTIVITY_LENGTH = 120;
let nextActivityId = 1;

const DEFAULT_ACTIVITIES = [
  { name: "Ein Tier nachmachen", personCount: 1 },
  { name: "Einen Roboter darstellen", personCount: 1 },
  { name: "Einen Motor imitieren", personCount: 1 },
  { name: "Eine berühmte Person darstellen", personCount: 1 },
  { name: "Einen Sportler darstellen", personCount: 1 },
  { name: "Eine Person darstellen, die sich erschreckt", personCount: 1 },
  { name: "Einen Gegenstand pantomimisch erklären", personCount: 1 },
  { name: "So tun, als würde man einen schweren Gegenstand tragen", personCount: 1 },
  { name: "Einen Filmcharakter darstellen", personCount: 1 },
  { name: "Eine Person darstellen, die sich sehr freut", personCount: 1 },
  { name: "Wie ein bestimmtes Fahrzeug klingen", personCount: 1 },
  { name: "Einen unsichtbaren Gegenstand benutzen", personCount: 1 },
  { name: "Eine Person darstellen, die etwas nicht versteht", personCount: 1 },
  { name: "Eine Alltagssituation pantomimisch vorspielen", personCount: 1 },
  { name: "Eine übertriebene Siegesfeier darstellen", personCount: 1 }
];

const screens = {
  home: document.querySelector("#home-screen"),
  task: document.querySelector("#task-screen"),
  manage: document.querySelector("#manage-screen")
};

const activityList = document.querySelector("#activity-list");
const activityInput = document.querySelector("#activity-input");
const personCountInput = document.querySelector("#person-count-input");
const feedback = document.querySelector("#feedback");
let activities = [];
let multiPersonMode = false;
let avoidRepeats = false;
const usedActivityIds = new Set();

function showFeedback(message, type = "success") {
  feedback.textContent = message;
  feedback.dataset.type = type;
}

function activityKey(activity) {
  return activity.normalize("NFC").toLocaleLowerCase("de-DE");
}

function createActivityId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `activity-${Date.now()}-${nextActivityId++}-${Math.random().toString(36).slice(2)}`;
}

function normalizeActivities(values) {
  const cleaned = [];
  const keys = new Set();
  const ids = new Set();

  for (const value of values) {
    const name = typeof value === "string" ? value : value?.name;
    const personCount = typeof value === "string" ? 1 : value?.personCount;
    if (typeof name !== "string" || ![1, 2, 3].includes(personCount)) {
      continue;
    }

    const activityName = name.trim().slice(0, MAX_ACTIVITY_LENGTH);
    const key = activityKey(activityName);
    if (activityName && !keys.has(key)) {
      let id = typeof value === "object" && typeof value.id === "string" && value.id
        ? value.id
        : createActivityId();
      while (ids.has(id)) {
        id = createActivityId();
      }
      cleaned.push({ id, name: activityName, personCount });
      keys.add(key);
      ids.add(id);
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
      activities = normalizeActivities(DEFAULT_ACTIVITIES);
      if (!saveActivities()) {
        showFeedback("Speichern ist nicht verfügbar.", "warning");
      }
      return;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Die gespeicherte Aktivitätenliste ist kein Array.");
    }

    activities = normalizeActivities(parsed);
    if (activities.length !== parsed.length) {
      showFeedback("Ungültige oder doppelte Einträge wurden übersprungen.", "warning");
    }
    if (!saveActivities()) {
      showFeedback("Aktivitäten geladen, aber nicht gespeichert.", "warning");
    }
  } catch (error) {
    console.error("Die gespeicherten Aktivitäten konnten nicht geladen werden.", error);
    activities = normalizeActivities(DEFAULT_ACTIVITIES);

    const saved = saveActivities();
    const detail = saved
      ? "Liste nicht lesbar. Standardaktivitäten geladen."
      : "Lokaler Speicher nicht verfügbar.";
    showFeedback(detail, "warning");
  }
}

function saveGameState() {
  try {
    window.localStorage.setItem(GAME_STATE_KEY, JSON.stringify({
      avoidRepeats,
      usedActivityIds: [...usedActivityIds]
    }));
    return true;
  } catch (error) {
    console.error("Der Spielstand für Wiederholungen konnte nicht gespeichert werden.", error);
    return false;
  }
}

function loadGameState() {
  try {
    const stored = window.localStorage.getItem(GAME_STATE_KEY);
    if (stored === null) {
      return;
    }

    const parsed = JSON.parse(stored);
    if (typeof parsed.avoidRepeats === "boolean") {
      avoidRepeats = parsed.avoidRepeats;
    }
    if (Array.isArray(parsed.usedActivityIds)) {
      const validIds = new Set(activities.map((activity) => activity.id));
      for (const id of parsed.usedActivityIds) {
        if (typeof id === "string" && validIds.has(id)) {
          usedActivityIds.add(id);
        }
      }
    }
  } catch (error) {
    console.error("Der gespeicherte Wiederholungs-Spielstand konnte nicht geladen werden.", error);
    showFeedback("Wiederholungs-Spielstand nicht lesbar.", "warning");
  }
}

function eligibleActivities() {
  return multiPersonMode
    ? activities
    : activities.filter((activity) => activity.personCount === 1);
}

function renderRepeatControls() {
  for (const toggle of document.querySelectorAll("[data-avoid-repeats-toggle]")) {
    toggle.setAttribute("aria-pressed", String(avoidRepeats));
    toggle.querySelector(".people-mode-status").textContent = avoidRepeats
      ? "An – keine Wiederholungen"
      : "Aus – Wiederholungen erlaubt";
  }

  const eligible = eligibleActivities();
  const usedCount = eligible.filter((activity) => usedActivityIds.has(activity.id)).length;
  for (const progress of document.querySelectorAll("[data-repeat-progress]")) {
    progress.textContent = avoidRepeats && eligible.length > 0
      ? `Bereits gezogen: ${usedCount} von ${eligible.length}`
      : "";
  }
}

function renderActivities() {
  activityList.replaceChildren();

  activities.forEach((activity, index) => {
    const item = document.createElement("li");
    item.className = "activity-item";

    const name = document.createElement("span");
    name.className = "activity-name";
    name.textContent = activity.name;

    const peopleCount = document.createElement("span");
    peopleCount.className = "activity-people-count";
    peopleCount.textContent = activity.personCount === 1
      ? "1 Person"
      : `${activity.personCount} Personen`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Aktivität „${activity.name}“ löschen`);
    deleteButton.addEventListener("click", () => deleteActivity(index));

    item.append(name, peopleCount, deleteButton);
    activityList.append(item);
  });

  const countLabel = `${activities.length} ${activities.length === 1 ? "Aktivität" : "Aktivitäten"}`;
  document.querySelector("#home-activity-count").textContent = countLabel;
  document.querySelector("#manage-activity-count").textContent = String(activities.length);
  document.querySelector("#empty-state").hidden = activities.length > 0;
  renderRepeatControls();
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
    return "Sehr gering – zurückhaltend darstellen.";
  }
  if (number <= 4) {
    return "Gering – leicht darstellen.";
  }
  if (number <= 6) {
    return "Mittel – deutlich darstellen.";
  }
  if (number <= 8) {
    return "Hoch – ausdrucksstark darstellen.";
  }
  return "Sehr hoch – ausdrucksstark und sicher darstellen.";
}

function createTask() {
  const soloActivities = activities.filter((activity) => activity.personCount === 1);
  const multiPersonActivities = activities.filter((activity) => activity.personCount > 1);
  const number = Math.floor(Math.random() * 10) + 1;
  const eligible = eligibleActivities();
  const preferMultiPerson = multiPersonMode
    && multiPersonActivities.length > 0
    && (soloActivities.length === 0 || Math.random() < 1 / 6);

  if (eligible.length === 0) {
    showScreen("home");
    showFeedback(
      activities.length === 0
        ? "Keine Aktivitäten vorhanden. Füge Aktivitäten hinzu."
        : "Keine passenden Aktivitäten. Ändere den Modus oder füge weitere Aktivitäten hinzu.",
      "error"
    );
    document.querySelector("#manage-from-home").focus();
    return;
  }

  let candidates = eligible;
  if (avoidRepeats) {
    candidates = eligible.filter((activity) => !usedActivityIds.has(activity.id));
    if (candidates.length === 0) {
      for (const activity of eligible) {
        usedActivityIds.delete(activity.id);
      }
      candidates = eligible;
    }

    const preferredCandidates = candidates.filter((activity) => (
      preferMultiPerson ? activity.personCount > 1 : activity.personCount === 1
    ));
    if (preferredCandidates.length > 0) {
      candidates = preferredCandidates;
    }
  } else {
    candidates = preferMultiPerson ? multiPersonActivities : soloActivities;
    if (candidates.length === 0) {
      candidates = eligible;
    }
  }

  const activity = candidates[Math.floor(Math.random() * candidates.length)];

  document.querySelector("#task-number").textContent = String(number);
  document.querySelector("#task-activity").textContent = activity.name;
  const taskPeople = document.querySelector("#task-people");
  taskPeople.hidden = activity.personCount === 1;
  taskPeople.textContent = activity.personCount > 1
    ? `Benötigte Personen: ${activity.personCount}`
    : "";
  document.querySelector("#task-description").textContent = getIntensityDescription(number);
  showScreen("task");
  showFeedback("");
  usedActivityIds.add(activity.id);
  renderRepeatControls();
  if (!saveGameState()) {
    showFeedback("Wiederholungs-Spielstand nicht gespeichert.", "warning");
  }
  document.querySelector("#next-task-button").focus({ preventScroll: true });
}

function addActivity(event) {
  event.preventDefault();

  const name = activityInput.value.trim().slice(0, MAX_ACTIVITY_LENGTH);
  if (!name) {
    showFeedback("Aktivität eingeben.", "error");
    activityInput.focus();
    return;
  }

  if (activities.some((savedActivity) => activityKey(savedActivity.name) === activityKey(name))) {
    showFeedback("Diese Aktivität ist bereits gespeichert.", "error");
    activityInput.focus();
    return;
  }

  const personCount = Number(personCountInput.value);
  if (![1, 2, 3].includes(personCount)) {
    showFeedback("Personenzahl auswählen.", "error");
    personCountInput.focus();
    return;
  }

  activities.push({ id: createActivityId(), name, personCount });
  renderActivities();
  const saved = saveActivities();
  activityInput.value = "";
  personCountInput.value = "1";
  showFeedback(
    saved
      ? `„${name}“ hinzugefügt.`
      : `„${name}“ hinzugefügt, aber nicht gespeichert.`,
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
      ? `„${removed.name}“ gelöscht.`
      : `„${removed.name}“ gelöscht, aber nicht gespeichert.`,
    saved ? "success" : "warning"
  );
}

function updateMultiPersonMode() {
  multiPersonMode = !multiPersonMode;
  for (const toggle of document.querySelectorAll("[data-multi-person-toggle]")) {
    toggle.setAttribute("aria-pressed", String(multiPersonMode));
    toggle.querySelector(".people-mode-status").textContent = multiPersonMode
      ? "An – 1 bis 3 Personen"
      : "Aus – nur eine Person";
  }
  renderRepeatControls();
}

function updateAvoidRepeats() {
  avoidRepeats = !avoidRepeats;
  renderRepeatControls();
  if (!saveGameState()) {
    showFeedback("Einstellung nicht gespeichert.", "warning");
  }
}

document.querySelector("#new-task-button").addEventListener("click", createTask);
document.querySelector("#next-task-button").addEventListener("click", createTask);
document.querySelector("#manage-from-home").addEventListener("click", () => showScreen("manage"));
document.querySelector("#manage-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-button").addEventListener("click", () => showScreen("home"));
document.querySelector("#task-home-secondary").addEventListener("click", () => showScreen("home"));
document.querySelector("#activity-form").addEventListener("submit", addActivity);
const rulesDialog = document.querySelector("#rules-dialog");
document.querySelector("#rules-button").addEventListener("click", () => rulesDialog.showModal());
rulesDialog.addEventListener("click", (event) => {
  if (event.target === rulesDialog) {
    rulesDialog.close();
  }
});
for (const toggle of document.querySelectorAll("[data-multi-person-toggle]")) {
  toggle.addEventListener("click", updateMultiPersonMode);
}
for (const toggle of document.querySelectorAll("[data-avoid-repeats-toggle]")) {
  toggle.addEventListener("click", updateAvoidRepeats);
}
document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  showScreen("home");
});

loadActivities();
loadGameState();
renderActivities();

const isSecureAppOrigin = window.location.protocol === "https:"
  || ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

if ("serviceWorker" in navigator && isSecureAppOrigin) {
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Die Offline-Unterstützung konnte nicht aktiviert werden.", error);
    showFeedback("Offline-Modus nicht verfügbar.", "warning");
  });
}