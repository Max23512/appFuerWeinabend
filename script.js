const STORAGE_KEY = 'luckyActActivities';
const DEFAULT_ACTIVITIES = [
  'Ein Tier nachmachen',
  'Einen Roboter darstellen',
  'Einen Motor imitieren',
  'Eine berühmte Person darstellen',
  'Einen Sportler darstellen',
  'Eine Person darstellen, die sich erschreckt',
  'Einen Gegenstand pantomimisch erklären',
  'So tun, als würde man einen schweren Gegenstand tragen',
  'Einen Filmcharakter darstellen',
  'Eine Person darstellen, die sich sehr freut',
  'Wie ein bestimmtes Fahrzeug klingen',
  'Einen unsichtbaren Gegenstand benutzen',
  'Eine Person darstellen, die etwas nicht versteht',
  'Eine Alltagssituation pantomimisch vorspielen',
  'Eine übertriebene Siegesfeier darstellen'
];

const state = {
  activities: [],
  currentTask: null
};

const elements = {
  startScreen: document.getElementById('start-screen'),
  taskScreen: document.getElementById('task-screen'),
  manageScreen: document.getElementById('manage-screen'),
  newTaskButton: document.getElementById('new-task-btn'),
  manageActivitiesButton: document.getElementById('manage-activities-btn'),
  backToStartButton: document.getElementById('back-to-start-btn'),
  nextTaskButton: document.getElementById('next-task-btn'),
  manageBackButton: document.getElementById('manage-back-btn'),
  activityForm: document.getElementById('activity-form'),
  activityInput: document.getElementById('activity-input'),
  addActivityButton: document.getElementById('add-activity-btn'),
  activityList: document.getElementById('activity-list'),
  activityCounter: document.getElementById('activity-counter'),
  startActivityCount: document.getElementById('start-activity-count'),
  activityFeedback: document.getElementById('activity-feedback'),
  globalStatus: document.getElementById('global-status'),
  taskNumber: document.getElementById('task-number'),
  taskActivity: document.getElementById('task-activity'),
  taskIntensity: document.getElementById('task-intensity')
};

function getDefaultActivities() {
  return [...DEFAULT_ACTIVITIES];
}

function setStatus(message, type = 'info') {
  if (!message) {
    elements.globalStatus.textContent = '';
    elements.globalStatus.removeAttribute('data-type');
    return;
  }

  elements.globalStatus.textContent = message;
  elements.globalStatus.setAttribute('data-type', type);
}

function setFeedback(message, type = 'info') {
  if (!message) {
    elements.activityFeedback.textContent = '';
    elements.activityFeedback.removeAttribute('data-type');
    return;
  }

  elements.activityFeedback.textContent = message;
  elements.activityFeedback.setAttribute('data-type', type);
}

function storageAvailable() {
  try {
    const testKey = '__luckyActStorageTest__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

// Die gespeicherten Aktivitäten kommen aus dem lokalen Browser-Speicher.
// Wenn noch nichts gespeicherte ist, laden wir die Standardliste.
function loadActivities() {
  if (!storageAvailable()) {
    state.activities = getDefaultActivities();
    setStatus('Der lokale Speicher ist nicht verfügbar. Änderungen bleiben nur für diese Sitzung erhalten.', 'warning');
    return state.activities;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === null) {
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
      return state.activities;
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
      return state.activities;
    }

    state.activities = parsed
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);

    if (state.activities.length === 0) {
      state.activities = getDefaultActivities();
      saveActivities({ silent: true });
    }

    return state.activities;
  } catch (error) {
    state.activities = getDefaultActivities();
    saveActivities({ silent: true });
    setStatus('Die gespeicherten Aktivitäten konnten nicht gelesen werden. Die Standardliste wurde wiederhergestellt.', 'warning');
    return state.activities;
  }
}

function saveActivities(options = {}) {
  const { silent = false } = options;

  if (!storageAvailable()) {
    if (!silent) {
      setFeedback('Die Änderungen konnten nicht dauerhaft gespeichert werden. Die App funktioniert aber für diese Sitzung weiter.', 'warning');
    }
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.activities));
    return true;
  } catch (error) {
    if (!silent) {
      setFeedback('Die Aktivitäten konnten nicht gespeichert werden. Bitte prüfe den verfügbaren Speicherplatz.', 'error');
    }
    return false;
  }
}

function updateActivityCount() {
  const count = state.activities.length;
  const label = count === 1 ? 'gespeicherte Aktivität' : 'gespeicherte Aktivitäten';

  elements.startActivityCount.textContent = `${count} ${label}`;
  elements.activityCounter.textContent = String(count);
}

function renderActivities() {
  elements.activityList.innerHTML = '';

  if (state.activities.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.innerHTML = '<span>Keine Aktivitäten gespeichert.</span>';
    elements.activityList.appendChild(emptyItem);
    updateActivityCount();
    return;
  }

  const fragment = document.createDocumentFragment();

  state.activities.forEach((activity, index) => {
    const listItem = document.createElement('li');
    const text = document.createElement('span');
    text.textContent = activity;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('aria-label', `Aktivität löschen: ${activity}`);
    deleteButton.dataset.index = String(index);
    deleteButton.textContent = '×';

    listItem.appendChild(text);
    listItem.appendChild(deleteButton);
    fragment.appendChild(listItem);
  });

  elements.activityList.appendChild(fragment);
  updateActivityCount();
}

function showScreen(screenName) {
  const screens = [
    elements.startScreen,
    elements.taskScreen,
    elements.manageScreen
  ];

  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === `${screenName}-screen`);
  });
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomActivity() {
  const randomIndex = Math.floor(Math.random() * state.activities.length);
  return state.activities[randomIndex];
}

function getIntensityDescription(number) {
  if (number >= 1 && number <= 2) {
    return 'Sehr geringe Intensität – eine sehr zurückhaltende Darstellung.';
  }

  if (number >= 3 && number <= 4) {
    return 'Geringe Intensität – eine leichte, unauffällige Darstellung.';
  }

  if (number >= 5 && number <= 6) {
    return 'Mittlere Intensität – eine deutlich erkennbare Darstellung.';
  }

  if (number >= 7 && number <= 8) {
    return 'Hohe Intensität – sehr ausdrucksstark darstellen!';
  }

  return 'Sehr hohe Intensität – eine besonders ausdrucksstarke Darstellung innerhalb sicherer Grenzen.';
}

function showTask(task) {
  elements.taskNumber.textContent = `${task.number}/10`;
  elements.taskActivity.textContent = task.activity;
  elements.taskIntensity.textContent = getIntensityDescription(task.number);
}

// Eine neue Aufgabe entsteht nur durch einen bewussten Klick auf den Button.
function startNewTask() {
  if (state.activities.length === 0) {
    setStatus('Es ist noch keine Aktivität gespeichert. Bitte füge zuerst eine Aktivität hinzu.', 'warning');
    showScreen('start');
    return;
  }

  const randomNumber = getRandomNumber();
  const randomActivity = getRandomActivity();

  state.currentTask = {
    number: randomNumber,
    activity: randomActivity
  };

  showTask(state.currentTask);
  showScreen('task');
  setStatus('');
}

// Neue Einträge werden vor dem Speichern geprüft: leer, doppelt oder zu lang ist nicht erlaubt.
function addActivity(event) {
  event.preventDefault();

  const enteredActivity = elements.activityInput.value.trim();

  if (!enteredActivity) {
    setFeedback('Bitte gib eine Aktivität ein.', 'error');
    elements.activityInput.focus();
    return;
  }

  if (enteredActivity.length > 120) {
    setFeedback('Die Aktivität darf maximal 120 Zeichen lang sein.', 'error');
    elements.activityInput.focus();
    return;
  }

  const isDuplicate = state.activities.some(
    (activity) => activity.toLowerCase() === enteredActivity.toLowerCase()
  );

  if (isDuplicate) {
    setFeedback('Diese Aktivität ist bereits gespeichert.', 'error');
    elements.activityInput.focus();
    return;
  }

  state.activities.push(enteredActivity);
  saveActivities();
  renderActivities();
  elements.activityInput.value = '';
  setFeedback('Aktivität erfolgreich hinzugefügt!', 'success');
  elements.activityInput.focus();
}

function deleteActivity(indexToDelete) {
  if (Number.isNaN(indexToDelete)) {
    return;
  }

  const deleted = state.activities.splice(indexToDelete, 1);

  if (!deleted.length) {
    return;
  }

  saveActivities();
  renderActivities();

  if (state.activities.length === 0) {
    setFeedback('Alle Aktivitäten wurden gelöscht. Die Liste ist jetzt leer.', 'warning');
  } else {
    setFeedback('Aktivität gelöscht.', 'success');
  }
}

// Service Worker prüfen und für GitHub Pages plus Offline-Nutzung registrieren.
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const appBaseUrl = new URL('.', window.location.href).toString();
  const serviceWorkerUrl = new URL('./sw.js', appBaseUrl).toString();

  navigator.serviceWorker.register(serviceWorkerUrl, { scope: appBaseUrl }).catch(() => {
    setStatus('Der Service Worker konnte nicht registriert werden. Die App bleibt jedoch nutzbar.', 'warning');
  });
}

function handleActivityListClick(event) {
  const deleteButton = event.target.closest('.delete-btn');

  if (!deleteButton) {
    return;
  }

  const index = Number(deleteButton.dataset.index);
  deleteActivity(index);
}

function initApp() {
  loadActivities();
  renderActivities();
  showScreen('start');
  updateActivityCount();
  setFeedback('');
  setStatus('');

  elements.newTaskButton.addEventListener('click', startNewTask);
  elements.manageActivitiesButton.addEventListener('click', () => {
    setFeedback('');
    showScreen('manage');
  });
  elements.backToStartButton.addEventListener('click', () => {
    setStatus('');
    showScreen('start');
  });
  elements.nextTaskButton.addEventListener('click', startNewTask);
  elements.manageBackButton.addEventListener('click', () => {
    setFeedback('');
    showScreen('start');
  });
  elements.activityForm.addEventListener('submit', addActivity);
  elements.activityList.addEventListener('click', handleActivityListClick);

  registerServiceWorker();
}

initApp();
